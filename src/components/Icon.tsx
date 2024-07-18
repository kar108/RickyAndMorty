import React, { useState } from "react";
import { Image, ImageStyle, StyleProp, StyleSheet, ViewStyle, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { DIMENSIONS } from "../utils/constants";
import { icons } from "../utils/icons";

type Props = {
  name: string;
  style?: StyleProp<ImageStyle | ViewStyle>;
  height?: number;
  width?: number;
  testID?:string;
  // onPress?: () => void;
}

function Icon ({ name, style, height = 2, width = 2,testID }: Props): JSX.Element {


  return(

      <Image
      testID={testID}
        source={icons[name]}
        style={[getStyles(height, width), style as ImageStyle]}
      />

  );
}

const getStyles = function (y: number, x: number): ImageStyle {
  return StyleSheet.create({
    icon: {
      height: DIMENSIONS.hp(y),
      width: DIMENSIONS.hp(x),
      resizeMode: "contain"
    }
  }).icon;
}

export default Icon;
