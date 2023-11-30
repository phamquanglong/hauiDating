import {useEffect} from 'react';
import {AppState} from 'react-native';
import {storage} from '~services/localStorage';
import useHomeStore from '~zustands/useHomeStore';

export const useLocalStorage = () => {
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    const jsonData = storage.getString('data');
    if (jsonData && jsonData?.length > 0) {
      const dataObject = JSON.parse(jsonData);
      //   setCoins(dataObject.coins);
      console.log(dataObject);
    }
    // fetchDataLocal();
  }, []);

  const coins = useHomeStore(state => state.coins);
  const setCoins = useHomeStore(state => state.setCoins);

  const fetchDataLocal = () => {
    const jsonData = storage.getString('data');
    if (jsonData && jsonData?.length > 0) {
      const dataObject = JSON.parse(jsonData);
      setCoins(dataObject.coins);
      console.log(dataObject);
    }
  };

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'inactive') {
      const data = {
        coins,
      };
      storage.set('data', JSON.stringify(data));
      console.log('the app is closed');
    }
    // if (nextAppState === 'active') {
    //   fetchDataLocal();
    // }
  };
};
