import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import UserApi from '~apis/user.api';
import ButtonPrimary from '~components/ButtonPrimary';
import {Spacer} from '~components/Spacer';
import BasicInfo from '~components/setupProfile/BasicInfo';
import Hobbies from '~components/setupProfile/Hobbies';
import PickImage from '~components/setupProfile/PickImage';
import SettingsProfile from '~components/setupProfile/SettingsProfile';
import {colors} from '~utils/colors';
import {defaultProfile, useSetupProfile} from '~zustands/useSetupProfile';
import {useUserInfo} from '~zustands/useUserInfo';
import GetLocation from 'react-native-get-location';
import {useToast} from 'react-native-toast-notifications';
import {StackActions, useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';
import {storage} from '~services/localStorage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: colors.primary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.primary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: colors.primary,
};

const SetupProfile = () => {
  const {t} = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const {userInfo, setUserInfo} = useUserInfo();
  const {setupProfile, setSetupProfile} = useSetupProfile();
  const labels = [
    t('setupProfile.basicInfo'),
    t('setupProfile.hobbies'),
    t('setupProfile.choosePic'),
    t('setupProfile.settings'),
  ];
  const toast = useToast();
  const {dispatch} = useNavigation();

  const getUserInfo = async () => {
    const userInfo = await UserApi.getInfo();
    setUserInfo(userInfo.data);
  };

  const onNext = () => {
    if (currentStep === labels.length - 1) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 6000,
      })
        .then(location => {
          console.log(setupProfile?.birthday);
          UserApi.postUserInformation({
            profile: {
              fullName: setupProfile?.fullName ?? '',
              gender: setupProfile?.gender ?? '',
              birthday: setupProfile?.birthday ?? '',
              bio: setupProfile?.bio ?? '',
              reputational: 10,
              latitude: location.latitude,
              longitude: location.longitude,
            },
            hobbies: setupProfile?.hobbies ?? [],
            images: setupProfile?.image ?? [],
            settings: {
              old: setupProfile?.settingsProfile?.old ?? [],
              distance: setupProfile?.settingsProfile?.distance ?? [],
              gender: setupProfile?.settingsProfile?.gender ?? '',
            },
          }).then(res => {
            toast.show(t('setupProfile.success'), {
              type: 'success',
              duration: 2000,
              successIcon: (
                <FontAwesomeIcon icon={faCheckCircle} color={colors.white} />
              ),
            });
            storage.set('userInfo', JSON.stringify(res.data));
            setSetupProfile(defaultProfile);
            setTimeout(() => {
              dispatch(StackActions.replace(ROUTE_NAMES.HOMEDRAWER));
            }, 3000);
          });
        })
        .catch(error => {
          const {code, message} = error;
          console.log(code, message);
        });
      return;
    }
    setCurrentStep(prv => (prv += 1));
  };

  const onPrevious = () => {
    setCurrentStep(prv => (prv -= 1));
  };

  const validate = () => {
    const validateInfo = () => {
      if (
        setupProfile?.fullName &&
        setupProfile.birthday &&
        setupProfile.bio &&
        setupProfile?.fullName?.length > 0 &&
        setupProfile?.birthday?.length > 0 &&
        setupProfile?.bio?.length > 0
      ) {
        return true;
      }
      return false;
    };
    switch (currentStep) {
      case 1:
        return setupProfile?.hobbies?.length !== 0;
      case 2:
        return setupProfile?.image?.length !== 0;
      default:
        return validateInfo();
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const _renderStepIndicator = () => {
    switch (currentStep) {
      case 1:
        return <Hobbies />;
      case 2:
        return <PickImage />;
      case 3:
        return <SettingsProfile />;
      default:
        return <BasicInfo isAvoidKeyboard />;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.header}>
        <View>
          <View style={styles.title}>
            <Text style={styles.text_1}>{t('setupProfile.hello')} </Text>
            <Text style={[styles.text_1, {color: colors.primary}]}>
              {userInfo?.userName}.
            </Text>
          </View>
          <Text style={styles.text}>{t('setupProfile.letCreate')}</Text>
        </View>
        {/* <Image
          source={{
            uri: 'https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-cong-nghiep-ha-noi-inkythuatso-01-21-15-51-20.jpg',
          }}
          style={{width: 50, height: 50}}
        /> */}
      </View>

      <StepIndicator
        stepCount={labels.length}
        // direction="vertical"
        customStyles={customStyles}
        currentPosition={currentStep}
        labels={labels}
      />
      <View style={{marginHorizontal: 20, marginTop: 10}}>
        {_renderStepIndicator()}
      </View>
      <Spacer flex={1} />
      <View style={styles.buttonContainer}>
        {currentStep !== 0 && (
          <ButtonPrimary
            onPress={onPrevious}
            text={t('setupProfile.previous')}
            style={[
              styles.button,
              {
                borderColor: colors.black_opacity,
                borderWidth: 1,
              },
            ]}
            textStyle={{color: colors.black_opacity}}
          />
        )}
        <ButtonPrimary
          disabled={!validate()}
          onPress={onNext}
          text={t(
            currentStep !== labels.length - 1
              ? 'setupProfile.next'
              : 'setupProfile.done',
          )}
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              opacity: validate() ? 1 : 0.5,
            },
          ]}
          textStyle={{color: colors.text.white}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'row',
  },
  text_1: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 100,
    flex: 1,
  },
  buttonContainer: {flexDirection: 'row', backgroundColor: colors.white},
});

export default SetupProfile;
