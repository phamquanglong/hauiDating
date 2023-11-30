import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {IImage, IUser} from '~apis/User';
import {TitleCustom} from '~components/TitleCustom';
import {colors} from '~utils/colors';
import {width} from '~utils/commons';
import Gradient from 'react-native-linear-gradient';
import LocationTag from '~components/LocationTag';
import {Spacer} from '~components/Spacer';
import {SwipeAction} from '~components/card/Card';
import UserActionsApi from '~apis/user-actions.api';
import {ActionTypes} from '~views/history-tabs/LikedTab';
import {useHistoryStore} from '~zustands/useHistoryStore';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';

const Footer = ({targetUser, action}: {targetUser: IUser; action: string}) => {
  const isLike = action === SwipeAction.LIKE;
  const {setLikedList, setDislikedList} = useHistoryStore();
  const {navigate} = useNavigation<any>();
  const onPress = () => {
    UserActionsApi.createAction({
      targetUserId: targetUser.id,
      action: isLike ? SwipeAction.DISLIKE : SwipeAction.LIKE,
    }).then(() => {
      UserActionsApi.getHistory(ActionTypes.DISLIKED).then(res => {
        setDislikedList(res.data);
      });
      UserActionsApi.getHistory(ActionTypes.LIKED).then(res => {
        setLikedList(res.data);
      });
    });
  };

  const onNavigateDetail = () => {
    navigate(ROUTE_NAMES.USERDETAIL as never, {
      itemUser: targetUser,
      action: action,
    });
  };

  return (
    <Gradient
      style={{
        height: 100,
        width: width * 0.45,
        position: 'absolute',
        borderRadius: 10,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'flex-end',
      }}
      colors={['rgba(0, 0, 0, 0)', colors.black]}
      start={{x: 1, y: 0}}
      end={{x: 1, y: 1}}
      locations={[0.01, 0.7]}>
      <View
        style={{
          flex: 1,
          padding: 10,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View onTouchEnd={onNavigateDetail}>
          <TitleCustom
            title={targetUser.profile.fullName}
            textStyle={styles.name}
          />
          <Spacer value={5} />
          <LocationTag itemUser={targetUser} />
        </View>
        {/* <IconButton
          onPress={onPress}
          style={[
            styles.button,
            {
              backgroundColor: isLike ? colors.inactive : colors.primary,
            },
          ]}>
          <FontAwesomeIcon
            icon={isLike ? faHeartBroken : faHeart}
            color={isLike ? colors.black : colors.white}
          />
        </IconButton> */}
      </View>
    </Gradient>
  );
};

const CardHistory = ({
  targetUser,
  action,
}: {
  targetUser: IUser;
  action: string;
}) => {
  const colorBadge =
    action === SwipeAction.LIKE ? colors.success : colors.error;
  const _renderImage = ({item}: {item: IImage}) => {
    return (
      <ImageBackground
        source={{uri: item.imageUrl}}
        style={{
          width: width * 0.45,
          aspectRatio: 2 / 3,
          backgroundColor: colors.inactive,
        }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: colorBadge,
            padding: 10,
            minWidth: 80,
            borderRadius: 5,
            alignSelf: 'flex-end',
            margin: 10,
            alignItems: 'center',
            opacity: 0.6,
          }}>
          <TitleCustom
            title={action}
            textStyle={{color: colorBadge, fontWeight: 'bold', fontSize: 16}}
          />
        </View>
      </ImageBackground>
    );
  };
  return (
    <View style={styles.historyCard}>
      <Carousel
        data={targetUser.images}
        renderItem={_renderImage}
        layout="tinder"
        sliderWidth={width * 0.45}
        itemWidth={width * 0.45}
      />
      <Footer targetUser={targetUser} action={action} />
    </View>
  );
};

const styles = StyleSheet.create({
  historyCard: {
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  name: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    padding: 7,
    marginBottom: 5,
    borderRadius: 100,
  },
});

export default CardHistory;
