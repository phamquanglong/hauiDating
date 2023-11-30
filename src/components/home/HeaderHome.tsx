import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from '../IconButton';
import {faArrowLeft, faBars} from '@fortawesome/free-solid-svg-icons';
import {colors} from '~utils/colors';
import useHomeStore from '~zustands/useHomeStore';

export const HeaderHome = ({navigation}: any) => {
  const isPlant = useHomeStore(state => state.isPlant);
  const isSuccess = useHomeStore(state => state.isSuccess);
  const setIsSuccess = useHomeStore(state => state.setIsSuccess);
  const onPress = () => {
    if (isSuccess !== null) {
      setIsSuccess(null);
      return;
    }
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      {isPlant ? (
        <View style={{width: '8%'}} />
      ) : (
        <IconButton onPress={onPress}>
          <FontAwesomeIcon
            icon={isSuccess !== null ? faArrowLeft : faBars}
            size={30}
            color={colors.bg_yellow}
          />
        </IconButton>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
