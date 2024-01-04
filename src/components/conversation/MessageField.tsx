import RNBounceable from '@freakycoder/react-native-bounceable';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MessagesApi from '~apis/messages.api';
import {TitleCustom} from '~components/TitleCustom';
import {colors} from '~utils/colors';
import {useConversationStore} from '~zustands/useConversationStore';
import {useSocketStore} from '~zustands/useSocketStore';
import {useUserInfo} from '~zustands/useUserInfo';
import {TypingAnimation} from 'react-native-typing-animation';
import {SocketService} from '~services/Socket.service';
import ImageView from 'react-native-image-viewing';
import {width} from '~utils/commons';
import {useTranslation} from 'react-i18next';

interface MessageFieldProps {
  data: any;
  targetUser: any;
}

const MessageField = ({targetUser}: MessageFieldProps) => {
  const {t} = useTranslation();
  const {userInfo} = useUserInfo();
  const flatlistRef = useRef<FlatList>(null);
  const [visibleImageView, setVisibleImageView] = useState({
    visible: false,
    images: [],
    index: 0,
  });

  const {
    setConversation,
    conversation: displayListMessage,
    addMessage,
    removeTyping,
  } = useConversationStore();
  const {appSocket} = useSocketStore();

  useEffect(() => {
    (appSocket as SocketService).receiveMessage((res: any) => {
      addMessage(res);
      return;
    });
    // appSocket?.receiveUpdateIsSeenMessage((res: any) => console.log({res}));
  }, [appSocket, addMessage]);

  useEffect(() => {
    appSocket?.receiveDeleteMessage((res: any) => {
      let messages = [...displayListMessage];
      const mess = messages.find(i => i.id === res.messId);
      const index = messages.indexOf(mess);
      messages[index] = {
        ...mess,
        userDelete: userInfo?.id,
      };
      if (displayListMessage.length > 0) {
        setConversation(messages);
      }
    });
  }, [displayListMessage, appSocket]);

  useEffect(() => {
    MessagesApi.getAllMessageOfConversation(targetUser.id).then(res => {
      setConversation(res.data);
    });
  }, [setConversation, targetUser.id]);

  useEffect(() => {
    let typing = false;
    appSocket?.receiveTypingStatus((res: any) => {
      if (res.isTyping && !typing && displayListMessage.length === 0) {
        addMessage({
          isTyping: true,
        });
        typing = true;
      }
      if (!res.isTyping) {
        removeTyping();
        typing = false;
      }
    });
  }, [appSocket, addMessage, removeTyping]);

  const _renderItem = ({item, index}: any) => {
    const isSender = item.isTyping
      ? !item.isTyping
      : item.sender.id === userInfo?.id;
    const checkRenderMessage = () => {
      let style: StyleProp<ViewStyle> = {};
      let showAvatar = false;
      let showTime = false;
      if (item.isTyping) {
        style.borderTopLeftRadius = 20;
        style.borderBottomLeftRadius = 20;
      }
      if (
        displayListMessage?.[index]?.sender?.id !==
        displayListMessage?.[index - 1]?.sender?.id
      ) {
        style[isSender ? 'borderTopRightRadius' : 'borderTopLeftRadius'] = 20;
        showAvatar = true;
      }
      if (
        displayListMessage?.[index]?.sender?.id !==
        displayListMessage?.[index + 1]?.sender?.id
      ) {
        style[
          isSender ? 'borderBottomRightRadius' : 'borderBottomLeftRadius'
        ] = 20;
        showTime = true;
      }
      return {
        style,
        showAvatar,
        showTime,
      };
    };

    const onRemoveMessage = () => {
      isSender &&
        Alert.alert('', t('removeMessageConfirm'), [
          {
            text: t('cancel'),
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: t('ok'),
            onPress: () => appSocket?.deleteMessage(item.id, targetUser.id),
          },
        ]);
    };

    const _renderImage = ({item: image, index: idx}: any) => (
      <>
        <RNBounceable
          key={image}
          onLongPress={onRemoveMessage}
          onPress={() =>
            setVisibleImageView({
              index: idx,
              visible: true,
              images: item.message.split(',').map((it: any) => ({
                uri: it,
              })),
            })
          }>
          <Image
            source={{uri: image}}
            style={[styles.image, idx === 1 && {marginHorizontal: 5}]}
          />
        </RNBounceable>
      </>
    );

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: isSender ? 'flex-end' : 'flex-start',
          marginVertical: 2,
        }}>
        {!isSender &&
          (checkRenderMessage().showAvatar ? (
            <Image
              source={{
                uri: targetUser.avatar,
              }}
              style={[
                styles.avatar,
                {
                  marginEnd: 5,
                  backgroundColor: checkRenderMessage().showAvatar
                    ? colors.inactive
                    : undefined,
                },
              ]}
            />
          ) : (
            <View style={{width: 35}} />
          ))}
        <View>
          {!item.isTyping &&
          (item.message as string).includes('https://res.cloudinary.com') &&
          !item.userDelete ? (
            <FlatList
              numColumns={3}
              scrollEnabled={false}
              data={item.message.split(',')}
              renderItem={_renderImage}
              style={{
                borderRadius: 20,
                overflow: 'hidden',
              }}
            />
          ) : item.userDelete ? (
            <View
              style={[
                checkRenderMessage().style,
                {
                  flex: 1,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.black_opacity,
                },
              ]}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.black_opacity,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}>
                {t('messageIsRemoved')}
              </Text>
            </View>
          ) : (
            <RNBounceable
              onLongPress={onRemoveMessage}
              style={[
                isSender ? styles.messageItem : styles.messageItemSender,
                checkRenderMessage().style,
              ]}>
              {item.isTyping ? (
                <View style={{width: 30, height: 20}}>
                  <TypingAnimation
                    dotColor={colors.primary}
                    dotMargin={5}
                    dotAmplitude={3}
                    dotSpeed={0.15}
                    dotRadius={2.5}
                    dotX={12}
                    dotY={6}
                  />
                </View>
              ) : (
                <TitleCustom
                  title={item.message}
                  textStyle={
                    isSender ? styles.messageItem : styles.messageItemSender
                  }
                />
              )}
            </RNBounceable>
          )}
          {checkRenderMessage().showTime && (
            <View
              style={{
                alignItems: isSender ? 'flex-end' : 'flex-start',
              }}>
              <TitleCustom
                title={moment(item.updatedAt).format('LT')}
                textStyle={{padding: 3, color: colors.black_opacity}}
              />
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <>
      <FlatList
        initialNumToRender={10}
        ref={flatlistRef}
        onContentSizeChange={() =>
          flatlistRef.current?.scrollToEnd({animated: true})
        }
        data={displayListMessage}
        renderItem={_renderItem}
        contentContainerStyle={styles.container}
      />

      <ImageView
        images={visibleImageView.images}
        imageIndex={visibleImageView.index}
        visible={visibleImageView.visible}
        onRequestClose={() =>
          setVisibleImageView({visible: false, images: [], index: 0})
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  messageItem: {
    backgroundColor: colors.primary,
    color: colors.text.white,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  messageItemSender: {
    backgroundColor: colors.inactive,
    color: colors.black_opacity,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  avatar: {
    width: 30,
    borderRadius: 100,
    aspectRatio: 1 / 1,
  },
  container: {
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
    // height: height,
    width: width,
    // backgroundColor: colors.error,
  },
  image: {
    height: 100,
    aspectRatio: 1 / 1,
    borderRadius: 5,
    backgroundColor: colors.inactive,
  },
});

export default MessageField;
