// TODO get process env
const isDev = import.meta.env.DEV;

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  plugins: ['@typescript-eslint'], //? Does `vue` need to be added?
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.vue'],
  },
  rules: {
    'no-console': isDev ? 'off' : 'error',
    'no-new-wrappers': 'error',
    eqeqeq: ['error', 'smart'],
    'no-return-await': 'error',
    // 'no-void': ['error', {allowAsStatement: true}] // * May be helpful to uncomment later
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
  },
  overrides: [
    {
      files: ['layouts/*.vue', 'pages/**/*.vue'],
      rules: { 'vue/multi-word-component-names': 'off' },
    },
  ],
  ignorePatterns: ['.eslintrc.cjs'],
};
