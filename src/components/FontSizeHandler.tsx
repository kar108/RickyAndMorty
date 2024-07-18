import {Dimensions} from 'react-native';
import {PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 428;
const heightBaseScale = SCREEN_HEIGHT / 926;

function normalize(size: any, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
const fontPixel = (size: any) => {
  return normalize(size, 'height');
};

//for Margin and Padding vertical pixel
const pixelSizeVertical = (size:any) => {
  return normalize(size, 'height');
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size:any) => {
  return normalize(size, 'width');
};

export {fontPixel,pixelSizeVertical,pixelSizeHorizontal};
