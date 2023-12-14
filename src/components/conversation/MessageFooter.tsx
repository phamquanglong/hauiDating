import {
  faCamera,
  faImages,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import UserApi from '~apis/user.api';
import {IconButton} from '~components/IconButton';
import ImageItem from '~components/edit-info/ImageItem';
import useImagePicker from '~hooks/useImagePicker';
import {colors} from '~utils/colors';
import {useSocketStore} from '~zustands/useSocketStore';

interface MessageFooterProps {
  targetUser: any;
}

const MessageFooter = ({targetUser}: MessageFooterProps) => {
  const {t} = useTranslation();
  const {appSocket: socket} = useSocketStore();
  const [input, setInput] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {onLaunchCamera, onLaunchLibrary} = useImagePicker(
    5,
    setIsLoading,
    setImages,
  );

  useEffect(() => {
    if (!isEmpty(socket)) {
      const handleSetTypingStatus = (i: string) => {
        if (i !== '') {
          socket.setTypingStatus(true, targetUser.conv?.id);
        } else {
          socket.setTypingStatus(false, targetUser.conv?.id);
        }
      };

      handleSetTypingStatus(input);
    }
  }, [input, socket, targetUser.conv?.id]);

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      if (!isEmpty(socket)) {
        socket.sendMessage(input, targetUser.conv?.id);
        setInput('');
      }
    }
    if (images.length > 0) {
      if (!isEmpty(socket)) {
        socket.sendMessage(images.toString(), targetUser.conv?.id);
        setImages([]);
      }
    }
    UserApi.pushNotification(targetUser.partnerId, {
      title: targetUser.fullName,
      body: images.length > 0 && input.length === 0 ? images.toString() : input,
      targetUser: JSON.stringify(targetUser),
    });
  };

  const handeUpdateIsSeenMessage = () => {
    if (!isEmpty(socket)) {
      socket.seenMessage(targetUser.conv?.id);
    }
  };

  const onChangeText = (value: string) => {
    setInput(value);
  };

  const _renderImage = ({item}: any) => (
    <ImageItem
      image={item}
      onRemove={() => setImages(prv => prv.filter(i => i !== item))}
    />
  );

  return (
    <View>
      <View style={styles.container}>
        <IconButton onPress={onLaunchCamera} style={styles.button}>
          <FontAwesomeIcon
            icon={faCamera}
            size={25}
            color={colors.black_opacity}
          />
        </IconButton>
        <IconButton onPress={onLaunchLibrary} style={styles.button}>
          <FontAwesomeIcon
            icon={faImages}
            size={25}
            color={colors.black_opacity}
          />
        </IconButton>
        <TextInput
          value={input}
          onChangeText={onChangeText}
          placeholder={t('message.placeholder')}
          style={styles.textInput}
          onFocus={handeUpdateIsSeenMessage}
        />
        <IconButton onPress={handleSendMessage} style={{padding: 10}}>
          <FontAwesomeIcon
            icon={faPaperPlane}
            size={20}
            color={colors.primary}
          />
        </IconButton>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          numColumns={3}
          data={images}
          renderItem={_renderImage}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.inactive,
    flex: 1,
    padding: 10,
    borderRadius: 100,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
});

export default MessageFooter;
