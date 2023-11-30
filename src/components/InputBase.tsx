import React, {useState} from 'react';
import {Text, TextInputProps, View} from 'react-native';
import {TextInput} from 'react-native';
import {colors} from '~utils/colors';
import {IconButton} from './IconButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

interface InputBaseProps extends TextInputProps {
  title: string;
  require?: boolean;
  invalid?: boolean;
  invalidText?: string;
  showPassword?: boolean;
}

const Eye = ({status, setStatus}: {status: boolean; setStatus: any}) => {
  return (
    <IconButton
      onPress={() => setStatus((prv: any) => !prv)}
      style={{position: 'absolute', right: 0}}>
      <FontAwesomeIcon
        icon={status ? faEyeSlash : faEye}
        color={colors.black_opacity}
      />
    </IconButton>
  );
};

const InputBase = (props: InputBaseProps) => {
  const [focused, setFocused] = useState(false);
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Text>{props.title}</Text>
        {props.require && <Text style={{color: colors.error}}> *</Text>}
      </View>
      <View style={{justifyContent: 'center'}}>
        <TextInput
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          {...props}
          secureTextEntry={props.showPassword ? !isShow : undefined}
          style={{
            fontSize: 16,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: focused ? colors.primary : colors.inactive,
            color: colors.primary,
          }}
        />
        {props.showPassword && <Eye status={isShow} setStatus={setIsShow} />}
      </View>
      {props.invalid && (
        <Text style={{color: colors.error, marginTop: 5}}>
          {props.invalidText}
        </Text>
      )}
    </>
  );
};

export default InputBase;
