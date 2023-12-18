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
  error: '#DF3C3C30',
  red: '#ED4337',
  goldenYellow: '#FFD700',
  neutral50: '#CECECE36',
  neutral100: '#D9D9D9',
  neutral200: '#C3C3C3',
  neutral300: '#989898',
  neutral500: '#6C6C6C',
  transparent: 'transparent',
  severityRed: '#B22222',
  severityYellow: '#FFFF00',
  severityGreen: '#00FF00',
  shadow: {
    shadowOffset: {
      width: 0,
      height: Dimensions.get('window').width * (4 / 393),
    },
    shadowOpacity: 0.4,
    shadowRadius: Dimensions.get('window').width * (4 / 393),
    shadowColor: '#1A1A1A',
  },

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
  labelXLarge: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (24 / 393),
    lineHeight: Dimensions.get('window').width * (28 / 393),
    letterSpacing: 0.5,
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
