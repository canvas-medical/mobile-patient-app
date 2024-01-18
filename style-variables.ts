import { Dimensions } from 'react-native';

const global = {
  // Screen Dimensions
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,

  size: (s: number) => Dimensions.get('window').width * (s / 393),

  // Color Palette
  white: '#f8fafc',
  neutral100: '#f1f5f9',
  neutral150: '#EAEFF5',
  neutral200: '#e2e8f0',
  neutral300: '#cbd5e1',
  neutral400: '#94a3b8',
  neutral500: '#64748b',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1e293b',
  neutral900: '#0f172a',
  black: '#020617',
  transparent: 'transparent',
  primaryBlue: '#3B66FD', // Lighter
  secondaryBlue: '#2154FF', // Middle
  tertiaryBlue: '#093EFE', // Darker
  error: '#DF3C3C30',
  green: '#16a34a',
  red: '#FF0000', // For dev use only
  severityRed: '#FF0000',
  severityYellow: '#FF8F00',
  severityGreen: '#008000',
  editGreen: '#41CC79',
  buttonShadow: {
    shadowOffset: {
      width: 0,
      height: Dimensions.get('window').width * (4 / 393),
    },
    shadowOpacity: 0.4,
    shadowRadius: Dimensions.get('window').width * (4 / 393),
    shadowColor: '#0f172a', // neutral900
    elevation: 4,
  },
  cardShadow: {
    shadowOffset: {
      width: 0,
      height: Dimensions.get('window').width * (1 / 393),
    },
    shadowOpacity: 0.25,
    shadowRadius: Dimensions.get('window').width * (2 / 393),
    shadowColor: '#94a3b8', // neutral400
    elevation: 1,
  },

  // Typography
  // Titles
  titleXSmall: {
    fontFamily: 'InterExtraBold',
    fontSize: Dimensions.get('window').width * (16 / 393),
    lineHeight: Dimensions.get('window').width * (24 / 393),
    letterSpacing: 0.1,
  },
  titleSmall: {
    fontFamily: 'InterExtraBold',
    fontSize: Dimensions.get('window').width * (20 / 393),
    lineHeight: Dimensions.get('window').width * (24 / 393),
    letterSpacing: 0.1,
  },
  titleMedium: {
    fontFamily: 'InterExtraBold',
    fontSize: Dimensions.get('window').width * (24 / 393),
    lineHeight: Dimensions.get('window').width * (28 / 393),
    letterSpacing: 0.15,
  },
  titleLarge: {
    fontFamily: 'InterExtraBold',
    fontSize: Dimensions.get('window').width * (32 / 393),
    lineHeight: Dimensions.get('window').width * (36 / 393),
    letterSpacing: 0,
  },
  labelXSmall: {
    fontFamily: 'InterMedium',
    fontSize: Dimensions.get('window').width * (10 / 393),
    lineHeight: Dimensions.get('window').width * (12 / 393),
    letterSpacing: 0,
  },
  labelSmall: {
    fontFamily: 'InterMedium',
    fontSize: Dimensions.get('window').width * (14 / 393),
    lineHeight: Dimensions.get('window').width * (18 / 393),
    letterSpacing: 0.5,
  },
  labelMedium: {
    fontFamily: 'InterMedium',
    fontSize: Dimensions.get('window').width * (16 / 393),
    lineHeight: Dimensions.get('window').width * (20 / 393),
    letterSpacing: 0.5,
  },
  labelLarge: {
    fontFamily: 'InterMedium',
    fontSize: Dimensions.get('window').width * (20 / 393),
    lineHeight: Dimensions.get('window').width * (24 / 393),
    letterSpacing: 0.1,
  },
  labelXLarge: {
    fontFamily: 'InterMedium',
    fontSize: Dimensions.get('window').width * (24 / 393),
    lineHeight: Dimensions.get('window').width * (28 / 393),
    letterSpacing: 0.5,
  },
  bodySmall: {
    fontFamily: 'InterRegular',
    fontSize: Dimensions.get('window').width * (12 / 393),
    lineHeight: Dimensions.get('window').width * (16 / 393),
    letterSpacing: 0.4,
  },
  bodyMedium: {
    fontFamily: 'InterRegular',
    fontSize: Dimensions.get('window').width * (14 / 393),
    lineHeight: Dimensions.get('window').width * (18 / 393),
    letterSpacing: 0.25,
  },
  bodyLarge: {
    fontFamily: 'InterRegular',
    fontSize: Dimensions.get('window').width * (16 / 393),
    lineHeight: Dimensions.get('window').width * (20 / 393),
    letterSpacing: 0.5,
  },
  bodyXLarge: {
    fontFamily: 'InterRegular',
    fontSize: Dimensions.get('window').width * (20 / 393),
    lineHeight: Dimensions.get('window').width * (24 / 393),
    letterSpacing: 0.5,
  },
};

export { global as g };
