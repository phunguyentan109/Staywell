module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2020
  },
  'rules': {
    'key-spacing'          : 'off',
    'quotes'               : ['error', 'single'],
    'jsx-quotes'           : ['error', 'prefer-single'],
    'max-len'              : ['error', { 'code': 120, 'tabWidth': 2, 'ignoreUrls': true }],
    'object-curly-spacing' : [2, 'always'],
    'comma-dangle'         : 'off',
    'indent'               : ['error', 2],
    'keyword-spacing'      : ['error', { 'after': true }],
    'semi'                 : ['error', 'never']
  }
}
