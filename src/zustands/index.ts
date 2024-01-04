import {useEditInfoStore} from './useEditInfoStore';
import useHomeStore from './useHomeStore';
import {defaultProfile, useSetupProfile} from './useSetupProfile';
import {useSuggestUsers} from './useSuggestUsers';
import {useUserInfo} from './useUserInfo';

const useServiceZustands = () => {
  const {setSetupProfile} = useSetupProfile();
  const {setSuggestUsers} = useSuggestUsers();
  const {setUserInfo} = useUserInfo();
  const {setEditInfo} = useEditInfoStore();

  const clearAll = () => {
    setSetupProfile(defaultProfile);
    setSuggestUsers([]);
    setUserInfo(null);
    setEditInfo(null);
  };

  return {clearAll};
};

export {useHomeStore, useServiceZustands};
