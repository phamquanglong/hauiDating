import React, {useCallback} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {colors} from '~utils/colors';
import {useAnimated} from '~hooks/useAnimated';
import {TitleCustom} from '~components/TitleCustom';
import {useTranslation} from 'react-i18next';
import Gender from './Gender';
import {useSetupProfile} from '~zustands/useSetupProfile';
import {ISettings} from '~apis/User';
import {useEditInfoStore} from '~zustands/useEditInfoStore';
import RangeSlider from '@jesster2k10/react-native-range-slider';

interface SettingsProfileProps {
  settings?: ISettings;
}

const SettingsProfile = ({settings}: SettingsProfileProps) => {
  const {t} = useTranslation();
  const {setupProfile, setSetupProfile} = useSetupProfile();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const {transformValue} = useAnimated();

  const onChangeOld = useCallback((low: number, high: number) => {
    if (!!settings && low !== 0 && high !== 0 && editInfo) {
      setEditInfo({
        ...editInfo,
        settings: {
          ...editInfo.settings,
          old: [low, high],
        },
      });
      return;
    }
    setupProfile?.settingsProfile &&
      low !== 0 &&
      high !== 0 &&
      setSetupProfile({
        ...setupProfile,
        settingsProfile: {
          ...setupProfile?.settingsProfile,
          old: [low, high],
        },
      });
  }, []);

  const onChangeDistance = useCallback((low: number, high: number) => {
    // console.log(editInfo?.settings, setupProfile);
    if (!!settings && high !== 0 && editInfo) {
      setEditInfo({
        ...editInfo,
        settings: {
          ...editInfo?.settings,
          distance: [low, high],
        },
      });
      return;
    }
    setupProfile?.settingsProfile &&
      high !== 0 &&
      setSetupProfile({
        ...setupProfile,
        settingsProfile: {
          ...setupProfile?.settingsProfile,
          distance: [low, high],
        },
      });
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: transformValue}],
        },
      ]}>
      <TitleCustom title={t('setupProfile.old')} />
      <RangeSlider
        type="range" // ios only
        min={settings?.old[0] ?? 18}
        max={settings?.old[1] ?? 100}
        tintColor={colors.inactive}
        handleColor={colors.primary}
        handlePressedColor={colors.primary}
        tintColorBetweenHandles={colors.primary}
        onChange={onChangeOld}
        maxLabelColor={colors.primary}
        minLabelColor={colors.primary}
      />
      <TitleCustom title={t('setupProfile.distance')} />
      <RangeSlider
        type="range" // ios only
        min={settings?.distance[0] ?? 0}
        max={settings?.distance[1] ?? 100}
        tintColor={colors.inactive}
        handleColor={colors.primary}
        handlePressedColor={colors.primary}
        tintColorBetweenHandles={colors.primary}
        onChange={onChangeDistance}
        maxLabelColor={colors.primary}
        minLabelColor={colors.primary}
      />
      <Gender isSettings gender={settings?.gender} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    maxHeight: '100%',
  },
  rail: {
    backgroundColor: colors.bg_light_gray,
    height: 3,
    width: '100%',
    borderRadius: 100,
  },
  railSelected: {backgroundColor: colors.primary, height: 3, width: '100%'},
  thumb: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 100,
  },
});

export default SettingsProfile;
