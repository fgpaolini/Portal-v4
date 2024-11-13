<template>
    <Head>
        <Title>{{ $pageTitle }} - Login</Title>
    </Head>
    <FloatingConfigurator />
    <div class="flex justify-content-center">
        <Card class="card">
            <template #title>
            </template>
            <template #header>
                <div class="flex flex-column align-items-center mt-3">
                    <img alt="header" :src="logoIdentidad" class="flex align-items-center" style="width:400px;" />
                </div>
            </template>
            <template #content>
                <div>
                    <div>
                        <form class="flex flex-column align-items-center justify-content-center gap-3"
                            @submit.prevent="handleSign">
                            <div class="w-full">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <InputIcon class="pi pi-user"> </InputIcon>
                                    </InputGroupAddon>
                                    <InputText id="Email" placeholder="Email" autocomplete="email" v-model="email" />
                                </InputGroup>
                            </div>
                            <div class="w-full">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <InputIcon class="pi pi-lock"> </InputIcon>
                                    </InputGroupAddon>
                                    <Password id="Password" placeholder="Contraseña" autocomplete="current-password"
                                        toggleMask label="password" v-model="password" :feedback="false" />
                                </InputGroup>
                            </div>
                            <div class="w-full flex justify-content-center">
                                <Button type="submit" label="Login" icon="pi pi-user" class="w-full"
                                    :loading="loading"></Button>
                            </div>                            
                        </form>
                    </div>
                        <div class="layout-footer" v-if="IsLidera">
                            <img :src="logoIcon" alt="Logo" height="20" class="mr-2" />
                            by
                            <span class="font-medium ml-2">Greening Energy</span>
                        </div>
                </div>                
            </template>
        </Card>        

    </div>
    <div class="flex justify-content-center">
    <Message v-if="errorLogin" :closable="false" severity="warn">Ponte en contacto con el administrador del sitio para terminar la configuración de usuario.</Message>
    </div>
    <Toast />
</template>

<script setup lang="ts">
import FloatingConfigurator from '~/components/FloatingConfigurator.vue';
import { TipoSubdomain, useAuth } from '#imports'
// https://auth.sidebase.io/guide/local/quick-start
/* definePageMeta({
    layout: 'auth',
    auth: false
}) */


const { layoutConfig } = useLayout();
const { $customApp, $isDev } = useNuxtApp();

const IsLidera = computed(() => $customApp.Domain === TipoSubdomain.PORTAL_LIDERA)

const logoIdentidad = computed(() => {
    return layoutConfig.darkTheme.value ? $customApp.LogoIdentidad.Dark : $customApp.LogoIdentidad.Light;
});
const logoIcon = computed(() => {
    return layoutConfig.darkTheme.value ? $customApp.Icon.Dark : $customApp.Icon.Light;
});

const config = useRuntimeConfig()

const { $toast } = useNuxtApp();
const { data, status, signIn } = useAuth()

const email = ref($isDev ? config.public.devCredEmail: '')
const password = ref($isDev ? config.public.devCredPassword : '')
const loading = ref(false)
const errorLogin = ref(false);
const handleSign = async () => {
    loading.value = true
    try {
        await signIn({ email: email.value, password: password.value, }, { redirect: false });
        if (status.value === "authenticated") {            
            if (data.value) {
                // if (data.value.HasAgent) { // Ya no comprobamos si el usuario tiene un agentne asociado ya que puede ser que no tennga agente y si departamento/grupo.
                    $toast.add({ severity: 'success', summary: 'Auth', detail: 'Se ha autenticado de forma correcta.', life: 2500 });
                    return navigateTo('/');
                //}
            }
            // errorLogin.value = true;
            // $toast.add({ severity: 'error', summary: 'Auth', detail: 'El usuario no tiene un agente asociado.', life: 2500 });
        }
    }
    catch (err) {
        const authError = err as IAuthError;
        if (err instanceof Error && err.message.includes('NetworkError')) {
            $toast.add({ severity: 'error', summary: 'Auth', detail: 'Error de red. Comprueba tu conexión e intentalo de nuevo.', life: 2500 });
        } else {
            if (authError.response && authError.response._data) {
                const errorResponse = authError.response;
                const errorHTTPCode = authError.response.status;
                const errorMessage = authError.response._data.message;
                $toast.add({ severity: 'error', summary: 'Auth', detail: errorMessage, life: 2500 });
            }
            if(authError.response?.status != 401 && authError.name.includes('FetchError')) {
                $toast.add({ severity: 'error', summary: 'Auth', detail: 'Error en la conexión con el servidor.', life: 1500 });
            }
        }
    }
    finally {
        loading.value = false;
    }
}


</script>


<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
