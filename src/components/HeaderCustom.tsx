import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {IconButton} from './IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {colors} from '~utils/colors';

interface HeaderCustomProps {
  canGoBack: boolean;
  title?: string;
  iconRight?: IconDefinition;
  onPressIconRight?: () => void;
}

export const HeaderCustom = (props: HeaderCustomProps) => {
  const {canGoBack, iconRight, onPressIconRight, title} = props;
  const navigation = useNavigation();

  const renderGoBack = () => {
    if (canGoBack) {
      return (
        <IconButton onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            color={colors.text.white}
          />
        </IconButton>
      );
    } else return <View style={styles.emptyItems} />;
  };

  const renderIconRight = () => {
    if (iconRight && onPressIconRight) {
      return (
        <IconButton onPress={onPressIconRight}>
          <FontAwesomeIcon
            icon={iconRight}
            size={25}
            color={colors.text.white}
          />
        </IconButton>
      );
    } else return <View style={styles.emptyItems} />;
  };

  return (
    <View style={styles.container}>
      {renderGoBack()}
      <Text style={styles.title}>{title}</Text>
      {renderIconRight()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.bg_opacity,
  },
  emptyItems: {
    width: '8%',
    height: '100%',
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.text.white,
  },
});
