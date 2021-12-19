const path = require('path')
const { override, addLessLoader } = require('customize-cra')

const overrideProcessEnv = value => config => {
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules)
  return config
}

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    paths: [path.resolve(__dirname, 'src')],
  }),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version),
  })
)
