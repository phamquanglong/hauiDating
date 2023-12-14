import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from './IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {TitleCustom} from './TitleCustom';
import ButtonPrimary from './ButtonPrimary';
import {colors} from '~utils/colors';
import {useNavigation} from '@react-navigation/native';

interface StackHeaderProps {
  title: string;
  textRightButton?: string;
  onPressRightButton?: () => void;
}

const StackHeader = ({
  onPressRightButton,
  title,
  textRightButton,
}: StackHeaderProps) => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.header}>
      <View
        style={{flexDirection: 'row', alignItems: 'center'}}
        onTouchEnd={goBack}>
        <IconButton style={styles.backButton} onPress={goBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </IconButton>
        <TitleCustom title={title} textStyle={styles.titleHeader} />
      </View>
      {textRightButton && (
        <ButtonPrimary
          onPress={onPressRightButton}
          text={textRightButton}
          textStyle={{color: colors.primary, fontWeight: 'bold', fontSize: 16}}
          style={{padding: 10, paddingHorizontal: 20}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 18,
    marginVertical: 10,
  },
  titleHeader: {
    fontWeight: '600',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 10,
  },
});

export default StackHeader;
