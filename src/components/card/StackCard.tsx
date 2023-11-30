import {StyleSheet, View} from 'react-native';
import React, {RefObject, useRef, useState} from 'react';
import {IUser} from '~apis/User';
import Card, {SwipeAction} from './Card';
import Carousel from 'react-native-snap-carousel';
import {width} from '~utils/commons';
import Gradient from 'react-native-linear-gradient';
import {colors} from '~utils/colors';
import {faEllipsisH, faHeart, faXmark} from '@fortawesome/free-solid-svg-icons';
import ButtonFooter from './ButtonFooter';
import UserActionsApi from '~apis/user-actions.api';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';

type StackCardProps = {
  data: IUser[];
};

const FooterStackCard = ({
  currentItem,
  carouselRef,
}: {
  currentItem: IUser;
  carouselRef: RefObject<Carousel<any>>;
}) => {
  const {navigate} = useNavigation<any>();
  const onDislike = () => {
    UserActionsApi.createAction({
      targetUserId: currentItem.id,
      action: SwipeAction.DISLIKE,
    }).then(() => carouselRef.current?.snapToNext());
  };

  const onLike = () => {
    UserActionsApi.createAction({
      targetUserId: currentItem.id,
      action: SwipeAction.LIKE,
    }).then(() => carouselRef.current?.snapToNext());
  };

  const onMore = () => {
    navigate(ROUTE_NAMES.USERDETAIL as never, {
      itemUser: currentItem,
      carouselContainerRef: carouselRef,
    });
  };

  return (
    <Gradient
      style={{
        height: 160,
        width: width,
        position: 'absolute',
        borderRadius: 20,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'flex-end',
      }}
      colors={['rgba(0, 0, 0, 0)', colors.black]}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0.1, 0.9]}>
      <View style={styles.footerButton}>
        <ButtonFooter
          icon={faXmark}
          color={colors.inactive}
          onPress={onDislike}
        />
        <ButtonFooter icon={faHeart} color={colors.primary} onPress={onLike} />
        <ButtonFooter
          icon={faEllipsisH}
          color={colors.bg_yellow}
          onPress={onMore}
        />
      </View>
    </Gradient>
  );
};

const StackCard = ({data}: StackCardProps) => {
  const carouselRef = useRef<Carousel<any>>(null);
  const [currentItem, setCurrentItem] = useState<IUser>(data[0]);

  const _renderItem = ({item}: {item: IUser; index: number}) => {
    return <Card itemUser={item} carouselContainerRef={carouselRef} />;
  };

  return (
    <View style={{position: 'relative', flex: 1}}>
      <Carousel
        onBeforeSnapToItem={index => setCurrentItem(data[index])}
        ref={carouselRef}
        scrollEnabled={false}
        layout="tinder"
        data={data}
        renderItem={_renderItem}
        itemWidth={width}
        sliderWidth={width}
      />
      <FooterStackCard currentItem={currentItem} carouselRef={carouselRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
  },
});

export default StackCard;
