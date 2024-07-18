import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
  StyleProp,
  ViewStyle,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextStyle,
  ImageStyle,
} from 'react-native';

import { base } from '../assets/styles';
import { COLORS, DIMENSIONS, FONTS, SIZES } from '../utils/constants';
import Icon from './Icon';
import Typography from './Typography';
import { isOs } from '../utils/helpers';

type Props = {
  disabledIcon?: boolean;
  iconTextPlaceHolder?: string;
  label?: string;
  value: string;
  onKeyPress?: any;
  onChange: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  onBlur?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  disabled?: boolean;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errorText?: any;
  touched?: any;
  maxLength?: number;
  multiline?: boolean;
  minimumHeight?: number;
  passwordIcon?: boolean;
  tooltipInfo?: string;

  icon?: {
    name: string;
    action: () => void;
  };
  iconTextStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  IconContainerStyle?: StyleProp<ViewStyle>;
  iconText?: string;
  testId?: string;
  editable?: boolean;
  autofocus?: boolean;
  cursorColor?: string;
  selectionColor?: string;
};

function Input({
  iconTextPlaceHolder,
  iconTextStyle,
  onKeyPress,
  disabledIcon = false,
  iconText = '',
  label = '',
  value,
  onChange,
  placeholderTextColor = '',
  placeholder = '',
  onBlur = () => { },
  onFocus = () => { },
  disabled = false,
  autoCorrect = false,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  errorText = '',
  touched = false,
  maxLength = 50,
  multiline = false,
  minimumHeight,
  passwordIcon = false,
  tooltipInfo = '',
  icon = { name: '', action: () => { } },
  style,
  wrapperStyle,
  inputStyle,
  iconStyle,
  IconContainerStyle,
  testId,
  editable,
  selectionColor = 'lightblue',
  cursorColor = 'black',
  autofocus = false,
}: Props): JSX.Element {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const isErrorVisible = errorText && touched;


  // console.log(isErrorVisible,errorText,touched,"visible")

  const containerStyles = {
    borderColor: ''
  };

  const togglePasswordVisibility = (): void =>
    setIsPasswordVisible(prev => !prev);

  const renderLabel = (): React.ReactNode => {
    if (!label) return;
    return (
      <Typography
        align="left"
        textColor="text"
        style={[base.mb_xxs]}
        size={SIZES.unit * 13}>
        {label}
      </Typography>
    );
  };

  const renderIcon = (): React.ReactNode => {
    if (icon.name === 'searchbar') {
      return (
        <TouchableOpacity onPress={icon.action} style={styles.searchBox}>
          <Icon name={icon.name} width={2.5} height={2.5} style={iconStyle} />
        </TouchableOpacity>
      );
    }
    if (icon.name) {
      return (
        <TouchableOpacity
          onPress={icon.action}
          style={[styles.actionBox, IconContainerStyle]}>
          {iconText ? (
            <Typography
              size={SIZES.font}
              style={[iconTextStyle]}
              textColor="white"
              weight="MED">
              {iconText}
            </Typography>
          ) : null}
          {disabledIcon ? null : (
            <Icon
              name={icon.name}
              width={2}
              height={2}
              style={[iconStyle, base.ml_l]}
            />
          )}
        </TouchableOpacity>
      );
    } else if (passwordIcon) {
      return (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.actionBox}>
          <Icon
            name={isPasswordVisible ? 'eyeOpen' : 'eyeClosed'}
            width={2.5}
            height={2.5}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderError = (): React.ReactNode => {
    return (
      <View style={[base.row, base.d_flex, base.w_90,base.align_center,base.m_xxs]}>
        <Typography weight="REG" textColor="text" size={SIZES.unit * 12}>
          {errorText}
        </Typography>
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderLabel()}
      <View
        style={[
          styles.wrapper,
          containerStyles,
          disabled ? base.bg_gray : base.bg_input,
          wrapperStyle,
        ]}>
        {renderIcon()}
        <TextInput
          returnKeyType='done'
          autoFocus={autofocus}
          selectionColor="lightblue"
          cursorColor="black"
          testID={testId}
          value={value}
          onChangeText={onChange}
          // onKeyPress={onKeyPress}
          onSubmitEditing={onKeyPress}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onFocus={onFocus}
          onBlur={onBlur}
          editable={editable}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          multiline={multiline}
          style={[
            styles.input,
            multiline ? styles.topAlign : {},
            inputStyle,
            minimumHeight ? { minHeight: minimumHeight } : {},
          ]}
        />
      </View>
      {renderError()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: DIMENSIONS.hp(0.0),
  },
  wrapper: {
    width: '100%',
    position: 'relative',
    marginBottom: DIMENSIONS.hp(0.2),
    borderColor: COLORS.white20,
    borderRadius: SIZES.xl,
    flexDirection: 'row',
    // backgroundColor:COLORS.input,
  },
  input: {
    padding: isOs('ios') ? DIMENSIONS.wp(4) : DIMENSIONS.wp(3),
    fontFamily: FONTS.MED,
    fontSize: SIZES.font,
    width: '100%',
    color:COLORS.secondary,
  },
  actionBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DIMENSIONS.wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  searchBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: '4%',
  },
  passwordIcon: {
    tintColor: COLORS.secondary,
  },
  topAlign: {
    textAlignVertical: 'top',
  },
});

export default Input;
