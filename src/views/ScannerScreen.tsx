import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useTranslation} from 'react-i18next';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import ButtonPrimary from '~components/ButtonPrimary';
import {Spacer} from '~components/Spacer';
import StackHeader from '~components/StackHeader';
import {colors} from '~utils/colors';
import {width} from '~utils/commons';
import {ROUTE_NAMES} from '~utils/constants';
import {useUserInfo} from '~zustands/useUserInfo';

export default function ScannerScreen() {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const {userInfo} = useUserInfo();
  const [showQrcode, setShowQrcode] = React.useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      navigate(ROUTE_NAMES.USERDETAIL, {
        id: codes[0].value,
      });
      console.log({codes});
    },
  });

  React.useEffect(() => {
    if (hasPermission) {
      return;
    }
    requestPermission();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <StackHeader title={t('qrcode')} />
      <View style={styles.container}>
        <View style={styles.qrScanner}>
          {showQrcode ? (
            <QRCode
              value={userInfo?.id.toString()}
              size={(width * 2) / 3}
              logoBackgroundColor="transparent"
            />
          ) : device == null ? (
            <View
              style={{backgroundColor: 'green', width: 200, aspectRatio: 1 / 1}}
            />
          ) : (
            <Camera
              device={device}
              isActive
              codeScanner={codeScanner}
              style={{width: (width * 2) / 3, aspectRatio: 1 / 1}}
            />
          )}
        </View>
        <Spacer value={20} />
        <Text style={styles.title}>{t('letScanQrcode')}</Text>
      </View>
      <ButtonPrimary
        text={t(showQrcode ? 'scanQrcode' : 'myQrcode')}
        onPress={() => setShowQrcode(prv => !prv)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    width: width,
  },
  qrScanner: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    width: width * 0.8,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
