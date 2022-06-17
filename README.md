# Website

## Actions

[ ] [eslint](https://github.com/nuxt/framework/discussions/2815)
[ ] prettier
[ ] add favicon:

```html
<link rel="shortcut icon" type="image/ico" href="/src/assets/favicon.ico" />
<link
  rel="icon"
  href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐢</text></svg>"
/>
<title>Christopher Vaillancourt</title>
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev -- -o
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
