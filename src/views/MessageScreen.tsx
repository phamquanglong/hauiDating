import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {AnimatedContainer} from '~components/AnimatedContainer';
import {HeaderCustom} from '~components/HeaderCustom';
import MessageItem from '~components/message/MessageItem';
import {useUserInfo} from '~zustands/useUserInfo';
import {height} from '~utils/commons';
import {colors} from '~utils/colors';
import {isEmpty} from 'lodash';
import {useSocketStore} from '~zustands/useSocketStore';
import ConversationApi from '~apis/conversation.api';

const MessageScreen = () => {
  const {t} = useTranslation();
  const {userInfo} = useUserInfo();

  const {appSocket, setListUserOnline, setListConversation, listConversation} =
    useSocketStore();

  useEffect(() => {
    ConversationApi.getAllConversation().then(res => {
      setListConversation(res.data);
    });
  }, [setListConversation]);

  useEffect(() => {
    if (!isEmpty(appSocket)) {
      appSocket.receiveListUserOnline((data: any) => {
        setListUserOnline(data);
      });
    }
  }, [appSocket, setListUserOnline]);

  const data = listConversation?.map((conv: any) => {
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
        ListEmptyComponent={
          <View style={styles.container}>
            <Text>{t('empty')}</Text>
          </View>
        }
      />
    </AnimatedContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageScreen;
