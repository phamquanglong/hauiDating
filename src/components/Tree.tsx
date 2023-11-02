import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import useGlobalModalController from '~hooks/useGlobalModalController';
import {PlantingSettings} from '~components/plantingSettings/PlantingSettings';
import {usePlantingSettingsStore} from '~zustands/usePlantingSettingsStore';
import {useHomeStore} from '~zustands/index';
import RNBounceable from '@freakycoder/react-native-bounceable';

interface TreeProps {
  isPlant?: boolean;
  image?: ImageSourcePropType;
  disable?: boolean;
}

const Tree = (props: TreeProps) => {
  const {image} = props;
  const isPlant = useHomeStore(state => state.isPlant);
  const {tree} = usePlantingSettingsStore();
  const {onShowGlobalModal} = useGlobalModalController();
  const onPress = () => {
    onShowGlobalModal({
      visible: true,
      yesNoOption: {visible: false},
      children: <PlantingSettings />,
    });
  };

  return isPlant || props.disable ? (
    <View style={styles.treeBtn}>
      <Image source={image ?? tree.icon} style={styles.tree} />
    </View>
  ) : (
    <RNBounceable style={styles.treeBtn} onPress={onPress}>
      <Image source={tree.icon} style={styles.tree} />
    </RNBounceable>
  );
};

const styles = StyleSheet.create({
  treeBtn: {
    position: 'absolute',
    height: '40%',
  },
  tree: {
    height: '100%',
    width: '100%',
    aspectRatio: 5 / 5,
  },
});

export default Tree;
