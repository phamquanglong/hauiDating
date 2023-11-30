import React from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {colors} from '~utils/colors';

interface ButtonPrimaryProps {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconDefinition;
  iconRight?: IconDefinition;
  disabled?: boolean;
}

const ButtonPrimary = (props: ButtonPrimaryProps) => {
  const {onPress, text, style, textStyle, icon, disabled, iconRight} = props;
  return (
    <RNBounceable
      disabled={disabled}
      onPress={onPress}
      style={[
        style,
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        icon || iconRight
          ? undefined
          : {
              justifyContent: 'center',
            },
      ]}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          size={20}
          color="#fff"
          style={{marginEnd: 10}}
        />
      )}
      <Text style={textStyle}>{text}</Text>
      {iconRight && (
        <FontAwesomeIcon icon={iconRight} size={15} color={colors.black} />
      )}
    </RNBounceable>
  );
};

export default ButtonPrimary;
