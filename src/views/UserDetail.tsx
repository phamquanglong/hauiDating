import {
  faArrowLeft,
  faCalendar,
  faShareAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {IImage, IUser} from '~apis/User';
import UserApi from '~apis/user.api';
import {AnimatedContainer} from '~components/AnimatedContainer';
import DetailFooter from '~components/DetailFooter';
import {IconButton} from '~components/IconButton';
import Line from '~components/Line';
import LocationTag from '~components/LocationTag';
import {Spacer} from '~components/Spacer';
import {TitleCustom} from '~components/TitleCustom';
import {SwipeAction} from '~components/card/Card';
import {useGetHobbies} from '~hooks/useGetHobbies';
import {colors} from '~utils/colors';
import {getAge, width} from '~utils/commons';
import {ROUTE_NAMES} from '~utils/constants';

export interface UserDetailParams {
  itemUser?: IUser;
  id?: string;
}

const InfoItem = ({icon, text}: {icon: any; text: string}) => {
  return (
    <View style={{flexDirection: 'row', paddingVertical: 5}}>
      <FontAwesomeIcon icon={icon} color={colors.black_opacity} />
      <Spacer horizontal value={10} />
      <TitleCustom title={text} textStyle={styles.text} />
    </View>
  );
};

const InfoContent = ({itemUser, id}: {itemUser: IUser; id: number}) => {
  const {t} = useTranslation();
  const {getHobbies} = useGetHobbies();
  const onShare = () => {
    Share.share({
      message: itemUser?.userName,
      url: `deeplink://app/detail/${id}`,
    });
  };

  return (
    <View>
      <IconButton style={styles.buttonShare} onPress={onShare}>
        <FontAwesomeIcon icon={faShareAlt} size={25} />
      </IconButton>
      <View style={{padding: 20}}>
        <View style={{flexDirection: 'row'}}>
          <TitleCustom
            title={itemUser?.profile?.fullName}
            textStyle={styles.nameFooter}
          />
          <Spacer horizontal value={10} />
          <TitleCustom
            title={getAge(itemUser?.profile?.birthday).toString()}
            textStyle={styles.ageFooter}
          />
        </View>
        <LocationTag itemUser={itemUser} />
        <InfoItem icon={faUser} text={itemUser?.profile?.gender} />
        <InfoItem icon={faCalendar} text={itemUser?.profile?.birthday} />
      </View>
      <Line bgColor={colors.inactive} />
      <View style={{padding: 20}}>
        <TitleCustom title={t('detail.aboutMe')} textStyle={styles.title} />
        <TitleCustom title={itemUser?.profile?.bio} textStyle={styles.text} />
      </View>
      <Line bgColor={colors.inactive} />
      <View style={{padding: 20}}>
        <TitleCustom title={t('detail.hobbies')} textStyle={styles.title} />
        <View style={{flexDirection: 'row', marginVertical: 10}}>
          {itemUser?.userHobbies?.map(i => (
            <View style={styles.hobbiesTag} key={i.id}>
              <TitleCustom title={getHobbies(i.id)?.name ?? ''} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const UserDetail = ({route}: any) => {
  const {goBack, navigate} = useNavigation();
  const [itemUser, setItemUser] = useState<IUser>(route.params.itemUser);
  const action: SwipeAction = route.params.action;
  const carouselContainerRef = route.params.carouselContainerRef;
  const carouselRef = useRef<Carousel<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    console.log('id', route.params.id);
    if (route.params.id) {
      UserApi.getInfoById(route.params.id).then(res => setItemUser(res.data));
    }
  }, [route]);

  const onNext = () => {
    carouselRef.current?.snapToNext();
  };
  const onPrev = () => {
    carouselRef.current?.snapToPrev();
  };

  const onGoBack = () => {
    if (route.params.id) {
      navigate(ROUTE_NAMES.HOMEDRAWER as never);
      return;
    }
    goBack();
  };

  const _renderImage = ({item}: {item: IImage}) => {
    return (
      <ImageBackground source={{uri: item.imageUrl}} style={styles.image}>
        <TouchableOpacity style={styles.zone} onPress={onPrev} />
        <TouchableOpacity style={styles.zone} onPress={onNext} />
      </ImageBackground>
    );
  };

  return (
    <AnimatedContainer style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <IconButton onPress={onGoBack} style={styles.buttonBack}>
            <FontAwesomeIcon icon={faArrowLeft} size={25} />
          </IconButton>
          <Pagination
            // containerStyle={}
            dotStyle={{width: 20}}
            activeDotIndex={currentIndex}
            dotsLength={itemUser?.images?.length}
          />
        </View>
        <Carousel
          onBeforeSnapToItem={(index: number) => setCurrentIndex(index)}
          ref={carouselRef}
          scrollEnabled={false}
          data={itemUser?.images}
          renderItem={_renderImage}
          layout="tinder"
          sliderWidth={width}
          itemWidth={width}
        />
        <InfoContent itemUser={itemUser} id={route.params.id ?? itemUser.id} />
      </ScrollView>
      {!action && (
        <DetailFooter
          itemUser={itemUser}
          carouselContainerRef={carouselContainerRef}
        />
      )}
    </AnimatedContainer>
  );
};

const styles = StyleSheet.create({
  zone: {
    height: '100%',
    width: '50%',
  },
  container: {
    backgroundColor: colors.white,
    paddingBottom: 100,
  },
  image: {
    aspectRatio: 2 / 3,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.inactive,
  },
  nameFooter: {
    fontSize: 24,
    color: colors.text.black,
    fontWeight: 'bold',
  },
  ageFooter: {
    fontSize: 24,
    color: colors.text.black,
  },
  title: {
    fontSize: 20,
    color: colors.text.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {color: colors.black_opacity},
  hobbiesTag: {
    backgroundColor: colors.inactive,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginEnd: 10,
    borderRadius: 100,
  },
  buttonShare: {
    position: 'absolute',
    top: -20,
    right: 30,
    zIndex: 1,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  header: {
    position: 'absolute',
    zIndex: 1,
    paddingStart: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 60,
  },
  buttonBack: {},
});

export default UserDetail;
