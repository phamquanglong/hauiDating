import RNBounceable from '@freakycoder/react-native-bounceable';
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
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

interface MessageFieldProps {
  data: any;
  targetUser: any;
}

const MessageField = ({targetUser}: MessageFieldProps) => {
  const {userInfo} = useUserInfo();
  const flatlistRef = useRef<FlatList>(null);

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
      if (res.sender.id !== userInfo?.id) {
        console.log(userInfo?.id);
      }
    });

    appSocket?.receiveUpdateIsSeenMessage((res: any) => console.log({res}));
  }, [appSocket, addMessage]);

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
          <RNBounceable
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
    <FlatList
      ref={flatlistRef}
      onContentSizeChange={() =>
        flatlistRef.current?.scrollToEnd({animated: true})
      }
      data={displayListMessage}
      renderItem={_renderItem}
      contentContainerStyle={styles.container}
      style={{backgroundColor: 'brown'}}
    />
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
    alignContent: 'flex-end',
    backgroundColor: 'green',
  },
});

export default MessageField;
