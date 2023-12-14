import {faChevronLeft, faFlagUsa} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton} from '~components/IconButton';
import {TitleCustom} from '~components/TitleCustom';
import {colors} from '~utils/colors';
import {ROUTE_NAMES} from '~utils/constants';

interface HeaderConversationProps {
  targetUser: any;
  isNavFromNoti?: boolean;
}

const HeaderConversation = ({
  targetUser,
  isNavFromNoti,
}: HeaderConversationProps) => {
  const {goBack, navigate} = useNavigation();

  const onPress = () => {
    navigate(ROUTE_NAMES.USERDETAIL as never, {
      id: targetUser.partnerId,
      action: 'abc',
    });
  };

  const onCall = () => {
    navigate(ROUTE_NAMES.VIDEOCALLSCREEN as never);
  };

  const onGoBack = () => {
    goBack();
    if (isNavFromNoti) {
      navigate(ROUTE_NAMES.MESSAGE as never);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <IconButton onPress={onGoBack} style={{padding: 10}}>
          <FontAwesomeIcon icon={faChevronLeft} size={25} />
        </IconButton>
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <Image source={{uri: targetUser?.avatar}} style={styles.avatar} />
          <TitleCustom title={targetUser?.fullName} textStyle={styles.name} />
        </TouchableOpacity>
      </View>
      <IconButton onPress={onCall} style={{padding: 10}}>
        <FontAwesomeIcon
          icon={faFlagUsa}
          size={25}
          color={colors.black_opacity}
        />
      </IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    marginHorizontal: 10,
    backgroundColor: colors.inactive,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatarContainer: {flexDirection: 'row', alignItems: 'center'},
});

export default HeaderConversation;
