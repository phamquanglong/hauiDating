import {
  faCameraAlt,
  faFolderOpen,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RNBounceable from '@freakycoder/react-native-bounceable';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Spacer} from '~components/Spacer';
import {colors} from '~utils/colors';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useSetupProfile} from '~zustands/useSetupProfile';
import Carousel from 'react-native-snap-carousel';
import {width} from '~utils/commons';
import {IconButton} from '~components/IconButton';
import {useAnimated} from '~hooks/useAnimated';
import UserApi from '~apis/user.api';
import {useEditInfoStore} from '~zustands/useEditInfoStore';
import AppLoading from '~components/AppLoading';
import {useLoading} from '~zustands/useLoading';

interface PickImageProps {
  multi?: number;
  onHideGlobalModal?: () => void;
}

const PickImage = ({multi = 6, onHideGlobalModal}: PickImageProps) => {
  const {t} = useTranslation();
  const {setupProfile, setSetupProfile} = useSetupProfile();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const [loading, setLoading] = useState(false);
  const {transformValue} = useAnimated();
  const {setLoading: setGlobalLoading} = useLoading();

  const uploadImages = (res: ImagePickerResponse) => {
    if (res.didCancel) {
      return;
    }
    setLoading(true);
    multi === 1 && setGlobalLoading(true);
    onHideGlobalModal?.();
    const promises = res.assets?.map(async i => {
      const imageData = {
        uri: i.uri,
        name: i.fileName,
        type: i.type,
      };
      return UserApi.uploadImage(imageData);
    });
    promises &&
      Promise.allSettled(promises).then(response => {
        let arr: string[] | undefined =
          multi === 1 ? editInfo?.images : setupProfile?.image;
        response.forEach(i => arr && arr.push(i?.value?.data.secure_url ?? ''));
        setLoading(false);
        multi === 1 && setGlobalLoading(false);
        if (multi === 1) {
          setEditInfo({
            ...editInfo,
            images: arr,
          });
          return;
        }
        setSetupProfile({
          ...setupProfile,
          image: arr,
        });
      });
  };

  const onLaunchCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        durationLimit: multi,
      },
      res => uploadImages(res),
    );
  };

  const onLaunchLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: multi,
        quality: 0.1,
      },
      res => uploadImages(res),
    );
  };

  const imageList = () => {
    const removeImage = (item: string) => () => {
      setSetupProfile({
        ...setupProfile,
        image: setupProfile?.image?.filter(i => i !== item),
      });
    };

    const _renderItem = ({item}: {item: string}) => {
      return (
        <View style={styles.imageContainer}>
          <IconButton onPress={removeImage(item)} style={styles.closeButton}>
            <FontAwesomeIcon icon={faXmarkCircle} size={25} />
          </IconButton>
          <Image source={{uri: item}} style={styles.image} />
        </View>
      );
    };

    return (
      <View style={styles.imageList}>
        {loading ? (
          <ActivityIndicator />
        ) : setupProfile?.image && setupProfile?.image?.length > 0 ? (
          <Carousel
            layout="stack"
            layoutCardOffset={18}
            data={setupProfile?.image ?? []}
            renderItem={_renderItem}
            sliderWidth={width * 0.84}
            itemWidth={150}
          />
        ) : (
          <View style={styles.emptyImage}>
            <Text style={{color: colors.black_opacity}}>
              {t('setupProfile.emptyImage')}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: transformValue}],
        },
      ]}>
      {multi === 6 && imageList()}
      <View style={styles.buttonContainer}>
        <RNBounceable style={styles.button} onPress={onLaunchCamera}>
          <FontAwesomeIcon icon={faCameraAlt} size={30} />
          <Text>{t('setupProfile.takePhoto')}</Text>
        </RNBounceable>
        <Spacer horizontal value={10} />
        <RNBounceable style={styles.button} onPress={onLaunchLibrary}>
          <FontAwesomeIcon icon={faFolderOpen} size={30} />
          <Text>{t('setupProfile.selectFromLibrary')}</Text>
        </RNBounceable>
      </View>
      {loading && multi === 1 && <AppLoading />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    flex: 1,
    aspectRatio: 1 / 1,
    backgroundColor: colors.inactive,
    borderRadius: 15,
    justifyContent: 'center',
  },
  image: {
    aspectRatio: 1 / 1,
    maxHeight: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.white,
  },
  imageList: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.black_opacity,
    borderStyle: 'dashed',
    borderRadius: 15,
    height: 170,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  emptyImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {backgroundColor: colors.inactive, borderRadius: 10},
});

export default PickImage;
