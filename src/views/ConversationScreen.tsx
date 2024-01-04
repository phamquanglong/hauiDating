import React, {memo, useEffect, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet} from 'react-native';
import HeaderConversation from '~components/conversation/HeaderConversation';
import MessageField from '~components/conversation/MessageField';
import MessageFooter from '~components/conversation/MessageFooter';
import {colors} from '~utils/colors';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {height} from '~utils/commons';
import {useSocketStore} from '~zustands/useSocketStore';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';

export interface ConversationScreenParams {
  targetUser: any;
  isNavFromNoti?: boolean;
}

const ConversationScreen = ({route}: any) => {
  const params = route.params;
  const {navigate} = useNavigation();
  const [data, setData] = useState([]);
  const {appSocket} = useSocketStore();

  useEffect(() => {
    appSocket?.receiveCallVideo((res: any) => {
      Alert.alert('', 'abcdef', [
        {
          text: 'Ok',
          onPress: () => {
            navigate(ROUTE_NAMES.VIDEOCALLSCREEN as never, {
              targetUser: params.targetUser,
              offer: res.offer,
            });
          },
        },
      ]);
    });
  }, [appSocket]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderConversation
        targetUser={params.targetUser}
        isNavFromNoti={params.isNavFromNoti}
      />
      <MessageField data={data} targetUser={params.targetUser} />
      <MessageFooter targetUser={params.targetUser} />
      <KeyboardSpacer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // flex: 1,
    height: height,
  },
});

export default memo(ConversationScreen);
