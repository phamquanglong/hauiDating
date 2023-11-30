import {faHeart, faXmark} from '@fortawesome/free-solid-svg-icons';
import React, {RefObject} from 'react';
import {colors} from '~utils/colors';
import {IconButton} from './IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, View} from 'react-native';
import {width} from '~utils/commons';
import {IUser} from '~apis/User';
import {Spacer} from './Spacer';
import UserActionsApi from '~apis/user-actions.api';
import {SwipeAction} from './card/Card';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

interface DetailFooterProps {
  itemUser: IUser;
  carouselContainerRef: RefObject<Carousel<any>>;
}

const DetailFooter = ({itemUser, carouselContainerRef}: DetailFooterProps) => {
  const {goBack} = useNavigation();
  const onDislike = () => {
    UserActionsApi.createAction({
      targetUserId: itemUser.id,
      action: SwipeAction.DISLIKE,
    }).then(() => {
      carouselContainerRef.current?.snapToNext();
      goBack();
    });
  };

  const onLike = () => {
    UserActionsApi.createAction({
      targetUserId: itemUser.id,
      action: SwipeAction.LIKE,
    }).then(() => {
      carouselContainerRef.current?.snapToNext();
      goBack();
    });
  };
  return (
    <View style={styles.footerButton}>
      <IconButton onPress={onDislike} style={styles.button}>
        <FontAwesomeIcon icon={faXmark} color={colors.error} size={25} />
      </IconButton>
      <Spacer horizontal value={20} />
      <IconButton onPress={onLike} style={styles.button}>
        <FontAwesomeIcon icon={faHeart} color={colors.success} size={25} />
      </IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: width,
    position: 'absolute',
    borderRadius: 20,
    bottom: 0,
    zIndex: 1,
    marginBottom: 20,
    padding: 20,
  },
  button: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 100,
    shadowColor: colors.bg_opacity,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
});
export default DetailFooter;
