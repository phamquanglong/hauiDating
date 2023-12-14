import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {siderBarItems} from '~utils/constants';
import {colors} from '~utils/colors';
import {useTranslation} from 'react-i18next';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const SideBarItemList = (props: DrawerContentComponentProps) => {
  const {navigation, state} = props;
  const {t} = useTranslation();

  const renderItem = ({item}: any) => {
    return (
      <DrawerItem
        key={item.name}
        label={t(item.name)}
        labelStyle={styles.textItem}
        icon={({color}: any) => (
          <FontAwesomeIcon icon={item.icon} color={color} size={20} />
        )}
        focused={
          state.routes.findIndex(e => e.name === item.navigator) === state.index
        }
        activeTintColor={colors.primary}
        activeBackgroundColor={colors.bg_light_gray}
        onPress={() => navigation.navigate(item.navigator as never)}
        style={{
          marginHorizontal: 20,
          borderRadius: 10,
          paddingStart: 20,
        }}
      />
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <FlatList
        scrollEnabled={false}
        data={siderBarItems}
        renderItem={renderItem}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  item: {width: '100%', padding: 10, paddingStart: 30},
  textItem: {fontWeight: '400', fontSize: 16},
});
