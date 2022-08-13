const path = require('path')
const { override } = require('customize-cra')
const addLessLoader = require('customize-cra-less-loader')

const overrideProcessEnv = value => config => {
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules)
  return config
}

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        paths: [path.resolve(__dirname, 'src')],
      }
    }
  }),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version),
  })
)
