module.exports = ({ config }) => ({
  ...config,
  android: { ...config.android, googleServicesFile: process.env.GOOGLE_SERVICES_JSON },
  extra: { ...config.extra, bugsnag: { apiKey: process.env.BUGSNAG_API_KEY } },
});
