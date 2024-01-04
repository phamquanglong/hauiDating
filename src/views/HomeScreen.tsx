import React, {useEffect} from 'react';
import {Alert, Linking, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AnimatedContainer} from '~components/AnimatedContainer';
import useHomeScreenController from '~hooks/useHomeScreenController';
import {colors} from '~utils/colors';
import {faBars, faHeart, faQrcode} from '@fortawesome/free-solid-svg-icons';
import {IconButton} from '~components/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {TitleCustom} from '~components/TitleCustom';
import BackgroundGradient from '~components/BackgroundGradient';
import StackCard from '~components/card/StackCard';
import {IUser} from '~apis/User';
import AppLoading from '~components/AppLoading';
import {ROUTE_NAMES} from '~utils/constants';
import {Spacer} from '~components/Spacer';
import {DynamicLinkServices} from '~services/DynamicLink.service';
import {useSocketStore} from '~zustands/useSocketStore';
import ConversationApi from '~apis/conversation.api';
import {useTranslation} from 'react-i18next';
import {getCurrentRoute, goBack} from '~services/Navigation.service';
import {useUserInfo} from '~zustands/useUserInfo';

const HomeScreen = () => {
  const {t} = useTranslation();
  const {suggestUsers, loading} = useHomeScreenController();
  const navigation = useNavigation<any>();
  const {appSocket, setListConversation} = useSocketStore();
  const {userInfo} = useUserInfo();

  function handleDeepLink(e: any) {
    console.log('linkRoute: ', e);
    // Then handle redirection to the specific page in the app
  }

  useEffect(() => {
    let subcribtion = Linking.addEventListener('url', handleDeepLink);
    subcribtion.subscriber;
    const unsubcribe = DynamicLinkServices.handleForegroundEvent();
    DynamicLinkServices.handleBackgroundEvent();

    return () => {
      subcribtion.remove();
      unsubcribe();
    };
  }, []);

  useEffect(() => {
    appSocket?.receiveUnmatch((res: any) => {
      res &&
        ConversationApi.getAllConversation().then((res: any) => {
          setListConversation(res.data.filter((i: any) => i.isActive === true));
        });
      if (userInfo && res.userId !== userInfo?.id) {
        Alert.alert('', t('notiUnmatch', {user: res?.fullName}), [
          {
            text: t('ok'),
            onPress: () =>
              getCurrentRoute().name === ROUTE_NAMES.CONVERSATION && goBack(),
          },
        ]);
      }
      if (userInfo && res.userId === userInfo?.id) {
        goBack();
      }
    });
  }, [appSocket, setListConversation, t, userInfo]);

  const onMenu = () => {
    navigation.openDrawer();
  };

  const onScanner = () => {
    navigation.navigate(ROUTE_NAMES.SCANNERSCREEN);
  };

  return (
    <AnimatedContainer style={styles.container}>
      <BackgroundGradient style={styles.container}>
        <View style={styles.header}>
          <IconButton onPress={onMenu} style={{flex: 0.1}}>
            <FontAwesomeIcon icon={faBars} size={30} color={colors.white} />
          </IconButton>
          <View style={styles.appName}>
            <FontAwesomeIcon icon={faHeart} size={25} color={colors.white} />
            <Spacer horizontal value={5} />
            <TitleCustom
              title={'hauiDating'}
              textStyle={{
                color: colors.text.white,
                fontWeight: 'bold',
                fontSize: 25,
              }}
            />
          </View>
          <View style={{flex: 0.1}}>
            <IconButton onPress={onScanner}>
              <FontAwesomeIcon icon={faQrcode} size={30} color={colors.white} />
            </IconButton>
          </View>
        </View>
        {loading ? (
          <AppLoading />
        ) : (
          <StackCard data={suggestUsers as IUser[]} />
        )}
      </BackgroundGradient>
    </AnimatedContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  flex_1: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 180,
  },
  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  appName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default HomeScreen;
