import React from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {Image, StyleSheet, View} from 'react-native';
import {IconButton} from '~components/IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus, faXmark} from '@fortawesome/free-solid-svg-icons';
import {width} from '~utils/commons';
import {colors} from '~utils/colors';
import PickImage from '~components/setupProfile/PickImage';
import useGlobalModalController from '~hooks/useGlobalModalController';
import {Position} from '~zustands/useHomeStore';
import {useEditInfoStore} from '~zustands/useEditInfoStore';

const ImageItem = ({
  image,
  onRemove,
}: {
  image: string;
  onRemove?: () => void;
}) => {
  const {onShowGlobalModal, onHideGlobalModal} = useGlobalModalController();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const onPress = () => {
    if (onRemove) {
      onRemove();
      return;
    }
    if (image) {
      setEditInfo({
        ...editInfo,
        images: editInfo?.images?.filter(i => i !== image),
      });
      return;
    }
    onShowGlobalModal({
      visible: true,
      yesNoOption: {visible: false},
      children: (
        <View style={{width: width, flex: 0.5}}>
          <PickImage multi={1} onHideGlobalModal={onHideGlobalModal} />
        </View>
      ),
      position: Position.bottom,
    });
  };

  return (
    <RNBounceable style={styles.container} onPress={onPress}>
      {image ? (
        <Image
          source={{uri: image}}
          style={[
            styles.image,
            {
              borderColor: colors.inactive,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              borderStyle: 'dashed',
            },
          ]}
        />
      )}
      <IconButton
        onPress={onPress}
        style={[
          styles.closeButton,
          {
            backgroundColor: image ? colors.white : colors.primary,
            borderWidth: image ? 0.5 : undefined,
          },
        ]}>
        <FontAwesomeIcon
          icon={image ? faXmark : faPlus}
          color={image ? colors.black_opacity : colors.white}
        />
      </IconButton>
    </RNBounceable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  image: {
    width: width * 0.26,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    borderWidth: 1.5,
    margin: 2,
  },
  closeButton: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 100,
  },
});

export default ImageItem;
