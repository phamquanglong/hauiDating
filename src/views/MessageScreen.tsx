import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';
import {AnimatedContainer} from '~components/AnimatedContainer';
import {HeaderCustom} from '~components/HeaderCustom';
import MessageItem from '~components/message/MessageItem';
import {useUserInfo} from '~zustands/useUserInfo';
import {height} from '~utils/commons';
import {colors} from '~utils/colors';
import {isEmpty} from 'lodash';
import useSocket from '~hooks/useSocket';
import {useAppDispatch} from '~hooks/useAppDispatch';
import {callApiGetAllConversations} from '~reducers/conversations.reducer';
import {useAppSelector} from '~hooks/useAppSelector';
import {setListPartnersOnlineAction} from '~reducers/partner.reducer';
import {useSocketStore} from '~zustands/useSocketStore';

const MessageScreen = () => {
  const {t} = useTranslation();
  const {appSocket} = useSocket();
  const {userInfo} = useUserInfo();
  const dispatch = useAppDispatch();
  const {setListUserOnline} = useSocketStore();

  const listConversations = useAppSelector(
    state => state.conversationsReducer.listConversations,
  );

  const selectedConversation = useAppSelector(
    state => state.conversationsReducer.selectedConversation,
  );

  useEffect(() => {
    if (!isEmpty(appSocket)) {
      appSocket.receiveListUserOnline((data: any) => {
        console.log('abc');
        dispatch(setListPartnersOnlineAction(data));
        // setListUserOnline(data);
      });
    }
  }, [appSocket, dispatch]);

  const data = listConversations?.map((conv: any) => {
    const item = {
      id: conv?.id,
      fullName:
        conv?.userOne?.id !== userInfo?.id
          ? conv?.userOne?.profile?.fullName
          : conv?.userTwo?.profile?.fullName,
      latestMessage: conv?.latestMessage,
      avatar:
        conv?.userOne?.id !== userInfo?.id
          ? conv?.userOne?.images[0]?.imageUrl
          : conv?.userTwo?.images[0]?.imageUrl,
      conv: conv,
      partnerId:
        conv?.userOne?.id !== userInfo?.id
          ? conv?.userOne?.id
          : conv?.userTwo?.id,
    };
    return item;
  });

  useEffect(() => {
    dispatch(callApiGetAllConversations());
  }, [dispatch]);

  const _renderItem = ({item, index}: {item: any; index: number}) => {
    return <MessageItem targetUser={item} key={index} />;
  };

  return (
    <AnimatedContainer style={{height: height}}>
      <HeaderCustom canGoBack={false} title={t('message.title')} />
      <FlatList
        contentContainerStyle={{backgroundColor: colors.white, flex: 1}}
        style={{flex: 1}}
        data={data}
        renderItem={_renderItem}
      />
    </AnimatedContainer>
  );
};

export default MessageScreen;
