import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTE_NAMES} from '~utils/constants';
import MessageScreen from '~views/MessageScreen';
import ConversationScreen from '~views/ConversationScreen';

const Stack = createNativeStackNavigator();

export const MessageStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_NAMES.MESSAGESTACK}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTE_NAMES.MESSAGE} component={MessageScreen} />
      <Stack.Screen
        name={ROUTE_NAMES.CONVERSATION}
        component={ConversationScreen}
      />
    </Stack.Navigator>
  );
};
