import React, {useState} from 'react';
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
import AppLoading from '~components/AppLoading';
import LikedMeTab from './history-tabs/LikedMeTab';

const Tab = createMaterialTopTabNavigator();

const HistoryTabs = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const {setLikedList, setDislikedList, setLikedMeList} = useHistoryStore();

  useFocusEffect(
    React.useCallback(() => {
      const liked = UserActionsApi.getHistory(ActionTypes.LIKED);
      const disliked = UserActionsApi.getHistory(ActionTypes.DISLIKED);
      const likedme = UserActionsApi.getHistory(ActionTypes.LIKEDME);

      Promise.allSettled([liked, disliked, likedme]).then(res => {
        res.forEach((item, index) => {
          let arr: any[] = item.value.data;
          if (item.value.data.length % 2 == 1) {
            arr.push(undefined);
          }
          switch (index) {
            case 0:
              setLikedList(arr);
              break;
            case 1:
              setDislikedList(arr);
              break;
            default:
              setLikedMeList(arr);
              return;
          }
        });
        setLoading(false);
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
        <Tab.Screen name={t('liked-me')} component={LikedMeTab} />
      </Tab.Navigator>
      {loading && <AppLoading />}
    </>
  );
};

export default HistoryTabs;
