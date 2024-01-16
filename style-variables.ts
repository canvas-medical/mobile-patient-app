import { Dimensions } from 'react-native';

const global = {
  // Screen Dimensions
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,

  size: (s: number) => Dimensions.get('window').width * (s / 393),

  // Color Palette
  white: '#f8fafc',
  newNeutral100: '#f1f5f9',
  newNeutral150: '#EAEFF5',
  newNeutral200: '#e2e8f0',
  newNeutral300: '#cbd5e1',
  newNeutral400: '#94a3b8',
  newNeutral500: '#64748b',
  newNeutral600: '#475569',
  newNeutral700: '#334155',
  newNeutral800: '#1e293b',
  newNeutral900: '#0f172a',
  black: '#020617',
  transparent: 'transparent',
  primaryBlue: '#3B66FD', // Lighter
  secondaryBlue: '#2154FF', // Middle
  tertiaryBlue: '#093EFE', // Darker
  error: '#DF3C3C30',
  red: '#ED4337',
  green: '#16a34a',
  severityRed: '#B22222',
  severityYellow: '#FFFF00',
  severityGreen: '#00FF00',
  editGreen: '#41CC79',
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
  labelXSmall: {
    fontFamily: 'Alata',
    fontSize: Dimensions.get('window').width * (10 / 393),
    lineHeight: Dimensions.get('window').width * (12 / 393),
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
