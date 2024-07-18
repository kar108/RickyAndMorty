import React from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

import {COLORS, SIZES, FONTS} from '../utils/constants';
import {Color, Font} from '../utils/types';
import {base} from '../assets/styles';

type Props = {
  children: React.ReactNode | any;
  textColor?: Color;
  size?: number;
  weight?: Font;
  style?: StyleProp<TextStyle>;
  lines?: number;
  align?: 'left' | 'center' | 'right';
  mb?: number;
  make500?: boolean;
  testID?: string;
  textShadowColor?: Color | any;
  textShadowOffset?: { width: number; height: number } | any
};

function Typography({
  children,
  textColor = 'white',
  size = SIZES.xl,
  weight = 'REG',
  style,
  lines,
  align = 'left',
  mb = 0,
  make500 = false,
  textShadowColor ,
  textShadowOffset ,
  testID,
}: Props): JSX.Element {

  const fontStyle = getStyles(textColor, size, weight, align, mb, textShadowColor, textShadowOffset);
  const {d_flex, row} = base;

  return (
    <Text style={[fontStyle, style]} numberOfLines={lines} testID={testID}>
      {children}
    </Text>
  );
}

function getStyles(
  color: Color,
  size: number,
  font: Font,
  align: 'left' | 'center' | 'right',
  mb: number,
  textShadowColor: Color,
  textShadowOffset: { width: number; height: number }
): TextStyle {
  return StyleSheet.create({
    textStyle: {
      color: COLORS[color],
      fontSize: size,
      fontFamily: FONTS[font],
      textAlign: align,
      marginBottom: mb,
      textShadowColor: COLORS[textShadowColor],
      textShadowOffset: textShadowOffset,
      textShadowRadius: 5,
    },
  }).textStyle;
}

export default Typography;
