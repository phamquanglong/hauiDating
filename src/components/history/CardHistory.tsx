import React from 'react';
import {StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {IImage, IUser} from '~apis/User';
import {TitleCustom} from '~components/TitleCustom';
import {colors} from '~utils/colors';
import {width} from '~utils/commons';
import Gradient from 'react-native-linear-gradient';
import LocationTag from '~components/LocationTag';
import {Spacer} from '~components/Spacer';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';
import {Image} from 'react-native';
import RNBounceable from '@freakycoder/react-native-bounceable';

const Footer = ({targetUser, action}: {targetUser: IUser; action: string}) => {
  const {navigate} = useNavigation<any>();

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
        width: width * 0.48,
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
            title={targetUser?.profile?.fullName}
            textStyle={styles.name}
          />
          <Spacer value={5} />
          <LocationTag itemUser={targetUser} />
        </View>
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
  const {navigate} = useNavigation<any>();
  const onNavigateDetail = () => {
    navigate(ROUTE_NAMES.USERDETAIL as never, {
      itemUser: targetUser,
      action: action,
    });
  };
  const _renderImage = ({item}: {item: IImage}) => {
    return (
      <RNBounceable onPress={onNavigateDetail}>
        <Image
          source={{uri: item.imageUrl}}
          style={{
            width: width * 0.48,
            aspectRatio: 2 / 3,
            backgroundColor: colors.inactive,
          }}
        />
      </RNBounceable>
    );
  };
  return (
    <View style={styles.historyCard}>
      <Carousel
        data={targetUser.images}
        renderItem={_renderImage}
        layout="tinder"
        sliderWidth={width * 0.48}
        itemWidth={width * 0.48}
      />
      <Footer targetUser={targetUser} action={action} />
    </View>
  );
};

const styles = StyleSheet.create({
  historyCard: {
    borderRadius: 8,
    marginBottom: 5,
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
