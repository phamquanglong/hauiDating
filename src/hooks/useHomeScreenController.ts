import {useEffect, useState} from 'react';
import GetLocation from 'react-native-get-location';
import UserApi from '~apis/user.api';
import {useSuggestUsers} from '~zustands/useSuggestUsers';
import {useUserInfo} from '~zustands/useUserInfo';

const useHomeScreenController = () => {
  const {userInfo, setUserInfo} = useUserInfo();
  const {suggestUsers, setSuggestUsers} = useSuggestUsers();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserApi.getInfo().then(res => {
      setUserInfo(res.data);
    });
    UserApi.getSuggestUser().then(res => {
      setSuggestUsers(res.data);
      setLoading(prv => !prv);
    });
  }, [setSuggestUsers, setUserInfo]);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    }).then(location => {
      userInfo?.profile &&
        UserApi.updateUserInformation({
          profile: {
            ...userInfo.profile,
            latitude: location.latitude,
            longitude: location.longitude,
          },
          hobbies: userInfo.userHobbies.map(i => i.id),
        });
      // .then(res => console.log('ass', res));
    });
  }, [userInfo]);

  return {
    userInfo,
    suggestUsers,
    loading,
  };
};

export default useHomeScreenController;
