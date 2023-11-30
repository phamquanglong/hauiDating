import React from 'react';
import {useTranslation} from 'react-i18next';
import {HeaderCustom} from '~components/HeaderCustom';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LikedTab, {ActionTypes} from './history-tabs/LikedTab';
import DislikedTab from './history-tabs/DislikedTabs';
import {colors} from '~utils/colors';
import {CustomStatusBar} from '~components/CustomStatusBar';
import {getStatusBarColor} from '~utils/commons';
import {useFocusEffect} from '@react-navigation/native';
import UserActionsApi from '~apis/user-actions.api';
import {useHistoryStore} from '~zustands/useHistoryStore';

const Tab = createMaterialTopTabNavigator();

const HistoryTabs = () => {
  const {t} = useTranslation();
  const {setLikedList, setDislikedList, setLikedMeList} = useHistoryStore();

  useFocusEffect(
    React.useCallback(() => {
      UserActionsApi.getHistory(ActionTypes.LIKED).then(res => {
        let arr: any[] = res.data;
        if (res.data.length % 2 == 1) {
          arr.push(undefined);
        }
        setLikedList(arr);
      });

      UserActionsApi.getHistory(ActionTypes.DISLIKED).then(res => {
        let arr: any[] = res.data;
        if (res.data.length % 2 == 1) {
          arr.push(undefined);
        }
        setDislikedList(arr);
      });

      UserActionsApi.getHistory(ActionTypes.LIKEDME).then(res => {
        let arr: any[] = res.data;
        if (res.data.length % 2 == 1) {
          arr.push(undefined);
        }
        setLikedMeList(arr);
      });
    }, []),
  );

  return (
    <>
      <CustomStatusBar backgroundColor={getStatusBarColor('')} />
      <HeaderCustom canGoBack={false} title={t('history')} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: colors.white},
          tabBarActiveTintColor: colors.primary,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
            alignContent: 'center',
            borderRadius: 100,
          },
          //   tabBarShowLabel: false,
        }}>
        <Tab.Screen name={t('liked')} component={LikedTab} />
        <Tab.Screen name={t('disliked')} component={DislikedTab} />
        <Tab.Screen name={t('liked-me')} component={DislikedTab} />
      </Tab.Navigator>
    </>
  );
};

export default HistoryTabs;
