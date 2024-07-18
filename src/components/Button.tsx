import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

import {COLORS, DIMENSIONS, SIZES} from '../utils/constants';
import {Color} from '../utils/types';
import {base} from '../assets/styles';
import Typography from './Typography';

type Props = {
  testId?: string;
  children: React.ReactNode | any;
  onPress: any;
  textColor?: Color;
  disabled?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

function Button({
  testId,
  children,
  onPress,
  textColor = 'white',
  disabled = false,
  size = SIZES.xl + 4,
  style,
  textStyle,
}: Props): JSX.Element {
  const {align_center, justify_center, bg_primary} = base;

  // const opacity = disabled? .6: 1;

  return (
    <TouchableOpacity
      style={
        disabled
          ? [
              styles.buttonContainer,
              align_center,
              justify_center,
              style,
              {opacity: 0.4},
              bg_primary,
            ]
          : [
              styles.buttonContainer,
              align_center,
              justify_center,
              bg_primary,
              style,
            ]
      }
      onPress={onPress}
      disabled={disabled}>
      <Typography
        size={size}
        textColor={textColor}
        weight="SBLD"
        style={[textStyle]}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    borderRadius: SIZES.m + 6,
    padding: DIMENSIONS.wp(3),
  },
});

export default Button;
