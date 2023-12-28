module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            '@assets': './assets',
            '@components': './components',
            '@constants': './constants',
            '@interfaces': './interfaces',
            '@services': './services',
            '@store': './store',
            '@styles': './style-variables.ts',
            '@ui': './ui',
            '@utils': './utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
