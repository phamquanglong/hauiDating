import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, View} from 'react-native';
import {Spacer} from './Spacer';
import {TitleCustom} from './TitleCustom';
import {getDistanceFromLatLonInKm} from '~utils/commons';
import {colors} from '~utils/colors';
import {IUser} from '~apis/User';
import {useUserInfo} from '~zustands/useUserInfo';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';

interface LocationTagProps {
  itemUser: IUser;
}

const LocationTag = ({itemUser}: LocationTagProps) => {
  const {t} = useTranslation();
  const {userInfo} = useUserInfo();
  return (
    <View style={styles.location}>
      <FontAwesomeIcon icon={faLocationDot} color={colors.white} />
      <Spacer horizontal value={5} />
      <TitleCustom
        title={
          getDistanceFromLatLonInKm(
            userInfo?.profile.latitude ?? 0,
            userInfo?.profile.longitude ?? 0,
            itemUser?.profile?.latitude,
            itemUser?.profile?.longitude,
          ) ?? t('nearby')
        }
        textStyle={{color: colors.text.white}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  location: {
    flexDirection: 'row',
    width: 100,
    borderRadius: 100,
    backgroundColor: colors.success,
    marginBottom: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
});

export default LocationTag;
