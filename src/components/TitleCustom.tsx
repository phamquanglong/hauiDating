import React from 'react';
import {StyleSheet, Text, TextStyle, View} from 'react-native';
import {colors} from '~utils/colors';

interface TitleCustomProps {
  title: string;
  textStyle?: TextStyle;
  plantingSettings?: boolean;
  require?: boolean;
}

export const TitleCustom = (props: TitleCustomProps) => {
  const {title, textStyle, plantingSettings} = props;
  const getStyle = () => {
    if (plantingSettings) {
      return styles.plantingSettings;
    }
    return null;
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={[textStyle, getStyle()]}>{title}</Text>
      {props.require && <Text style={{color: colors.error}}> *</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  plantingSettings: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.black,
    paddingVertical: 10,
  },
});
