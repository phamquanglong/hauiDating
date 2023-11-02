import useCircleSliderController from '~hooks/useCircleSliderController';
import {useEffect} from 'react';
import {colors} from '~utils/colors';
import Slider from '@react-native-community/slider';
import {View} from 'react-native';
import {TitleCustom} from '~components/TitleCustom';

export const SliderTimePicker = () => {
  const {timer, onChange, t} = useCircleSliderController();
  return (
    <View>
      <TitleCustom
        title={t.do('home.plantingSettings.time')}
        plantingSettings
      />
      <Slider
        value={timer}
        style={{width: '100%', height: 40}}
        minimumValue={0}
        maximumValue={180}
        step={1}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.bg_yellow}
        onSlidingComplete={value => onChange(value)}
      />
    </View>
  );
};
