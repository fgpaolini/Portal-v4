import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    autoImport: true,
    options: {
        theme: {
            preset: Aura,
            options: {
              prefix: 'p',
              darkModeSelector: 'light',
              cssLayer: false
          }
        }
    },
    usePrimeVue: true
  },
  
  app: {
    head: {
      title: "Portal",
      link: [
        {
          id: "theme-css",
          rel: "stylesheet",
          type: "text/css",
          href: "/themes/aura-light-green/theme.css",
        },
      ],
    },
  },
  css: [
    "primeicons/primeicons.css",
    "primeflex/primeflex.scss",
    "@/assets/layout/styles.scss",
  ],
})
