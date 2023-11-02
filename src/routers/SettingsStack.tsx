import {ROUTE_NAMES} from '~utils/constants';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsScreen} from '~views/SettingsScreen';

const Stack = createNativeStackNavigator();

export const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_NAMES.SETTINGS}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTE_NAMES.SETTINGS} component={SettingsScreen} />
    </Stack.Navigator>
  );
};
