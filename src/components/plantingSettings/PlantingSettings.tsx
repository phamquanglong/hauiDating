import React from 'react';
import {View} from 'react-native';
import {GroupTag} from '~components/plantingSettings/GroupTag';
import {GroupTree} from '~components/plantingSettings/GroupTree';
import {FooterPlantingSettings} from '~components/plantingSettings/FooterPlantingSettings';
import {SliderTimePicker} from '~components/plantingSettings/SliderTimePicker';

export const PlantingSettings = () => {
  return (
    <View>
      <GroupTree />
      <GroupTag />
      <SliderTimePicker />
      <FooterPlantingSettings />
    </View>
  );
};
