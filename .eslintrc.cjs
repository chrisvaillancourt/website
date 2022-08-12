module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking', // doesn't work with config
    'plugin:jsx-a11y/strict',
    'plugin:astro/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.astro'], // required setting in `@typescript-eslint/parser` v5
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        // '@typescript-eslint/no-unused-vars': [
        //   'error',
        //   { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
        // ],
      },
    },
  ],
};
