import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {LinearGradient, Stop} from 'react-native-svg';
import Gradient from 'react-native-linear-gradient';
import {height, validateEmail, validatePassword, width} from '~utils/commons';
import {colors} from '~utils/colors';
import {TitleCustom} from '~components/TitleCustom';
import {useTranslation} from 'react-i18next';
import {IconButton} from '~components/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import InputBase from '~components/InputBase';
import {Spacer} from '~components/Spacer';
import ButtonPrimary from '~components/ButtonPrimary';
import UserApi from '~apis/user.api';
import {useToast} from 'react-native-toast-notifications';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const RegisterScreen = () => {
  const {t} = useTranslation();
  const {goBack} = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const onRegister = () => {
    UserApi.register({
      userName: username,
      password: password,
      email: email,
    })
      .then(() => {
        toast.show(t('register.success'), {
          type: 'success',
          successIcon: (
            <FontAwesomeIcon icon={faCheckCircle} color={colors.white} />
          ),
          duration: 2000,
        });
        setTimeout(() => {
          goBack();
        }, 3000);
      })
      .catch(err => console.log(err));
  };

  const validate = () => {
    if (
      username.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      password !== confirmPassword
    ) {
      return false;
    }
    return true;
  };

  return (
    <View>
      <Gradient
        style={{
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={[colors.primary, '#FFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.2, 1]}>
        <IconButton
          style={{position: 'absolute', top: height * 0.07, left: width * 0.08}}
          onPress={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} size={25} color={colors.white} />
        </IconButton>
        <View style={styles.content}>
          <TitleCustom
            title={t('register.title')}
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
            invalid={email.length > 0 && !validateEmail(email)}
            invalidText={t('register.emailInvalidate')}
            value={email}
            onChangeText={value => setEmail(value)}
            title={t('register.email')}
            placeholder={`${t('register.placeholder')} ${t(
              'register.email',
            ).toLowerCase()}`}
          />
          <Spacer value={20} horizontal={false} />
          <InputBase
            invalid={password.length > 0 && !validatePassword(password)}
            invalidText={t('register.passwordInvalidate')}
            showPassword
            value={password}
            onChangeText={value => setPassword(value)}
            title={t('login.password')}
            placeholder={t('login.passwordPlaceholder')}
          />
          <Spacer value={20} horizontal={false} />
          <InputBase
            showPassword
            invalid={confirmPassword.length > 0 && password !== confirmPassword}
            invalidText={t('register.notMatch')}
            value={confirmPassword}
            onChangeText={value => setConfirmPassword(value)}
            title={t('register.confirmPassword')}
            placeholder={t('register.confirmPlaceholder')}
          />
          <ButtonPrimary
            onPress={onRegister}
            disabled={!validate()}
            text={t('register.title')}
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
        <KeyboardSpacer />
        <LinearGradient id="path" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
          <Stop offset="1" stopColor={colors.primary} stopOpacity="1" />
        </LinearGradient>
      </Gradient>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.white,
    width: '80%',
    padding: 20,
    borderRadius: 20,
  },
});

export default RegisterScreen;
