import React from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheckCircle,
  faVolumeHigh,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import {colors} from '~utils/colors';
import {useAudioController} from '~hooks/useAudioController';
import {Image, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {audios} from '~utils/constants';
import {useHomeStore} from '~zustands/index';
import {width} from '~utils/commons';
import {useServices} from '~services/translate';

export const Audio = () => {
  const {t} = useServices();
  const {onPress, onLongPress, isPlaying, audio, onSelectAudio, showFileName} =
    useAudioController();

  const RenderAudioItem = ({item}: any) => {
    const audio = useHomeStore(state => state.audio);
    return (
      <RNBounceable
        style={styles.audioItem}
        onPress={() => onSelectAudio(item)}>
        {item.fileName === audio?.fileName && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            color={colors.bg_opacity}
            size={30}
            style={{marginBottom: 10, marginTop: -50}}
          />
        )}
        {item.thumbnail ? (
          <Image
            source={item.thumbnail}
            style={[
              styles.thumbnail,
              item.fileName === audio?.fileName && {
                borderWidth: 5,
                borderColor: colors.bg_opacity,
              },
            ]}
          />
        ) : (
          <View style={styles.thumbnail} />
        )}
        <Text style={styles.fileName}>
          {(item.fileName as string).split('_').join(' ')}
        </Text>
      </RNBounceable>
    );
  };

  const AudioModal = (
    <Carousel
      defaultIndex={audios.findIndex(i => i.fileName === audio?.fileName) ?? 0}
      mode="parallax"
      loop={false}
      data={audios}
      renderItem={RenderAudioItem}
      width={width * 0.8}
      height={width * 1.25}
    />
  );

  return (
    <View style={{flexDirection: 'row'}}>
      {showFileName && (
        <View style={styles.name}>
          <Text>{audio?.fileName?.split('_').join(' ')}</Text>
          <Text>{t('home.audio_name')}</Text>
        </View>
      )}
      <RNBounceable
        onPress={onPress}
        onLongPress={() => onLongPress(AudioModal)}>
        <FontAwesomeIcon
          icon={isPlaying ? faVolumeHigh : faVolumeMute}
          size={30}
          color={colors.bg_opacity}
        />
      </RNBounceable>
    </View>
  );
};

const styles = StyleSheet.create({
  audioItem: {
    alignItems: 'center',
    paddingHorizontal: -200,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 30,
    height: 500,
    aspectRatio: 9 / 16,
    borderRadius: 50,
    backgroundColor: colors.inactive,
  },
  fileName: {
    position: 'absolute',
    top: '50%',
    color: colors.text.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    fontSize: 30,
  },
  name: {
    marginEnd: 10,
  },
});
