require('dotenv').config()
const shell = require('shelljs')

if (process.env.ENV_MODE === 'develop') {
  shell.exec('sh scripts/post-build-dev.sh')
}

if (process.env.BUILD_STATE === 'optimize') shell.exec('sh scripts/optimize.sh')
