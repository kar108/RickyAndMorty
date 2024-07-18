import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { base } from '../assets/styles';
import { COLORS, DIMENSIONS, SIZES } from '../utils/constants';
import Typography from './Typography';
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';

type Props = {
  blur?: boolean;
  backIcon?: boolean;
  url: string;
  style?: StyleProp<ImageStyle | ViewStyle>;
  lazy?: boolean;
  height?: number;
  width?: number;
  showLoader?: boolean;
  showError?: boolean;
  errorFallback?: JSX.Element;
  dynamic?: boolean;
};

function LazyImage({
  blur = false,
  backIcon = false,
  url,
  style,
  height = 2,
  width = 2,
  lazy = true,
  showLoader = true,
  showError = false,
  errorFallback,
}: Props): JSX.Element {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState<boolean>(lazy);
  const [error, setError] = useState<boolean>(false);

  const isSvg = url?.includes?.('.svg');

  // console.log(blur,"blur")

  const stopLoading = () => {
    setLoading(false);
  };

  const startLoading = () => {
    setLoading(true);
  };

  const setErrorState = () => setError(true);

  const getSource = () => {
    if (url) {
      return { uri: url };
    }
    else {
      return require('../assets/images/defprofileimg.png');
    }
  };

  if (error && showError) {
    return (
      errorFallback || (
        <Typography size={SIZES.font} textColor="text" align="center" mb={1}>
          Image not found
        </Typography>
      )
    );
  }


  return (
    <View style={styles.relative}>
      <Image
        blurRadius={blur ? 8 : 0}
        source={getSource()}
        style={[
          getStyles(height, width),
          style as ImageStyle,
          base.bg_white as ImageStyle,
        ]}
        onLoadEnd={stopLoading}
        onLoadStart={startLoading}
        onError={setErrorState}
      />
    </View>
  );
}

const getStyles = function (y: number, x: number): ImageStyle {
  return StyleSheet.create({
    icon: {
      height: DIMENSIONS.hp(y),
      width: DIMENSIONS.hp(x),
      resizeMode: 'cover',
    },
  }).icon;
};

const styles = StyleSheet.create({
  relative: {
    position: 'relative',
  },
  skeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LazyImage;
