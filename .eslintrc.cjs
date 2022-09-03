module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:astro/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    // sourceType: 'module',
    extraFileExtensions: ['.astro'], // required setting in `@typescript-eslint/parser` v5
    ecmaFeatures: {
      jsx: true,
    },
  },
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ['**/*.cjs'],
      env: {
        node: true,
      },
    },
    {
      // Define the configuration for `.astro` file.
      files: ['*.astro'],
      env: {
        es2022: true,
      },
      globals: {
        Astro: 'readonly',
        // make ESLint aware of astroHTML so we can do something like:
        //  `export type Props = astroHTML.JSX.AnchorHTMLAttributes`
        astroHTML: 'readonly',
      },
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
        extraFileExtensions: ['.astro'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      plugins: ['@typescript-eslint'],
      env: {
        browser: true,
        es2022: true,
      },
      parserOptions: {
        sourceType: 'module',
      },
      globals: {
        Astro: 'readonly',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      env: {
        es2022: true,
        node: true,
      },
      rules: {
        // '@typescript-eslint/no-unused-vars': [
        //   'error',
        //   { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
        // ],
      },
    },
  ],
};
