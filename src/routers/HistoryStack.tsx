import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTE_NAMES} from '~utils/constants';
import HistoryTabs from '~views/HistoryScreen';

const Stack = createNativeStackNavigator();

export const HistoryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_NAMES.HISTORYSTACK}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTE_NAMES.HOME} component={HistoryTabs} />
    </Stack.Navigator>
  );
};
