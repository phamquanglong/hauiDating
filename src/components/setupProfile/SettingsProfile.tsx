import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {colors} from '~utils/colors';
import RangeSlider from '@jesster2k10/react-native-range-slider';
import {useAnimated} from '~hooks/useAnimated';
import {TitleCustom} from '~components/TitleCustom';
import {useTranslation} from 'react-i18next';
import Gender from './Gender';
import {useSetupProfile} from '~zustands/useSetupProfile';
import {ISettings} from '~apis/User';
import {useEditInfoStore} from '~zustands/useEditInfoStore';

interface SettingsProfileProps {
  settings?: ISettings;
}

const SettingsProfile = ({settings}: SettingsProfileProps) => {
  const {t} = useTranslation();
  const {setupProfile, setSetupProfile} = useSetupProfile();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const {transformValue} = useAnimated();

  const onChangeOld = (min: number, max: number) => {
    if (!!settings && min !== 0 && max !== 0 && editInfo?.settings) {
      setEditInfo({
        ...editInfo,
        settings: {
          ...editInfo?.settings,
          old: [min, max],
        },
      });
      return;
    }
    setupProfile?.settingsProfile &&
      min !== 0 &&
      max !== 0 &&
      setSetupProfile({
        ...setupProfile,
        settingsProfile: {
          ...setupProfile?.settingsProfile,
          old: [min, max],
        },
      });
  };

  const onChangeDistance = (min: number, max: number) => {
    if (!!settings && max !== 0 && editInfo?.settings) {
      setEditInfo({
        ...editInfo,
        settings: {
          ...editInfo?.settings,
          distance: [min, max],
        },
      });
      return;
    }
    setupProfile?.settingsProfile &&
      max !== 0 &&
      setSetupProfile({
        ...setupProfile,
        settingsProfile: {
          ...setupProfile?.settingsProfile,
          distance: [min, max],
        },
      });
  };

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
});

export default SettingsProfile;
