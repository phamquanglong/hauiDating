import {useEffect} from 'react';
import useGlobalModalController from './useGlobalModalController';
import {usePlantingSettingsStore} from '~zustands/usePlantingSettingsStore';
import {useServices} from '~services/translate';
import useHomeStore from '~zustands/useHomeStore';
import SoundPlayer from 'react-native-sound-player';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';

const useHomeScreenController = () => {
  const isPlant = useHomeStore(state => state.isPlant);
  const onPlant = useHomeStore(state => state.onPlant);
  const onGiveUp = useHomeStore(state => state.onGiveUp);
  const timer = useHomeStore(state => state.timer);
  const isSuccess = useHomeStore(state => state.isSuccess);
  const audio = useHomeStore(state => state.audio);
  const setCoins = useHomeStore(state => state.setCoins);
  const coins = useHomeStore(state => state.coins);
  const {tag, tree, reward} = usePlantingSettingsStore();
  const {onShowGlobalModal, onHideGlobalModal} = useGlobalModalController();
  const {t} = useServices();

  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    TestIds.INTERSTITIAL,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  useEffect(() => {
    if (isClosed) {
      setCoins(coins + reward);
      onHideGlobalModal();
    }
  }, [isClosed]);

  const onHandleHomeBtn = isPlant
    ? () =>
        onShowGlobalModal({
          message: t.do('home.give_up_question'),
          visible: true,
          yesNoOption: {
            visible: true,
            onNo: onHideGlobalModal,
            onYes: () => {
              onGiveUp();
              onHideGlobalModal();
            },
          },
        })
    : onPlant;

  useEffect(() => {
    if (!audio?.isPlaying) {
      SoundPlayer.stop();
    }
  }, [audio]);

  useEffect(() => {
    if (isSuccess) {
      load();
      console.log('isLoading', isLoaded);
    }
  }, [isSuccess]);

  const onRemoveOrDoubleCoins = () => {
    if (isSuccess) {
      show();
    }
  };

  return {
    isPlant,
    onHandleHomeBtn,
    tag,
    timer,
    t,
    isSuccess,
    tree,
    onShowGlobalModal,
    onHideGlobalModal,
    onRemoveOrDoubleCoins,
  };
};

export default useHomeScreenController;
