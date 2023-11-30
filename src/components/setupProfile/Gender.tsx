import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import ButtonPrimary from '~components/ButtonPrimary';
import {TitleCustom} from '~components/TitleCustom';
import {colors} from '~utils/colors';
import {GENDER} from '~utils/constants';
import {useEditInfoStore} from '~zustands/useEditInfoStore';
import {useSetupProfile} from '~zustands/useSetupProfile';

type GenderProps = {
  isSettings?: boolean;
  gender?: string;
};

const Gender = ({isSettings, gender}: GenderProps) => {
  const {setSetupProfile, setupProfile} = useSetupProfile();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const {t} = useTranslation();

  useEffect(() => {
    !!gender &&
      editInfo?.profile &&
      setEditInfo({
        ...editInfo,
        profile: {
          ...editInfo?.profile,
          gender: gender,
        },
      });
  }, []);

  const active = (type: GENDER) => {
    if (gender) {
      if (isSettings) {
        return editInfo?.settings?.gender === type;
      }
      return editInfo?.profile?.gender === type;
    }
    if (isSettings) {
      return setupProfile?.settingsProfile?.gender === type;
    }
    return setupProfile?.gender === type;
  };

  const onPress = (type: GENDER) => () => {
    if (gender) {
      if (isSettings && editInfo?.settings) {
        setEditInfo({
          ...editInfo,
          settings: {
            ...editInfo?.settings,
            gender: type,
          },
        });
        return;
      }
      editInfo?.profile &&
        setEditInfo({
          ...editInfo,
          profile: {
            ...editInfo?.profile,
            gender: type,
          },
        });
    }
    if (isSettings) {
      setSetupProfile({
        ...setupProfile,
        settingsProfile: {
          ...setupProfile?.settingsProfile,
          gender: type,
        },
      });
      return;
    }
    setSetupProfile({
      ...setupProfile,
      gender: type,
    });
  };

  return (
    <View>
      <TitleCustom title={t('setupProfile.gender')} require={!isSettings} />
      <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
        <ButtonPrimary
          onPress={onPress(GENDER.MALE)}
          text={t('setupProfile.genderType.male')}
          textStyle={{color: active(GENDER.MALE) ? colors.primary : undefined}}
          style={[
            styles.button,
            {borderTopStartRadius: 100, borderBottomStartRadius: 100},
            active(GENDER.MALE) ? styles.buttonActive : undefined,
          ]}
        />
        <ButtonPrimary
          onPress={onPress(GENDER.FEMALE)}
          text={t('setupProfile.genderType.female')}
          textStyle={{
            color: active(GENDER.FEMALE) ? colors.primary : undefined,
          }}
          style={[
            styles.button,
            active(GENDER.FEMALE) ? styles.buttonActive : undefined,
          ]}
        />
        <ButtonPrimary
          onPress={onPress(GENDER.MORE)}
          text={t('setupProfile.genderType.more')}
          textStyle={{color: active(GENDER.MORE) ? colors.primary : undefined}}
          style={[
            styles.button,
            {borderTopEndRadius: 100, borderBottomEndRadius: 100},
            active(GENDER.MORE) ? styles.buttonActive : undefined,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.inactive,
    paddingVertical: 10,
    flex: 1,
  },
  buttonActive: {
    borderColor: colors.primary,
  },
});

export default Gender;
