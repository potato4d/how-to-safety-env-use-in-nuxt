import NuxtConfiguration from '@nuxt/config'
import consola from 'consola'
import { environments } from './src/plugins/environments'

if (!process.env.CI) {
  Object.entries(environments).forEach(([key, value]) => {
    if (['browser', 'client', 'mode', 'modern', 'server', 'static'].includes(key)) {
      return
    }
    if (environments[key] === undefined || environments[key] === null) {
      consola.error(`Missing environment variable: '${key}'`)
      process.exit(1)
    }
  })
}

const config: NuxtConfiguration = {
  srcDir: 'src',
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/environments.ts'
  ],
  env: {
    APP_NAME: process.env.APP_NAME!
  },
  /*
  ** Nuxt.js modules
  */
  modules: [],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}

export default config
