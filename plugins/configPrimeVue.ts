import PrimeVue from "primevue/config";
import localeES from '~/locales/es.json';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {
        ripple: true,
        locale: localeES
    });
});