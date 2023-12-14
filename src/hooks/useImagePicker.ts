import {useEditInfoStore} from '~zustands/useEditInfoStore';
import {useLoading} from '~zustands/useLoading';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useSetupProfile} from '~zustands/useSetupProfile';
import UserApi from '~apis/user.api';
import useGlobalModalController from './useGlobalModalController';

const useImagePicker = (multi?: number, setLoading?: any, setImages?: any) => {
  const {onHideGlobalModal} = useGlobalModalController();
  const {setLoading: setGlobalLoading} = useLoading();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const {setupProfile, setSetupProfile} = useSetupProfile();

  const uploadImages = (res: ImagePickerResponse) => {
    if (res.didCancel) {
      return;
    }
    setLoading && setLoading(true);
    multi === 1 && setGlobalLoading(true);
    onHideGlobalModal?.();
    const promises = res.assets?.map(async i => {
      const imageData = {
        uri: i.uri,
        name: i.fileName,
        type: i.type,
      };
      return UserApi.uploadImage(imageData);
    });
    promises &&
      Promise.allSettled(promises).then(response => {
        let arr: string[] | undefined =
          multi === 1 ? editInfo?.images : setImages ? [] : setupProfile?.image;
        response.forEach(i => arr && arr.push(i?.value?.data.secure_url ?? ''));
        setLoading(false);
        (multi === 1 || setImages) && setGlobalLoading(false);
        if (setImages) {
          setImages((prv: any) => [...prv, ...(arr as string[])]);
          return;
        }
        if (multi === 1) {
          setEditInfo({
            ...editInfo,
            images: arr,
          });
          return;
        }
        setSetupProfile({
          ...setupProfile,
          image: arr,
        });
      });
  };

  const onLaunchCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        durationLimit: multi,
      },
      res => uploadImages(res),
    );
  };

  const onLaunchLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: multi,
        quality: 0.1,
      },
      res => uploadImages(res),
    );
  };

  return {
    onLaunchCamera,
    onLaunchLibrary,
  };
};

export default useImagePicker;
