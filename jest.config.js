module.exports = {
  preset: 'react-native',
  setupFiles: ['./setupTest.ts'],
  setupFilesAfterEnv: [
    '@testing-library/react-native/extend-expect',
    './_mocks_/AllMocks.ts',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@notifee)',
  ],
};