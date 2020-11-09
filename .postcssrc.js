module.exports = {
  plugins: {
    'postcss-px2rem': {
      remUnit: 100
    },
    cssnano: {
      preset: [
        'advanced',
        {
          discardComments: {
            removeAll: true
          },
          zindex: false,
          autoprefixer: {
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead', 'iOS >= 8', 'Android >= 4.1']
          }
        }
      ]
    }
  }
};
