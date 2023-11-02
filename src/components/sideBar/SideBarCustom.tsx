import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '~utils/colors';
import {SideBarItemList} from '~components/sideBar/SideBarItemList';

export const SideBarCustom = () => {
  return (
    <View style={styles.container}>
      <Text>SideBarCustom</Text>
      <SideBarItemList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
