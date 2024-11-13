export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            isDev: process.env.NODE_ENV === 'development'
        }
    }
})