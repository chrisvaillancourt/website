const postcssJitProps = require('postcss-jit-props');
const OpenProps = require('open-props');
const postcssGlobalData = require('@csstools/postcss-global-data');
module.exports = {
  plugins: [
    postcssJitProps(OpenProps),
    postcssGlobalData({
      // needs to come before postcss-custom-media

      files: ['node_modules/open-props/media.min.css'],
    }),
    require('postcss-custom-media'),
  ],
};
