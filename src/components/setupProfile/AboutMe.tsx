import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {TitleCustom} from '~components/TitleCustom';
import {colors} from '~utils/colors';
import {useEditInfoStore} from '~zustands/useEditInfoStore';
import {useSetupProfile} from '~zustands/useSetupProfile';

interface AboutMeProps {
  bio?: string;
}

const AboutMe = ({bio}: AboutMeProps) => {
  const {t} = useTranslation();
  const {setSetupProfile, setupProfile} = useSetupProfile();
  const {editInfo, setEditInfo} = useEditInfoStore();
  const [length, setLength] = useState(0);

  const onChangeText = (e: string) => {
    if (!!bio && editInfo?.profile) {
      setEditInfo({
        ...editInfo,
        profile: {
          ...editInfo?.profile,
          bio: e,
        },
      });
    }
    setSetupProfile({
      ...setupProfile,
      bio: e,
    });
    setLength(e.length);
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <TitleCustom title={t('setupProfile.aboutMe')} require />
        <Text style={styles.length}>{length}/200</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={bio ?? setupProfile?.bio}
          multiline
          style={{height: '100%'}}
          maxLength={200}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.inactive,
    height: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  length: {
    color: colors.black_opacity,
  },
});

export default AboutMe;
