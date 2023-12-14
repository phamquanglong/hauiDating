import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import UserApi from '~apis/user.api';
import AppLoading from '~components/AppLoading';
import {Spacer} from '~components/Spacer';
import StackHeader from '~components/StackHeader';
import {TitleCustom} from '~components/TitleCustom';
import ImageItem from '~components/edit-info/ImageItem';
import BasicInfo from '~components/setupProfile/BasicInfo';
import SettingsProfile from '~components/setupProfile/SettingsProfile';
import {colors} from '~utils/colors';
import {useEditInfoStore} from '~zustands/useEditInfoStore';
import {useLoading} from '~zustands/useLoading';
import {useUserInfo} from '~zustands/useUserInfo';

const EditInfoScreen = () => {
  const {userInfo} = useUserInfo();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const {loading} = useLoading();
  const {t} = useTranslation();
  const toast = useToast();

  useEffect(() => {
    setEditInfo({
      ...userInfo,
      images: userInfo?.images.map(i => i.imageUrl),
    });
  }, []);

  const _renderItem = ({item}: {item: string}) => {
    return <ImageItem image={item} />;
  };

  const getDataImages = useMemo(() => {
    if (editInfo?.images?.length) {
      const num = 6 - (editInfo?.images?.length ?? 0);
      let arr: any[] | undefined = [...(editInfo?.images as string[])];
      for (let i = 0; i < num; i++) {
        (arr as any[]).push(undefined);
      }
      return arr;
    }
    return [undefined, undefined, undefined, undefined, undefined, undefined];
  }, [editInfo]);

  const onSave = () => {
    editInfo?.profile &&
      UserApi.updateUserInformation({
        profile: {
          ...editInfo?.profile,
          longitude: Number(editInfo?.profile?.longitude),
          latitude: Number(editInfo?.profile?.latitude),
        },
        // images: editInfo?.images,
        settings: editInfo?.settings,
        hobbies: [0, 23, 10],
      })
        .then(() => {
          toast.show(t('editInfo.success'), {
            type: 'success',
            successIcon: (
              <FontAwesomeIcon icon={faCheckCircle} color={colors.white} />
            ),
            duration: 2000,
          });
        })
        .catch(err => console.log({err}));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StackHeader
        title={t('editInfo.title')}
        textRightButton={t('save')}
        onPressRightButton={onSave}
      />
      <ScrollView>
        <FlatList
          scrollEnabled={false}
          style={{height: 'auto'}}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          numColumns={3}
          data={getDataImages}
          renderItem={_renderItem}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
        />
        <View style={{marginHorizontal: 10}}>
          <TitleCustom
            title={t('setupProfile.basicInfo')}
            textStyle={styles.title}
          />
          <BasicInfo data={editInfo} />
          <Spacer value={10} />
          <TitleCustom
            title={t('setupProfile.settings')}
            textStyle={styles.title}
          />
          <SettingsProfile settings={editInfo?.settings} />
        </View>

        {loading && <AppLoading />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 10,
  },
  titleHeader: {
    fontWeight: '600',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
  },
});

export default EditInfoScreen;
