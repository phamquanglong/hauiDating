import {usePlantingSettingsStore} from '~zustands/usePlantingSettingsStore';
import {useServices} from '~services/translate';
import useHomeStore, {Position} from '~zustands/useHomeStore';
import {ReactNode} from 'react';

export const useGroupTreeController = () => {
  const {tree, setTree, treesList, setTreesList} = usePlantingSettingsStore();
  const {setGlobalModal, coins, setCoins} = useHomeStore();
  const {t} = useServices();

  const onSelect = (item: Tree, children: ReactNode) => {
    if (!item.available) {
      setGlobalModal({visible: false, yesNoOption: {visible: false}});
      setGlobalModal({
        visible: true,
        yesNoOption: {visible: false},
        position: Position.center,
        children: children,
      });
      return;
    }
    setTree(item);
  };

  const onUnlock = (item: Tree, children: ReactNode) => {
    if (coins >= item.value) {
      setGlobalModal({visible: false, yesNoOption: {visible: false}});
      setCoins(coins - item.value);
      setTreesList(
        [
          ...treesList.filter(i => i.id !== item.id),
          {
            ...item,
            available: true,
          },
        ].sort((a, b) => Number(b.available) - Number(a.available)),
      );
      setGlobalModal({
        visible: true,
        yesNoOption: {visible: false},
        children,
        position: Position.center,
      });
    }
  };

  const onHideModal = () => {
    setGlobalModal({visible: false, yesNoOption: {visible: false}});
  };

  return {
    tree,
    onSelect,
    treesList,
    setTreesList,
    onUnlock,
    onHideModal,
    coins,
    t,
  };
};
