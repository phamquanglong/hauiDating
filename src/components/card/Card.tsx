import React, {useRef, useState} from 'react';
import {IImage, IUser} from '~apis/User';
import {TitleCustom} from '~components/TitleCustom';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAge, width} from '~utils/commons';
import TinderCard from 'react-tinder-card';
import {colors} from '~utils/colors';
import {Spacer} from '~components/Spacer';
import {useGetHobbies} from '~hooks/useGetHobbies';
import UserActionsApi from '~apis/user-actions.api';
import LocationTag from '~components/LocationTag';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';

type CardProps = {
  itemUser: IUser;
  carouselContainerRef: React.RefObject<Carousel<any>>;
};

export enum SwipeType {
  UP = 'up',
  LEFT = 'left',
  RIGHT = 'right',
  DOWN = 'down',
}

export enum SwipeAction {
  DISLIKE = 'dislike',
  LIKE = 'like',
}

const ListFooterComponent = ({itemUser, carouselContainerRef}: CardProps) => {
  const {getHobbies} = useGetHobbies();
  const {navigate} = useNavigation<any>();
  const onPress = () => {
    navigate(ROUTE_NAMES.USERDETAIL as never, {
      itemUser: itemUser,
      carouselContainerRef: carouselContainerRef,
    });
  };
  return (
    <View style={styles.footer} onTouchEnd={onPress}>
      <LocationTag itemUser={itemUser} />
      <View style={{flexDirection: 'row'}}>
        <TitleCustom
          title={itemUser.profile.fullName}
          textStyle={styles.nameFooter}
        />
        <Spacer horizontal value={10} />
        <TitleCustom
          title={getAge(itemUser.profile.birthday).toString()}
          textStyle={styles.ageFooter}
        />
      </View>
      <View style={{flexDirection: 'row', marginVertical: 10}}>
        {itemUser.userHobbies.map(i => (
          <View style={styles.hobbiesTag} key={i.id}>
            <TitleCustom title={getHobbies(i.id)?.name ?? ''} />
          </View>
        ))}
      </View>
    </View>
  );
};

const Card = ({itemUser, carouselContainerRef}: CardProps) => {
  const carouselRef = useRef<Carousel<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const _renderItem = ({item}: {item: IImage}) => {
    return (
      <ImageBackground
        imageStyle={{borderRadius: 20}}
        source={{uri: item.imageUrl}}
        style={{
          aspectRatio: 1 / 2,
          flexDirection: 'row',
          backgroundColor: colors.inactive,
          borderRadius: 20,
        }}>
        <TouchableOpacity style={styles.zone} onPress={onPrev} />
        <TouchableOpacity style={styles.zone} onPress={onNext} />
      </ImageBackground>
    );
  };

  const onSwipe = (direction: SwipeType | any) => {
    carouselContainerRef.current?.snapToNext();
    switch (direction) {
      case SwipeType.LEFT:
        UserActionsApi.createAction({
          targetUserId: itemUser.id,
          action: SwipeAction.DISLIKE,
        });
        break;
      case SwipeType.RIGHT:
        UserActionsApi.createAction({
          targetUserId: itemUser.id,
          action: SwipeAction.LIKE,
        });
        break;
      default:
        return;
    }
  };

  const onNext = () => {
    carouselRef.current?.snapToNext();
  };
  const onPrev = () => {
    carouselRef.current?.snapToPrev();
  };

  return (
    <TinderCard
      swipeRequirementType="position"
      onSwipe={onSwipe}
      preventSwipe={['up', 'down']}>
      <Pagination
        containerStyle={{
          position: 'absolute',
          zIndex: 1,
          left: 10,
        }}
        dotStyle={{width: 20}}
        activeDotIndex={currentIndex}
        dotsLength={itemUser.images.length}
      />
      <Carousel
        onBeforeSnapToItem={(index: number) => setCurrentIndex(index)}
        ref={carouselRef}
        scrollEnabled={false}
        data={itemUser?.images}
        renderItem={_renderItem}
        layout="tinder"
        sliderWidth={width}
        itemWidth={width * 0.95}
      />
      <ListFooterComponent
        itemUser={itemUser}
        carouselContainerRef={carouselContainerRef}
      />
    </TinderCard>
  );
};

const styles = StyleSheet.create({
  zone: {
    height: '100%',
    width: '50%',
  },
  footer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 120,
    left: 30,
  },
  nameFooter: {
    fontSize: 24,
    color: colors.text.white,
    fontWeight: 'bold',
  },
  ageFooter: {
    fontSize: 24,
    color: colors.text.white,
  },
  hobbiesTag: {
    backgroundColor: colors.inactive,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginEnd: 10,
    borderRadius: 100,
  },
});

export default Card;
