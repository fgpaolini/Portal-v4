import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default defineNuxtPlugin((nuxtApp) => {

    const toast = useToast();

    return {
        provide: {
            toast: toast
        }
    };
});