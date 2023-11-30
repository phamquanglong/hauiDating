import {
  faCamera,
  faImages,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput, View} from 'react-native';
import {IconButton} from '~components/IconButton';
import {useAppSelector} from '~hooks/useAppSelector';
import {colors} from '~utils/colors';

interface MessageFooterProps {
  targetUser: any;
}

const MessageFooter = ({targetUser}: MessageFooterProps) => {
  const {t} = useTranslation();
  const socket = useAppSelector(state => state.socketReducer.socket);
  const [input, setInput] = useState('');

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
  };

  const handeUpdateIsSeenMessage = () => {
    if (!isEmpty(socket)) {
      socket.seenMessage(targetUser.conv?.id);
    }
  };

  const onChangeText = (value: string) => {
    setInput(value);
  };

  const onTakePhoto = () => {};
  return (
    <View style={styles.container}>
      <IconButton onPress={onTakePhoto} style={styles.button}>
        <FontAwesomeIcon
          icon={faCamera}
          size={25}
          color={colors.black_opacity}
        />
      </IconButton>
      <IconButton onPress={onTakePhoto} style={styles.button}>
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
      />
      <IconButton onPress={handleSendMessage} style={{padding: 10}}>
        <FontAwesomeIcon icon={faPaperPlane} size={20} color={colors.primary} />
      </IconButton>
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
