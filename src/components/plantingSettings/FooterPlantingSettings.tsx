import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CircleSliderComponent from '~components/CircleSlider';
import ButtonPrimary from '~components/ButtonPrimary';
import {useServices} from '~services/translate';
import {colors} from '~utils/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHourglass} from '@fortawesome/free-solid-svg-icons';
import {Tag} from '~components/plantingSettings/Tag';
import useHomeScreenController from '~hooks/useHomeScreenController';

export const FooterPlantingSettings = () => {
  const {t} = useServices();
  const {onHandleHomeBtn, tag, timer} = useHomeScreenController();
  const isDisabled = timer === 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CircleSliderComponent disable />
        <View style={styles.status}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faHourglass}
              size={15}
              color={colors.white}
            />
            <Text style={{marginStart: 5, color: colors.text.white}}>
              {timer}
            </Text>
          </View>
          <Tag item={tag} isAtHome disable />
        </View>
      </View>
      <ButtonPrimary
        disabled={isDisabled}
        onPress={onHandleHomeBtn}
        text={t.do('home.plant')}
        textStyle={{color: colors.text.green}}
        style={{
          opacity: isDisabled ? 0.5 : 1,
          backgroundColor: colors.white,
          margin: 10,
          padding: 15,
          borderRadius: 100,
          minWidth: 80,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  status: {
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 8,
  },
  content: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
});
