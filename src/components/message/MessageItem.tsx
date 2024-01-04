import React, {useEffect} from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {TitleCustom} from '~components/TitleCustom';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {width} from '~utils/commons';
import {colors} from '~utils/colors';
import {Spacer} from '~components/Spacer';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {ROUTE_NAMES} from '~utils/constants';
import {find} from 'lodash';
import {useSocketStore} from '~zustands/useSocketStore';
import {useConversationStore} from '~zustands/useConversationStore';
import {useTranslation} from 'react-i18next';

interface MessageItemProps {
  targetUser: any;
}

const MessageItem = ({targetUser}: MessageItemProps) => {
  const {navigate} = useNavigation<any>();
  const {t} = useTranslation();

  const {listUserOnline} = useSocketStore();
  const {getLatestMessage, setLatestMessage} = useConversationStore();

  useEffect(() => {
    setLatestMessage({id: targetUser.id, message: targetUser.latestMessage});
  }, []);

  const onPress = () => {
    navigate(ROUTE_NAMES.CONVERSATION as never, {
      targetUser: targetUser,
    });
  };

  return (
    <RNBounceable style={styles.container} onPress={onPress}>
      <ImageBackground
        imageStyle={{borderRadius: 100}}
        source={{uri: targetUser?.avatar}}
        style={styles.avatar}>
        {find(listUserOnline, {
          userId: targetUser?.partnerId,
        }) && <View style={styles.dot} />}
      </ImageBackground>
      <View>
        <TitleCustom title={targetUser?.fullName} textStyle={styles.title} />
        <Spacer value={5} />
        {getLatestMessage(targetUser.id, t)?.message && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TitleCustom
              title={getLatestMessage(targetUser.id, t).message}
              textStyle={styles.text}
            />
            <View style={styles.dotSpace} />
            <TitleCustom
              title={moment(targetUser?.sentAt).format('LT')}
              textStyle={{color: colors.black_opacity}}
            />
          </View>
        )}
      </View>
    </RNBounceable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    aspectRatio: 1 / 1,
    borderRadius: 100,
    width: width * 0.16,
    marginEnd: 10,
    backgroundColor: colors.inactive,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  text: {
    color: colors.black_opacity,
  },
  dot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 100,
    width: 20,
    aspectRatio: 1 / 1,
  },
  dotSpace: {
    backgroundColor: colors.black_opacity,
    height: 5,
    width: 5,
    borderRadius: 100,
    marginHorizontal: 8,
  },
});

export default MessageItem;
