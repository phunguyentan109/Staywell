const path = require('path')
const { override, fixBabelImports } = require('customize-cra')

const overrideProcessEnv = value => config => {
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules)
  return config
}

module.exports = override(
  fixBabelImports('lodash',
    { libraryDirectory: '', camel2DashComponentName: false }
  ),
  fixBabelImports('antd',
    { libraryDirectory: 'es', style: true }
  ),
  fixBabelImports('@ant-design/icons',
    { libraryDirectory: 'es/icons', camel2DashComponentName: false }
  ),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version),
  })
)
