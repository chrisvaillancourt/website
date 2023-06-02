const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');
const postcssGlobalData = require('@csstools/postcss-global-data');

module.exports = {
  plugins: [
    postcssJitProps(OpenProps),
    // @ts-expect-error We use the correct syntax but the shipped types are wrong
    postcssGlobalData({
      // needs to come before postcss-custom-media
      files: ['node_modules/open-props/media.min.css'],
    }),
    require('postcss-custom-media'),
  ],
};
