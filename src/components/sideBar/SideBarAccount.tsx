import React from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useUserInfo} from '~zustands/useUserInfo';
import {colors} from '~utils/colors';
import {Spacer} from '~components/Spacer';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';

const SideBarAccount = () => {
  const {userInfo} = useUserInfo();
  const {navigate} = useNavigation();
  const onPress = () => {
    navigate(ROUTE_NAMES.EDITINFOSCREEN as never);
  };

  return (
    <RNBounceable style={styles.container} onPress={onPress}>
      <Image
        source={{uri: userInfo?.images[0]?.imageUrl}}
        style={styles.avatar}
      />
      <Spacer horizontal value={10} />
      <View>
        <Text style={styles.userName}>{userInfo?.userName}</Text>
        <Spacer value={5} />
        <Text style={styles.email}>{userInfo?.email}</Text>
      </View>
    </RNBounceable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black_opacity,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginStart: 20,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  avatar: {width: 60, aspectRatio: 1 / 1, borderRadius: 100},
  userName: {
    color: colors.text.white,
    fontWeight: 'bold',
    fontSize: 24,
  },
  email: {
    color: colors.inactive,
  },
});

export default SideBarAccount;
