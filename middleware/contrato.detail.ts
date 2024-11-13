import { useNuxtApp } from '#app';
import { useRoute } from '#app';
import type { RouteLocationNormalized } from "vue-router";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const route = useRoute();

/*     console.log('Middleware')

    console.log(route.params.referencia)

    if (typeof route.params.referencia != 'number') {
        console.log("No hay referencia")
        return abortNavigation()
    }
 */
})