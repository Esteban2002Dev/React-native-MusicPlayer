module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@features': './src/features',
          '@navigation': './src/navigation',
          '@config': './src/config',
          '@shared': './src/shared',
        },
      },
    ],
  ],
};
