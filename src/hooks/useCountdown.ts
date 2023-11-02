import {useEffect, useState} from 'react';
import {getTimer} from '../utils/commons';
import {useHomeStore} from '../zustands';
import {usePlantingSettingsStore} from '~zustands/usePlantingSettingsStore';

const useCountdown = (timer: number) => {
  const [countdown, setCountdown] = useState(timer);
  const isPlant = useHomeStore(state => state.isPlant);
  const onGiveUp = useHomeStore(state => state.onGiveUp);
  const setCurrentTimer = useHomeStore(state => state.setCurrentTimer);
  const currentTimer = useHomeStore(state => state.currentTimer);
  const setIsSuccess = useHomeStore(state => state.setIsSuccess);
  const setCoins = useHomeStore(state => state.setCoins);
  const coins = useHomeStore(state => state.coins);
  const {tree, setReward, reward} = usePlantingSettingsStore();

  useEffect(() => {
    setCountdown(timer);
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlant) {
        setCountdown(countdown - 1);
        setCurrentTimer(countdown - 1);
      }
      if (currentTimer === 1) {
        setReward((timer / 60) * tree.value);
        setIsSuccess(true);
        setCoins(coins + (timer / 60) * tree.value);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [
    countdown,
    isPlant,
    setCurrentTimer,
    currentTimer,
    onGiveUp,
    setIsSuccess,
    timer,
    coins,
    setCoins,
    tree,
    reward,
    setReward,
  ]);

  return getTimer(countdown);
};

export default useCountdown;
