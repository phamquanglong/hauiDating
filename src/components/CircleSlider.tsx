import React from 'react';
import CircleSlider from 'react-native-circle-slider';
import {StyleSheet, View} from 'react-native';
import Land from './Land';
import Tree from './Tree';
import useCircleSliderController from '~hooks/useCircleSliderController';
import {colors} from '~utils/colors';
import {getImageTree} from '~utils/commons';

const CircleSliderComponent = ({disable}: {disable?: boolean}) => {
  const {
    onChange,
    timer,
    isPlant,
    currentTimer,
    tree,
    globalModalVisible,
    isSuccess,
  } = useCircleSliderController();

  return (
    <View
      style={[
        styles.container,
        disable
          ? {
              transform: [{scale: 0.24}],
              marginTop: -100,
              marginBottom: -100,
              marginHorizontal: -100,
            }
          : undefined,
      ]}>
      {isPlant || disable || globalModalVisible || isSuccess !== null ? (
        <View style={styles.background} />
      ) : (
        <CircleSlider
          value={timer * 2}
          onValueChange={value => onChange(Math.floor(value / 2))}
          strokeWidth={10}
          dialWidth={10}
          strokeColor={colors.home.stroke}
          meterColor={colors.home.slider}
          dialRadius={120}
          textColor={colors.home.slider}
        />
      )}
      <Tree
        image={getImageTree(isPlant, timer * 60, currentTimer, tree, isSuccess)}
        disable={disable || isSuccess !== null}
      />
      <Land />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    zIndex: 1,
  },
  background: {
    borderWidth: 10,
    borderColor: colors.bg_yellow,
    height: 250,
    width: 250,
    margin: 10,
    borderRadius: 500,
  },
});

export default CircleSliderComponent;
