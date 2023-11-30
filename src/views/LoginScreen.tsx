import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ImageBackground, StyleSheet, View} from 'react-native';
import UserApi from 'src/apis/user.api';
import ButtonPrimary from '~components/ButtonPrimary';
import InputBase from '~components/InputBase';
import {Spacer} from '~components/Spacer';
import {TitleCustom} from '~components/TitleCustom';
import ApiService from '~services/axiosServices';
import {storage} from '~services/localStorage';
import {colors} from '~utils/colors';
import {ROUTE_NAMES} from '~utils/constants';
import {images} from '~utils/images';

const LoginScreen = () => {
  const {t} = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {navigate, dispatch} = useNavigation();

  const validate = () => {
    if (username.length === 0 || password.length === 0) {
      return false;
    }
    return true;
  };

  const onLogin = async () => {
    await UserApi.login({
      userName: username,
      password: password,
    }).then(res => {
      storage.set('accessToken', res.data.accessToken);
      ApiService.defaults.headers.common.Authorization =
        'Bearer ' + res.data.accessToken;
    });
    await UserApi.getInfo().then(userInfo => {
      storage.set('userInfo', JSON.stringify(userInfo.data));
      dispatch(
        StackActions.replace(
          userInfo.data.profile
            ? ROUTE_NAMES.HOMEDRAWER
            : ROUTE_NAMES.SETUPPROFILE,
        ),
      );
    });
  };

  const onNavigateRegister = () => {
    navigate(ROUTE_NAMES.REGISTER as never);
  };

  return (
    <ImageBackground
      source={images.bg_login}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={styles.content}>
        <TitleCustom
          title={t('login.title')}
          textStyle={{
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 30,
            fontWeight: 'bold',
            color: colors.primary,
          }}
        />
        <InputBase
          value={username}
          onChangeText={value => setUsername(value)}
          title={t('login.username')}
          placeholder={t('login.usernamePlaceholder')}
        />
        <Spacer value={20} horizontal={false} />
        <InputBase
          showPassword
          value={password}
          onChangeText={value => setPassword(value)}
          title={t('login.password')}
          placeholder={t('login.passwordPlaceholder')}
        />
        <View>
          <ButtonPrimary
            onPress={onNavigateRegister}
            text={t('login.noAccount')}
            textStyle={{
              flex: 1,
              textAlign: 'right',
              marginTop: 20,
              color: colors.primary,
            }}
          />
        </View>
        <ButtonPrimary
          onPress={onLogin}
          disabled={!validate()}
          text={t('login.title')}
          style={{
            opacity: !validate() ? 0.5 : 1,
            backgroundColor: colors.primary,
            padding: 15,
            borderRadius: 100,
            marginTop: 20,
          }}
          textStyle={{color: colors.text.white}}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    width: '80%',
  },
});

export default LoginScreen;
