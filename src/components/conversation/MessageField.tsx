import RNBounceable from '@freakycoder/react-native-bounceable';
import {isEmpty} from 'lodash';
import moment from 'moment';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {TitleCustom} from '~components/TitleCustom';
import {useAppDispatch} from '~hooks/useAppDispatch';
import {useAppSelector} from '~hooks/useAppSelector';
import {callApiGetAllMessagesOfConversation} from '~reducers/messages.reducer';
import {colors} from '~utils/colors';
import {useUserInfo} from '~zustands/useUserInfo';

interface MessageFieldProps {
  data: any;
  targetUser: any;
}

const MessageField = ({data, targetUser}: MessageFieldProps) => {
  const {userInfo} = useUserInfo();
  const flatlistRef = useRef<FlatList>(null);

  const dispatch = useAppDispatch();
  const socket = useAppSelector(state => state.socketReducer.socket);
  const selectedConversation = useAppSelector(
    state => state.conversationsReducer.selectedConversation,
  );
  const listMessages = useAppSelector(
    state => state.messagesReducer.listMessages,
  );
  const [isTyping, setTypingStatus] = useState<boolean>(false);
  const displayListMessage = useMemo(() => listMessages, [listMessages]);

  useEffect(() => {
    if (selectedConversation) {
      dispatch(callApiGetAllMessagesOfConversation(selectedConversation?.id));
      setTypingStatus(false);
    }
  }, [dispatch, selectedConversation]);

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.receiveTypingStatus((data: any) => {
        if (selectedConversation?.id === data?.conversationId) {
          setTypingStatus(data.isTyping);
        }
      });
    }
  }, [socket, dispatch, selectedConversation?.id]);

  const _renderItem = ({item, index}: any) => {
    const isSender = item.sender.id === userInfo?.id;
    const checkRenderMessage = () => {
      let style: StyleProp<ViewStyle> = {};
      let showAvatar = false;
      let showTime = false;
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
        {!isSender && (
          <Image
            source={{
              uri: checkRenderMessage().showAvatar ? targetUser.avatar : 'fd',
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
        )}
        <View>
          <RNBounceable
            style={[
              isSender ? styles.messageItem : styles.messageItemSender,
              checkRenderMessage().style,
            ]}>
            <TitleCustom
              title={item.message}
              textStyle={
                isSender ? styles.messageItem : styles.messageItemSender
              }
            />
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
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default MessageField;
