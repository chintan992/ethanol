# ethanol

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


File Structure

my-vue-app/
├── node_modules/           # Installed npm packages
├── public/                 # Static assets
│   ├── favicon.ico         # Favicon
│   └── index.html          # Main HTML file
├── src/                    # Source files
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── components/         # Reusable components
│   │   ├── TVShows.vue     # Component to display TV shows
│   │   ├── Movies.vue      # Component to display movies
│   │   └── ...             # Other components
│   ├── router/             # Router configuration
│   │   └── index.ts        # Vue Router setup
│   ├── views/              # Page-level components
│   │   ├── Home.vue        # Home page component
│   │   ├── TVShows.vue     # TV shows page component
│   │   ├── Movies.vue      # Movies page component
│   │   └── ...             # Other views
│   ├── App.vue             # Main App component
│   ├── main.ts             # Entry point for the application
│   ├── env.d.ts            # TypeScript definitions for environment variables
│   └── styles/             # Global styles (optional)
│       └── main.css        # Main stylesheet
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
└── vue.config.js           # Vue CLI configuration (if needed)