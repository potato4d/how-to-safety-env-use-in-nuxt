# how-to-safety-env-use-in-nuxt

## Structure

- Typesafe environments
  - Inject to Vue prototype object
  - Overwrite Vue SFC type definition
- Failsafe launch application
  - Automatically terminate the process if no environment variable is found
- Customized ESLint rule
  - Prohibit direct use of process.env

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
