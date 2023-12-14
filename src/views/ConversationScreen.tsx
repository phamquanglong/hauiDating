import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HeaderConversation from '~components/conversation/HeaderConversation';
import MessageField from '~components/conversation/MessageField';
import MessageFooter from '~components/conversation/MessageFooter';
import {colors} from '~utils/colors';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {height} from '~utils/commons';

export interface ConversationScreenParams {
  targetUser: any;
  isNavFromNoti?: boolean;
}

const ConversationScreen = ({route}: any) => {
  const params = route.params;
  const [data, setData] = useState([]);

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

export default ConversationScreen;
