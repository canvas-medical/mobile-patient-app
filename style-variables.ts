import { Dimensions } from 'react-native';

const global = {
  // Screen Dimensions
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,

  size: (s: number) => Dimensions.get('window').width * (s / 393),

  // Color Palette
  white: '#FAFAFA',
  black: '#1A1A1A',
  primaryBlue: '#006CE9', // Lighter
  secondaryBlue: '#0039AA', // Darker
  blurBlue: '#5288EB',
  red: '#9A1010',

  // Typography
  // Titles
  titleXSmall: {
    fontFamily: 'Poetsen',
    fontSize: Dimensions.get('window').width * (16 / 393),
    lineHeight: Dimensions.get('window').width * (24 / 393),
    letterSpacing: 0.1,
    color: '#FAFAFA',
  },
  titleSmall: {
    fontFamily: 'Poetsen',
    fontSize: Dimensions.get('window').width * (20 / 393),
    lineHeight: Dimensions.get('window').width * (24 / 393),
    letterSpacing: 0.1,
    color: '#FAFAFA',
  },
  titleMedium: {
    fontFamily: 'Poetsen',
    fontSize: Dimensions.get('window').width * (24 / 393),
    lineHeight: Dimensions.get('window').width * (28 / 393),
    letterSpacing: 0.15,
    color: '#FAFAFA',
  },
  titleLarge: {
    fontFamily: 'Poetsen',
    fontSize: Dimensions.get('window').width * (32 / 393),
    lineHeight: Dimensions.get('window').width * (36 / 393),
    letterSpacing: 0,
    color: '#FAFAFA',
  },
  header: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (24 / 393),
    lineHeight: Dimensions.get('window').width * (28 / 393),
    letterSpacing: 0,
  },
  labelSmall: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (14 / 393),
    lineHeight: Dimensions.get('window').width * (18 / 393),
    letterSpacing: 0.5,
  },
  labelMedium: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (16 / 393),
    lineHeight: Dimensions.get('window').width * (20 / 393),
    letterSpacing: 0.5,
  },
  labelLarge: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (20 / 393),
    lineHeight: Dimensions.get('window').width * (24 / 393),
    letterSpacing: 0.1,
  },
  bodySmall: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (12 / 393),
    lineHeight: Dimensions.get('window').width * (16 / 393),
    letterSpacing: 0.4,
  },
  bodyMedium: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (14 / 393),
    lineHeight: Dimensions.get('window').width * (18 / 393),
    letterSpacing: 0.25,
  },
  bodyLarge: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (16 / 393),
    lineHeight: Dimensions.get('window').width * (20 / 393),
    letterSpacing: 0.5,
  },
  bodyXLarge: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (20 / 393),
    lineHeight: Dimensions.get('window').width * (24 / 393),
    letterSpacing: 0.5,
  },
};

export { global as g };
