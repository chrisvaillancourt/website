module.exports = {
	ignorePatterns: ['node_modules', 'dist'],
	root: true,
	reportUnusedDisableDirectives: true,
	env: {
		es2022: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:astro/recommended',
		'plugin:astro/jsx-a11y-recommended',
		'prettier',
	],
	overrides: [
		{
			files: ['*.astro'],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
			rules: {
				'@typescript-eslint/consistent-type-imports': 'error',
			},
		},
		{
			files: ['**/*.ts'],
			parser: '@typescript-eslint/parser',
			extends: ['plugin:@typescript-eslint/recommended'],
		},
	],
	rules: {
		'@typescript-eslint/no-var-requires': 'warn',
	},
};
