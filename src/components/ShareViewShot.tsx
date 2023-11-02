import ViewShot from 'react-native-view-shot';
import {Share, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShareAlt} from '@fortawesome/free-solid-svg-icons';
import {colors} from '~utils/colors';
import {IconButton} from '~components/IconButton';
import {height} from '~utils/commons';
import CircleSliderComponent from '~components/CircleSlider';
import {useGetTitleHome} from '~hooks/useGetTitleHome';
import QRCode from 'react-native-qrcode-svg';

export const ShareViewShot = () => {
  const ref = useRef<ViewShot>(null);
  const {title} = useGetTitleHome();

  const share = () => {
    if (ref.current && ref.current.capture) {
      ref.current.capture().then(uri => {
        Share.share({
          title: 'share with your friends',
          url: uri,
        });
      });
    }
  };

  return (
    <View>
      <IconButton
        onPress={share}
        style={{
          borderRadius: 100,
          borderWidth: 1,
          borderColor: colors.bg_opacity,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesomeIcon
          icon={faShareAlt}
          size={30}
          color={colors.bg_opacity}
        />
      </IconButton>
      <ViewShot
        style={{
          marginTop: height,
          position: 'absolute',
          backgroundColor: colors.white,
        }}
        ref={ref}
        options={{
          fileName: 'Share_image',
          format: 'png',
          quality: 0.9,
        }}>
        <CircleSliderComponent />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            margin: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{flex: 0.7}}>{title}</Text>
          <QRCode value="http://awesome.link.qr" size={50} />
        </View>
      </ViewShot>
    </View>
  );
};
