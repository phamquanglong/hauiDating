import {usePlantingSettingsStore} from '~zustands/usePlantingSettingsStore';
import {tags} from '~utils/constants';
import {useServices} from '~services/translate';
import useGlobalModalController from '~hooks/useGlobalModalController';
import {ReactNode} from 'react';

export const useGroupTagController = () => {
  const {tag, setTag} = usePlantingSettingsStore();
  const {onShowGlobalModal} = useGlobalModalController();
  const {t} = useServices();

  const onPress = (item: Tag, isAtHome: boolean, children?: ReactNode) => {
    if (isAtHome) {
      onShowGlobalModal({
        visible: true,
        yesNoOption: {visible: false},
        children: children,
      });
    } else {
      setTag(item);
    }
  };

  return {
    tag,
    setTag,
    tags,
    t,
    onPress,
  };
};
