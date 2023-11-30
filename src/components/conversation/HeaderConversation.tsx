import {faChevronLeft, faFlagUsa} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {IconButton} from '~components/IconButton';
import {TitleCustom} from '~components/TitleCustom';
import {colors} from '~utils/colors';

interface HeaderConversationProps {
  targetUser: any;
}

const HeaderConversation = ({targetUser}: HeaderConversationProps) => {
  const {goBack} = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton onPress={goBack} style={{padding: 10}}>
          <FontAwesomeIcon icon={faChevronLeft} size={25} />
        </IconButton>
        <TouchableOpacity style={styles.container}>
          <Image source={{uri: targetUser.avatar}} style={styles.avatar} />
          <TitleCustom title={targetUser.fullName} textStyle={styles.name} />
        </TouchableOpacity>
      </View>
      <IconButton onPress={goBack} style={{padding: 10}}>
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
});

export default HeaderConversation;
