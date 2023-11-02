import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStackNavigator from './MainStackNavigator';
import GlobalModal from '../components/GlobalModal';

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
      <GlobalModal />
    </NavigationContainer>
  );
};

export default MainNavigation;
