import React from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, StyleSheet, View} from 'react-native';
import InputBase from '~components/InputBase';
import {Spacer} from '~components/Spacer';
import {colors} from '~utils/colors';
import Gender from './Gender';
import BirthdayPicker from './BirthdayPicker';
import AboutMe from './AboutMe';
import {useAnimated} from '~hooks/useAnimated';
import {SetupProfileType, useSetupProfile} from '~zustands/useSetupProfile';
import {EditInfoType, useEditInfoStore} from '~zustands/useEditInfoStore';
import {validateEmail} from '~utils/commons';
import KeyboardSpacer from 'react-native-keyboard-spacer';

interface BasicInfoProps {
  data?: EditInfoType | null;
  isAvoidKeyboard?: boolean;
}

const BasicInfo = ({data, isAvoidKeyboard}: BasicInfoProps) => {
  const {t} = useTranslation();
  const {transformValue} = useAnimated();
  const {setSetupProfile, setupProfile} = useSetupProfile();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const {fullName} = data?.profile ?? (setupProfile as SetupProfileType);
  const firstName = fullName?.split(' ')[0] ?? '';
  const lastName = fullName?.split(' ')[1] ?? '';

  const onChangeFirstName = (value: string) => {
    if (data) {
      editInfo?.profile &&
        setEditInfo({
          ...editInfo,
          profile: {
            ...editInfo?.profile,
            fullName: `${value} ${lastName}`,
          },
        });
    }
    setSetupProfile({
      ...setupProfile,
      fullName: `${value} ${lastName}`,
    });
  };

  const onChangeLastName = (value: string) => {
    if (data) {
      editInfo?.profile &&
        setEditInfo({
          ...editInfo,
          profile: {
            ...editInfo?.profile,
            fullName: `${firstName} ${value}`,
          },
        });
    }
    setSetupProfile({
      ...setupProfile,
      fullName: `${firstName} ${value}`,
    });
  };

  const onChangeEmail = (value: string) => {
    editInfo?.profile &&
      setEditInfo({
        ...editInfo,
        email: value,
      });
  };

  return (
    <Animated.ScrollView
      style={[
        styles.container,
        {
          transform: [{translateY: transformValue}],
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <InputBase
        value={firstName}
        onChangeText={onChangeFirstName}
        require
        title={t('setupProfile.firstName')}
        placeholder={`${t('setupProfile.placeholder')} ${t(
          'setupProfile.firstName',
        ).toLowerCase()}`}
      />
      <Spacer value={20} horizontal={false} />
      <InputBase
        value={lastName}
        onChangeText={onChangeLastName}
        require
        title={t('setupProfile.lastName')}
        placeholder={`${t('setupProfile.placeholder')} ${t(
          'setupProfile.lastName',
        ).toLowerCase()}`}
      />
      {!!data && (
        <View>
          <Spacer value={20} horizontal={false} />
          <InputBase
            invalid={
              !!editInfo?.email &&
              editInfo?.email?.length > 0 &&
              !validateEmail(editInfo?.email)
            }
            invalidText={t('register.emailInvalidate')}
            value={data.email}
            onChangeText={onChangeEmail}
            require
            title={t('setupProfile.email')}
            placeholder={`${t('setupProfile.placeholder')} ${t(
              'setupProfile.email',
            ).toLowerCase()}`}
          />
        </View>
      )}
      <Spacer value={20} horizontal={false} />
      <Gender gender={data?.profile?.gender} />
      <BirthdayPicker date={data?.profile?.birthday} />
      <AboutMe bio={data?.profile?.bio} />
      {isAvoidKeyboard && <KeyboardSpacer />}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: 'dashed',
    borderColor: colors.primary,
  },
});

export default BasicInfo;
