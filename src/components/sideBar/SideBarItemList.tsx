import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {siderBarItems} from '~utils/constants';
import {colors} from '~utils/colors';
import {useTranslation} from 'react-i18next';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Switch} from 'react-native-switch';
import {useLanguageSettingController} from '~hooks/settings/useLanguageSettingController';
import {TitleCustom} from '~components/TitleCustom';

export const SideBarItemList = (props: DrawerContentComponentProps) => {
  const {navigation, state} = props;
  const {t} = useTranslation();
  const {getCurrentLanguage, changeLanguage, isVN} =
    useLanguageSettingController();

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
      <View style={styles.language}>
        <TitleCustom
          title={getCurrentLanguage()}
          textStyle={{fontSize: 16, color: colors.black_opacity}}
        />
        <Switch
          value={isVN}
          onValueChange={changeLanguage}
          disabled={false}
          activeText={t('VN')}
          inActiveText={t('EN')}
          circleSize={30}
          barHeight={30}
          renderActiveText={false}
          renderInActiveText={false}
          renderInsideCircle={() => (
            <Text
              style={[
                styles.text_inside_circle,
                {
                  color: isVN ? colors.primary : colors.success,
                },
              ]}>
              {isVN ? 'VN' : 'EN'}
            </Text>
          )}
          circleBorderWidth={3}
          circleBorderActiveColor={colors.primary}
          circleBorderInactiveColor={colors.success}
          backgroundActive={colors.primary}
          backgroundInactive={colors.success}
          circleActiveColor={colors.white}
          circleInActiveColor={colors.white}
          changeValueImmediately={true}
          innerCircleStyle={{alignItems: 'center', justifyContent: 'center'}}
          switchLeftPx={2}
          switchRightPx={2}
          switchWidthMultiplier={2}
          switchBorderRadius={30}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  item: {width: '100%', padding: 10, paddingStart: 30},
  textItem: {fontWeight: '400', fontSize: 16},
  language: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 20,
  },
  text_inside_circle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
