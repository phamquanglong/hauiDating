import {useHomeStore} from '../zustands';
import {usePlantingSettingsStore} from '~zustands/usePlantingSettingsStore';
import {useServices} from '~services/translate';

const useCircleSliderController = () => {
  const timer = useHomeStore(state => state.timer);
  const setTimer = useHomeStore(state => state.setTimer);
  const isPlant = useHomeStore(state => state.isPlant);
  const currentTimer = useHomeStore(state => state.currentTimer);
  const isSuccess = useHomeStore(state => state.isSuccess);
  const globalModalVisible = useHomeStore(state => state.globalModal.visible);
  const {tree} = usePlantingSettingsStore();
  const {t} = useServices();

  const onChange = (x: number) => {
    setTimer(x);
    return x;
  };

  return {
    timer,
    onChange,
    isPlant,
    currentTimer,
    tree,
    globalModalVisible,
    t,
    isSuccess,
  };
};

export default useCircleSliderController;
