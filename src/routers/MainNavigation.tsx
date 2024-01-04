import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStackNavigator from './MainStackNavigator';
import GlobalModal from '../components/GlobalModal';
import linking from 'linking';
import {setTopLevelNavigator} from '~services/Navigation.service';

const MainNavigation = () => {
  return (
    <NavigationContainer
      linking={linking}
      ref={ref => setTopLevelNavigator(ref)}>
      <MainStackNavigator />
      <GlobalModal />
    </NavigationContainer>
  );
};

export default MainNavigation;
