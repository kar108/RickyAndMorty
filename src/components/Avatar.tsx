import React from "react";
import { View, StyleSheet, StyleProp, ImageStyle } from "react-native";

import { SIZES, DIMENSIONS } from "../utils/constants";
import LazyImage from "./LazyImage";
import Typography from "./Typography";

type Props = {
  name: string;
  image?: string;
  diameter?: number;
  style?: StyleProp<ImageStyle>;
}

function Avatar ({ image, name, diameter = 4, style }: Props): JSX.Element {


  const block = {
    height: DIMENSIONS.hp(diameter),
    width: DIMENSIONS.hp(diameter),
    borderRadius: DIMENSIONS.hp(diameter / 2),
  }

  const avatar = (
    <View style={[styles.avatar,block, style]}>
      <Typography
        textColor="white"
        size={SIZES.m * (diameter/3)}
        weight="BLD"
        style={styles.name}
      >
        {name?.[0]}
      </Typography>
    </View>
  );

  if (image) return (
    <LazyImage
      url={image}
      showError
      errorFallback={avatar}
      style={{ ...styles.avatar, ...block, ...(typeof style === "object")? style: {}}}
    />
  );

  return avatar;
}

const styles = StyleSheet.create({
  avatar: {
    marginRight: DIMENSIONS.wp(3),
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    textTransform: "uppercase",
  }
});

export default Avatar;
