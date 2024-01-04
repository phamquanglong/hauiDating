import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RadioButtonProps, RadioGroup} from 'react-native-radio-buttons-group';
import {TitleCustom} from './TitleCustom';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors} from '~utils/colors';
import {Spacer} from './Spacer';
import {width} from '~utils/commons';

const ReportModal = () => {
  const {t} = useTranslation();
  const [selectedId, setSelectedId] = useState('1');
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: t('report.harassment'),
        color: colors.primary,
      },
      {
        id: '2',
        label: t('report.inappropriate_content'),
        color: colors.primary,
      },
      {
        id: '3',
        label: t('report.fake_profile'),
        color: colors.primary,
      },
      {
        id: '4',
        label: t('report.scamming'),
        color: colors.primary,
      },
      {
        id: '5',
        label: t('report.threatening_behavior'),
        color: colors.primary,
      },
      {
        id: '6',
        label: t('report.unwanted_communication'),
        color: colors.primary,
      },
      {
        id: '7',
        label: t('report.other'),
        color: colors.primary,
      },
    ],
    [],
  );
  return (
    <View style={styles.container}>
      <TitleCustom title={t('report.title')} textStyle={styles.title} />
      <RadioGroup
        radioButtons={radioButtons}
        onPress={setSelectedId}
        selectedId={selectedId}
        containerStyle={{alignItems: 'flex-start'}}
      />
      <Spacer value={10} />
      {selectedId === '7' && (
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            style={{
              height: '100%',
            }}
            placeholder={t('Abc')}
            maxLength={200}
            onChangeText={() => {}}
          />
        </View>
      )}
      <Spacer value={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
  },
  title: {
    marginBottom: 10,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.inactive,
    height: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    width: '100%',
  },
});

export default ReportModal;
