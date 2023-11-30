import {ReactNativeScannerView} from '@pushpendersingh/react-native-scanner';
import React from 'react';

import {StyleSheet, View, useWindowDimensions} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

const ScannerScreen = () => {
  const {height, width} = useWindowDimensions();
  const onSuccess = e => {
    console.log(e.data);
    // e.data contains the QR code data
  };

  return (
    <View>
      {/* <QRCodeScanner onRead={onSuccess} /> */}
      <ReactNativeScannerView style={{height, width}} onQrScanned={onSuccess} />
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScannerScreen;
