import {StyleSheet, Text, TextStyle} from 'react-native';
import {colors} from '~utils/colors';

interface TitleCustomProps {
  title: string;
  textStyle?: TextStyle;
  plantingSettings?: boolean;
}

export const TitleCustom = (props: TitleCustomProps) => {
  const {title, textStyle, plantingSettings} = props;
  const getStyle = () => {
    if (plantingSettings) {
      return styles.plantingSettings;
    }
    return null;
  };
  return <Text style={[textStyle, getStyle()]}>{title}</Text>;
};

const styles = StyleSheet.create({
  plantingSettings: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.black,
    paddingVertical: 10,
  },
});
