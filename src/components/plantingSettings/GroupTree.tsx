import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useGroupTreeController} from '~hooks/PlantingSettings/useGroupTreeController';
import {colors} from '~utils/colors';
import {TitleCustom} from '~components/TitleCustom';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCoins, faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
import ButtonPrimary from '~components/ButtonPrimary';
import {images} from '~utils/images';

export const GroupTree = () => {
  const {onSelect, tree, treesList, t, onUnlock, coins, onHideModal} =
    useGroupTreeController();

  const renderItem = ({item}: {item: Tree}) => {
    const canUnlock = coins >= item.value;
    const unlockCongratModal = (
      <ImageBackground source={images.firework} style={{alignItems: 'center'}}>
        <Text style={{fontSize: 16, marginVertical: 10}}>
          {t.do('home.congrat_unlock')}
        </Text>
        <Image
          source={item.icon}
          style={{width: 100, height: 100, marginVertical: 20}}
        />
        <ButtonPrimary
          onPress={onHideModal}
          text={t.do('home.ok')}
          style={{
            backgroundColor: colors.primary,
            width: '100%',
            padding: 10,
            borderRadius: 10,
          }}
          textStyle={{color: colors.white, fontSize: 20}}
        />
      </ImageBackground>
    );
    const children = (
      <View style={styles.unlock_container}>
        <View style={styles.bg_tree}>
          <Image source={item.icon} style={{width: 150, height: 150}} />
          <View style={styles.tag}>
            <FontAwesomeIcon
              icon={faCoins}
              size={20}
              color={colors.white}
              style={{marginEnd: 10}}
            />
            <Text style={styles.text}>{item.value}</Text>
          </View>
        </View>
        <ButtonPrimary
          disabled={!canUnlock}
          onPress={() => onUnlock(item, unlockCongratModal)}
          text={t.do('home.unlock')}
          icon={faLockOpen}
          textStyle={styles.text}
          style={[
            styles.btn_unlock,
            {
              opacity: canUnlock ? 1 : 0.5,
            },
          ]}
        />
      </View>
    );
    return (
      <RNBounceable
        onPress={() => onSelect(item, children)}
        style={{
          opacity: item.available ? 1 : 0.5,
          marginHorizontal: 5,
          padding: 10,
          borderRadius: 5,
          backgroundColor:
            tree && tree.id === item.id ? colors.inactive : 'transparent',
        }}>
        <Image source={item.icon} style={{width: 50, height: 50}} />
        {!item.available && (
          <FontAwesomeIcon
            icon={faLock}
            color={colors.black}
            size={25}
            style={styles.ic_lock}
          />
        )}
      </RNBounceable>
    );
  };

  return (
    <>
      <TitleCustom
        title={t.do('home.plantingSettings.trees')}
        plantingSettings
      />
      <FlatList data={treesList} renderItem={renderItem} horizontal />
    </>
  );
};

const styles = StyleSheet.create({
  ic_lock: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  unlock_container: {
    alignItems: 'center',
    padding: 10,
  },
  bg_tree: {
    backgroundColor: colors.inactive,
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 50,
    width: '100%',
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
  },
  text: {
    color: colors.white,
    fontSize: 20,
  },
  btn_unlock: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  tag: {
    backgroundColor: colors.error,
    flexDirection: 'row',
    width: 150,
    justifyContent: 'center',
    padding: 5,
    position: 'absolute',
    transform: [{rotate: '45deg'}],
    right: -40,
    top: 20,
  },
});
