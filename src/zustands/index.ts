import useHomeStore from './useHomeStore';
import {defaultProfile, useSetupProfile} from './useSetupProfile';
import {useSuggestUsers} from './useSuggestUsers';
import {useUserInfo} from './useUserInfo';

const useServiceZustands = () => {
  const {setSetupProfile} = useSetupProfile();
  const {setSuggestUsers} = useSuggestUsers();
  const {setUserInfo} = useUserInfo();

  const clearAll = () => {
    setSetupProfile(defaultProfile);
    setSuggestUsers([]);
    setUserInfo(null);
  };

  return {clearAll};
};

export {useHomeStore, useServiceZustands};
