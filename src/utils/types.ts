export type StatusBarProps = {
  barStyle: 'light-content' | 'dark-content' | 'default';
  backgroundColor: string;
};

export type DimensionHelper = {
  width: number;
  height: number;
  wp: (percentage: number) => number;
  hp: (percentage: number) => number;
};

export type Colors = {
  primary: '#000000';
  secondary: '#777777';
  secondaryAlt: '#292929';
  accent: '#E1EAF7';
  black: '#000000';
  black2: '#2B2B2B';
  white: '#ffffff';
  white20: '#ffffff33';
  blue: '#85A5CC';
  disabled: '#393939';
  gray: '#262626';
  text: '#FCFCFC';
  input: '#FFFDFD';
  transparent: 'transparent';
  dark_overlay: 'rgba(0, 0, 0, 0.3)';
  light_overlay: 'rgba(255, 255, 255, 0.5)';
  light_grey: '#d3d3d3';

  // snackbar
  snackbar_success: '#2ecc71';
  snackbar_error: '#e74c3c';
  snackbar_info: '#3498db';

  //indicators
  success500: '#00C853';
  warning500: '#F5A623';
  error300: '#FF9999';
  error500: '#EA3100';
};

export type Sizing = {
  base: 8;
  font: 14;
  unit: 1;
  s: 6;
  xs: 4;
  xxs: 2;
  m: 10;
  l: 12;
  xl: 16;
  ml: 24;
  xxl: 40;
};

export type Fonts = {
  BLD: 'Poppins-Bold';
  SBLD: 'Poppins-SemiBold';
  REG: 'Poppins-Regular';
  MED: 'Poppins-Medium';
  LIT: 'Poppins-Light';
};

export type Roles = 'STUDENT' | 'ALUMNI';

export type Color = keyof Colors;

export type Size = keyof Sizing;

export type Font = keyof Fonts;
