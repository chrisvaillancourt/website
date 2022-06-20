// TODO get process env
// const isDev = import.meta.env.DEV;
const isDev = true;

const baseRules = {
  'no-console': isDev ? 'off' : 'error',
  'no-new-wrappers': 'error',
  eqeqeq: ['error', 'smart'],
  'no-return-await': 'error',
  // 'no-void': ['error', {allowAsStatement: true}] // * May be helpful to uncomment later
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: baseRules,
  overrides: [
    {
      files: ['**/*.ts', '**/*.vue'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:vue/vue3-recommended',
        '@nuxtjs/eslint-config-typescript',
        'prettier',
      ],
      rules: {
        ...baseRules,
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/valid-v-slot': ['error', { allowModifiers: true }],
        'vue/component-tags-order': [
          'error',
          {
            order: [['script', 'template'], 'style'],
          },
        ],
      },
    },
    {
      files: ['layouts/*.vue', 'pages/**/*.vue'],
      rules: { 'vue/multi-word-component-names': 'off' },
    },
  ],
};
