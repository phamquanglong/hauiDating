import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStackNavigator from './MainStackNavigator';
import GlobalModal from '../components/GlobalModal';
import linking from 'linking';

const MainNavigation = () => {
  return (
    <NavigationContainer linking={linking}>
      <MainStackNavigator />
      <GlobalModal />
    </NavigationContainer>
  );
};

export default MainNavigation;
