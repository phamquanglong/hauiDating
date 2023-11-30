import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {IconButton} from './IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {faArrowLeft, faBars} from '@fortawesome/free-solid-svg-icons';
import {colors} from '~utils/colors';

interface HeaderCustomProps {
  canGoBack: boolean;
  title?: string;
  iconRight?: IconDefinition;
  onPressIconRight?: () => void;
  marginTop?: number;
}

export const HeaderCustom = (props: HeaderCustomProps) => {
  const {canGoBack, iconRight, onPressIconRight, title, marginTop} = props;
  const navigation = useNavigation<any>();

  const onMenu = () => {
    navigation.openDrawer();
  };

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
    } else {
      return (
        <IconButton onPress={onMenu} style={{flex: 0.1}}>
          <FontAwesomeIcon icon={faBars} size={30} color={colors.white} />
        </IconButton>
      );
    }
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
    } else {
      return <View style={styles.emptyItems} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: marginTop ?? undefined,
        },
      ]}>
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
    backgroundColor: colors.primary,
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
