import {Platform} from 'react-native';

function isOs(os: 'android' | 'ios'): boolean {
  return Platform.OS === os;
}

export {isOs};
