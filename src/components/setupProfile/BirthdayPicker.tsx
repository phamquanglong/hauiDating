import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import ButtonPrimary from '~components/ButtonPrimary';
import {TitleCustom} from '~components/TitleCustom';
import {colors} from '~utils/colors';
import {useEditInfoStore} from '~zustands/useEditInfoStore';
import {useSetupProfile} from '~zustands/useSetupProfile';

interface BirthdayPickerProps {
  date?: string;
}

const BirthdayPicker = ({date}: BirthdayPickerProps) => {
  const {t} = useTranslation();
  const {setSetupProfile, setupProfile} = useSetupProfile();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  return (
    <View style={{marginTop: 20}}>
      <TitleCustom title={t('setupProfile.birthday')} require />
      <ButtonPrimary
        text={date ?? (setupProfile?.birthday as string)}
        onPress={onOpen}
        style={styles.button}
        iconRight={faCalendarAlt}
      />
      <DatePicker
        mode="date"
        modal
        maximumDate={new Date()}
        open={open}
        date={moment(date ?? setupProfile?.birthday, 'DD-MM-YYYY').toDate()}
        onConfirm={date => {
          setOpen(false);
          if (date) {
            editInfo?.profile &&
              setEditInfo({
                ...editInfo,
                profile: {
                  ...editInfo?.profile,
                  birthday: moment(date).format('DD/MM/YYYY'),
                },
              });
            return;
          }
          setSetupProfile({
            ...setupProfile,
            birthday: moment(date).format('DD/MM/YYYY'),
          });
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: colors.inactive,
    padding: 10,
    borderRadius: 100,
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default BirthdayPicker;
