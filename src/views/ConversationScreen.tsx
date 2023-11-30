import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import MessagesApi from '~apis/messages.api';
import HeaderConversation from '~components/conversation/HeaderConversation';
import MessageField from '~components/conversation/MessageField';
import MessageFooter from '~components/conversation/MessageFooter';
import {useAppDispatch} from '~hooks/useAppDispatch';
import {useAppSelector} from '~hooks/useAppSelector';
import {useKeyboardListener} from '~hooks/useKeyboardListener';
import {actionSortConversation} from '~reducers/conversations.reducer';
import {
  deleteMessageAction,
  pushNewMessageAction,
} from '~reducers/messages.reducer';
import {SocketService} from '~services/Socket.service';
import {colors} from '~utils/colors';
import {useSocketStore} from '~zustands/useSocketStore';

const ConversationScreen = ({route}: any) => {
  const params = route.params;
  //   const {appSocket} = useSocketStore();
  const [data, setData] = useState([]);
  const {isKeyboardVisible, keyboardHeight} = useKeyboardListener();
  //   useEffect(() => {
  //     (appSocket as SocketService).receiveMessage(res => setData(res));
  //   }, [appSocket]);

  const dispatch = useAppDispatch();
  const socket = useAppSelector(state => state.socketReducer.socket);
  const selectedConversation = useAppSelector(
    state => state.conversationsReducer.selectedConversation,
  );

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.receiveMessage(data => {
        if (data) {
          if (selectedConversation?.id === data?.conversation?.id) {
            dispatch(pushNewMessageAction(data));
            dispatch(actionSortConversation(data?.conversation));
          }
        }
      });

      socket.receiveDeleteMessage(data => {
        dispatch(
          deleteMessageAction({
            messId: data?.messId,
            userDelete: data?.userDelete,
          }),
        );
      });
    }
  }, [socket, dispatch, selectedConversation?.id]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        isKeyboardVisible && {
          marginBottom: keyboardHeight,
        },
      ]}>
      <HeaderConversation targetUser={params.targetUser} />
      <MessageField data={data} targetUser={params.targetUser} />
      <MessageFooter targetUser={params.targetUser} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default ConversationScreen;
