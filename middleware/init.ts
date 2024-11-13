import { useNuxtApp } from '#app';
import { useLastFetch } from '~/composables/useLastFetch';


export default defineNuxtRouteMiddleware(async (to, from) =>{
    if (import.meta.server) return

    const { shouldFetch } = useLastFetch();

    if(!shouldFetch()) return 

    const { $api } = useNuxtApp();

    console.log('Fetching...')
    
    const { data: preferenceData } = await $api.preferences.getPreferences({ immediate: true})

    preferenceData.value!.forEach(pref => {
        localStorage.setItem(pref.TipoPreferencia, JSON.stringify(pref.Preferencia))
    });

    const layoutConfigPref = preferenceData.value!.find((item: { TipoPreferencia: string }) => item.TipoPreferencia === 'layoutConfig')?.Preferencia as LayoutConfig;


})