import React, {ReactNode, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AnimatedContainer} from '~components/AnimatedContainer';
import {Tag} from '~components/plantingSettings/Tag';
import useHomeScreenController from '~hooks/useHomeScreenController';
import HomeBottom from '~components/HomeBottom';
import {HeaderHome} from '~components/home/HeaderHome';
import CircleSliderComponent from '~components/CircleSlider';
import {colors} from '~utils/colors';
import {TitleHome} from '~components/home/TitleHome';
import {images} from '~utils/images';
import {Position} from '~zustands/useHomeStore';
import ButtonPrimary from '~components/ButtonPrimary';
import {Spacer} from '~components/Spacer';
import {faVideo} from '@fortawesome/free-solid-svg-icons';

const HomeScreen = () => {
  const {
    isPlant,
    onHandleHomeBtn,
    tag,
    onShowGlobalModal,
    isSuccess,
    tree,
    t,
    onHideGlobalModal,
    onRemoveOrDoubleCoins,
  } = useHomeScreenController();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isPlant && isSuccess !== null) {
      const ResultModal: ReactNode = (
        <View style={styles.modalContainer}>
          <Text style={{textAlign: 'center', maxWidth: '90%'}}>
            {t.do(
              isSuccess
                ? 'home.title.you_have_planted_1_healthy_tree'
                : 'home.title.you_can_do_it_better_next_time',
            )}
          </Text>
          <Image
            source={isSuccess ? tree.icon : images.ic_tree_without_leaves}
            style={{width: 50, height: 50, marginVertical: 20}}
          />
          <View style={{flexDirection: 'row'}}>
            <ButtonPrimary
              onPress={onHideGlobalModal}
              text={t.do('home.ok')}
              textStyle={{color: colors.text.white}}
              style={[styles.btn, {backgroundColor: colors.primary}]}
            />
            <Spacer horizontal value={10} />
            <ButtonPrimary
              onPress={onRemoveOrDoubleCoins}
              icon={isSuccess ? faVideo : undefined}
              text={t.do(
                isSuccess ? 'home.double_coins' : 'home.delete_record',
              )}
              textStyle={{
                color: colors.text.white,
              }}
              style={[
                styles.btn,
                {
                  backgroundColor: isSuccess ? colors.bg_yellow : colors.error,
                  justifyContent: 'center',
                },
              ]}
            />
          </View>
        </View>
      );
      onShowGlobalModal({
        visible: true,
        yesNoOption: {visible: false},
        children: ResultModal,
        position: Position.center,
      });
    }
  }, [isPlant, isSuccess]);

  return (
    <AnimatedContainer style={styles.container}>
      <View style={styles.flex_1}>
        <HeaderHome navigation={navigation} />
        <TitleHome />
      </View>
      <CircleSliderComponent />
      <View style={styles.flex_1}>
        <Tag item={tag} isAtHome />
        <HomeBottom onHandleHomeBtn={onHandleHomeBtn} isPlant={isPlant} />
      </View>
    </AnimatedContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: colors.primary,
  },
  flex_1: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 180,
  },
  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
