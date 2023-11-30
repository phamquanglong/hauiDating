import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, StyleSheet, Text, View} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import {useAnimated} from '~hooks/useAnimated';
import {useGetHobbies} from '~hooks/useGetHobbies';
import {colors} from '~utils/colors';
import {useSetupProfile} from '~zustands/useSetupProfile';

const Hobbies = () => {
  const {t} = useTranslation();
  const {transformValue} = useAnimated();
  const {setupProfile, setSetupProfile} = useSetupProfile();
  const multiSelectRef = useRef<MultiSelect>(null);
  const [selectedItems, setSelectedItems] = useState<ReactNode>(null);
  const {hobbies} = useGetHobbies();

  const onSelectedItemsChange = (value: any) => {
    setSetupProfile({
      ...setupProfile,
      hobbies: value,
    });
  };

  useEffect(() => {
    setSelectedItems(
      multiSelectRef.current?.getSelectedItemsExt(setupProfile?.hobbies ?? []),
    );
  }, [multiSelectRef, setupProfile]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: transformValue}],
        },
      ]}>
      <Text>{t('setupProfile.hobbies')}</Text>
      <MultiSelect
        hideTags
        items={hobbies}
        uniqueKey="id"
        ref={multiSelectRef}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={setupProfile?.hobbies}
        selectText={t('setupProfile.pickItems')}
        searchInputPlaceholderText={t('setupProfile.searchPlaceholder')}
        onChangeInput={text => console.log(text)}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor={colors.inactive}
        tagBorderColor={colors.primary}
        tagTextColor={colors.primary}
        selectedItemTextColor={colors.primary}
        selectedItemIconColor={colors.primary}
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{color: colors.black, marginStart: 10}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
        styleInputGroup={{paddingVertical: 10}}
        styleItemsContainer={{
          backgroundColor: colors.white,
          borderWidth: 1,
          borderRadius: 20,
          borderStyle: 'dashed',
          paddingVertical: 10,
          maxHeight: 300,
        }}
        selectedText={t('setupProfile.selected')}
      />
      <View>{selectedItems}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    maxHeight: '100%',
  },
});

export default Hobbies;
