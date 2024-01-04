import {
  faChevronLeft,
  faFlagUsa,
  faVideoCamera,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ConversationApi from '~apis/conversation.api';
import {IconButton} from '~components/IconButton';
import ReportModal from '~components/ReportModal';
import {TitleCustom} from '~components/TitleCustom';
import useGlobalModalController from '~hooks/useGlobalModalController';
import {replace} from '~services/Navigation.service';
import {colors} from '~utils/colors';
import {ROUTE_NAMES} from '~utils/constants';
import {Position} from '~zustands/useHomeStore';
import {useSocketStore} from '~zustands/useSocketStore';

interface HeaderConversationProps {
  targetUser: any;
  isNavFromNoti?: boolean;
}

const HeaderConversation = ({
  targetUser,
  isNavFromNoti,
}: HeaderConversationProps) => {
  const {t} = useTranslation();
  const {goBack, navigate} = useNavigation();
  const {appSocket, setListConversation} = useSocketStore();

  const onPress = () => {
    navigate(ROUTE_NAMES.USERDETAIL as never, {
      id: targetUser.partnerId,
      action: 'abc',
    });
  };

  const onCall = () => {
    navigate(ROUTE_NAMES.VIDEOCALLSCREEN as never, {
      targetUser: targetUser,
    });
  };

  const onUnmatch = () => {
    Alert.alert('', t('unmatchConfirm', {user: targetUser?.fullName}), [
      {
        text: t('cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: t('ok'),
        onPress: () => {
          ConversationApi.getAllConversation().then((res: any) => {
            setListConversation(
              res.data.filter((i: any) => i.isActive === true),
            );
          });
          appSocket?.unmatch(targetUser.id, targetUser?.fullName);
        },
        style: 'destructive',
      },
    ]);
  };

  const onGoBack = () => {
    if (isNavFromNoti) {
      replace(ROUTE_NAMES.MESSAGE as never);
      return;
    }
    goBack();
  };

  const {onShowGlobalModal, onHideGlobalModal} = useGlobalModalController();
  const onReport = () => {
    onShowGlobalModal({
      visible: true,
      position: Position.center,
      children: <ReportModal />,
      yesNoOption: {
        visible: true,
        onNo: () => onHideGlobalModal(),
        onYes: () => {
          ConversationApi.getAllConversation().then((res: any) => {
            setListConversation(
              res.data.filter((i: any) => i.isActive === true),
            );
          });
          appSocket?.unmatch(targetUser.id, targetUser?.fullName);
          onHideGlobalModal();
        },
      },
    });
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
      <View style={{flexDirection: 'row'}}>
        {/* <IconButton onPress={onCall} style={{padding: 10}}>
          <FontAwesomeIcon
            icon={faVideoCamera}
            size={25}
            color={colors.black_opacity}
          />
        </IconButton> */}
        <IconButton onPress={onReport} style={{padding: 10}}>
          <FontAwesomeIcon
            icon={faFlagUsa}
            size={25}
            color={colors.black_opacity}
          />
        </IconButton>
        <IconButton onPress={onUnmatch} style={{padding: 10}}>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            size={25}
            color={colors.black_opacity}
          />
        </IconButton>
      </View>
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
