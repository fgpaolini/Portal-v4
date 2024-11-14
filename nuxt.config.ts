import Aura from '@primevue/themes/aura';

const isDev = process.env.NODE_ENV === 'development';

export default defineNuxtConfig({
  compatibilityDate: '2024-07-08',
  ssr: false,
  devtools: { 
    enabled: true 
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },

  imports: {
    dirs: ["config/**"],
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

  modules: [
    '@primevue/nuxt-module',
    "nuxt-icon",
    "@pinia/nuxt",
    "nuxt-typed-router",
    "@vueuse/nuxt",
    "@sidebase/nuxt-auth",
  ],

  auth: {
    globalAppMiddleware: true,
    isEnabled: true,
    //disableServerSideAuth: false,
    baseURL: process.env.NUXT_PUBLIC_API_AUTH_BASE,
    provider: {
      type: "local",
      pages: {
        login: "/auth/login",
      },
      endpoints: {
        signIn: { path: "auth/login", method: "post" },
        signOut: { path: "auth/logout", method: "post" },
        signUp: { path: "usuarios/register", method: "post" },
        getSession: { path: "auth/session", method: "get" },
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: 'auth/refresh', method: 'post' },
        refreshOnlyToken: false,
        token: {
            signInResponseRefreshTokenPointer: '/refresh-token',
            refreshRequestTokenPointer: "/refresh-token",
            cookieName: 'auth.refresh-token',
            maxAgeInSeconds: isDev ? 2400 : 300, // 60*5 => 5 minutos
            sameSiteAttribute: 'lax',
        }
      },
      token: {
        signInResponseTokenPointer: "/Token",
        // type: "Bearer",
        // cookieName: "auth.token",
        // headerName: "Authorization",
        maxAgeInSeconds: isDev ? 2400 : 300, // 60*5 => 5 minutos
        sameSiteAttribute: "lax",
      },
      session: {
        dataType: {
                Id: "string",
                Email: "string",
                UserName: "string",
                FullName: "string",
                HasAgent: "boolean"
        },
      },
    },
  },
				

  plugins: ["~/plugins/configPrimeVue.ts"],
  primevue: {
    autoImport: true,
    options: {
        theme: {
            preset: Aura,
            options: {
              prefix: 'p',
              darkModeSelector: '.app-dark',
          }
        }
    },
    usePrimeVue: true
  },

  css: [
    "primeicons/primeicons.css",
    "primeflex/primeflex.scss",
    "@/assets/layout/styles.scss",
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      devCredEmail: process.env.NUXT_DEV_CRED_EMAIL,
      devCredPassword: process.env.NUXT_DEV_CRED_PASSWORD,
    },
  },

  devServer: {
    https: {
      key: "localhost-key.pem",
      cert: "localhost.pem",
    },
    host: 'localhost',
    port: 3000,
  },
})