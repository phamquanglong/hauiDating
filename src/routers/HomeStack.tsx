import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../views/HomeScreen';
import {ROUTE_NAMES} from '~utils/constants';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_NAMES.HOME}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTE_NAMES.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};
