import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;
const widthScale = (size: number) => (width / guidelineBaseWidth) * size;
const heightScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor: number = 0.5) => size + (widthScale(size) - size) * factor;

const global = {
  // Screen Dimensions
  width,
  height,

  // Screen Scaling
  ws: widthScale, // width, marginHorizontal, paddingHorizontal, etc. w/ exceptions
  hs: heightScale, // height, marginVertical, paddingVertical, etc. w/ exceptions
  ms: moderateScale, // fontSize, borderRadius, icons, etc. w/ exceptions

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
      height: moderateScale(4),
    },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(4),
    shadowColor: '#0f172a', // neutral900
    elevation: 4,
  },
  cardShadow: {
    shadowOffset: {
      width: 0,
      height: moderateScale(1),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(2),
    shadowColor: '#94a3b8', // neutral400
    elevation: 1,
  },
  tabBarHeight: 0,

  // Typography
  // Titles
  titleXSmall: {
    fontFamily: 'InterExtraBold',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    letterSpacing: 0.1,
  },
  titleSmall: {
    fontFamily: 'InterExtraBold',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(24),
    letterSpacing: 0.1,
  },
  titleMedium: {
    fontFamily: 'InterExtraBold',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(28),
    letterSpacing: 0.15,
  },
  titleLarge: {
    fontFamily: 'InterExtraBold',
    fontSize: moderateScale(32),
    lineHeight: moderateScale(36),
    letterSpacing: 0,
  },
  labelXSmall: {
    fontFamily: 'InterMedium',
    fontSize: moderateScale(10),
    lineHeight: moderateScale(12),
    letterSpacing: 0,
  },
  labelSmall: {
    fontFamily: 'InterMedium',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
    letterSpacing: 0.5,
  },
  labelMedium: {
    fontFamily: 'InterMedium',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    letterSpacing: 0.5,
  },
  labelLarge: {
    fontFamily: 'InterMedium',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(24),
    letterSpacing: 0.1,
  },
  labelXLarge: {
    fontFamily: 'InterMedium',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(28),
    letterSpacing: 0.5,
  },
  bodySmall: {
    fontFamily: 'InterRegular',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    letterSpacing: 0.4,
  },
  bodyMedium: {
    fontFamily: 'InterRegular',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
    letterSpacing: 0.25,
  },
  bodyLarge: {
    fontFamily: 'InterRegular',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    letterSpacing: 0.5,
  },
  bodyXLarge: {
    fontFamily: 'InterRegular',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(24),
    letterSpacing: 0.5,
  },
};

export { global as g };
