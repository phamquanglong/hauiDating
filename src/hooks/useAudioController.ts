import useGlobalModalController from '~hooks/useGlobalModalController';
import {Position} from '~zustands/useHomeStore';
import {ReactNode, useEffect, useState} from 'react';
import SoundPlayer from 'react-native-sound-player';
import {useHomeStore} from '~zustands/index';

export const useAudioController = () => {
  const {onShowGlobalModal} = useGlobalModalController();
  const audio = useHomeStore(state => state.audio);
  const setAudio = useHomeStore(state => state.setAudio);
  const [showFileName, setShowFileName] = useState(true);
  const timer = useHomeStore(state => state.timer);

  async function getInfo() {
    try {
      const info = await SoundPlayer.getInfo();
      console.log('abc', info);
      return info;
    } catch (e) {
      console.log('There is no song playing', e);
    }
  }

  const handleAudioButtonPress = async () => {
    const info = await getInfo();

    console.log(Math.round((timer * 60) / (info?.duration ?? 1)));
    if (audio?.isPlaying && audio.fileName) {
      try {
        SoundPlayer.playSoundFile(audio.fileName, 'mp3');
        SoundPlayer.setNumberOfLoops(
          Math.round((timer * 60) / (info?.duration ?? 1)),
        );
        // if (info && info.currentTime > 0) {
        //   SoundPlayer.resume();
        // } else {
        //   SoundPlayer.playSoundFile(audio.fileName, 'mp3');
        // }
      } catch (e) {
        console.log('cannot play the sound file', e);
      }
    } else {
      SoundPlayer.pause();
    }
  };

  const onShowFileName = () => {
    setTimeout(() => {
      setShowFileName(false);
    }, 5000);
  };
  useEffect(() => {
    setShowFileName(true);
    onShowFileName();
  }, [audio]);

  useEffect(() => {
    handleAudioButtonPress();
  }, [audio]);

  const onPress = () => {
    setAudio({
      isPlaying: !audio?.isPlaying,
      fileName: audio?.fileName,
    });
  };
  const onLongPress = (children?: ReactNode) => {
    onShowGlobalModal({
      visible: true,
      position: Position.center,
      yesNoOption: {visible: false},
      children: children,
    });
  };

  const onSelectAudio = (value: any) => {
    setAudio({
      isPlaying: audio?.isPlaying ?? true,
      fileName: value.fileName,
    });
    SoundPlayer.stop();
  };

  return {
    onPress,
    onLongPress,
    isPlaying: audio?.isPlaying,
    audio,
    onSelectAudio,
    onShowFileName,
    showFileName,
  };
};
