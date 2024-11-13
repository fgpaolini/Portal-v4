<template>
    <div>
        <OrganizationChart :value="siteMapModel">
            <template #default="slotProps">
                <div class="flex flex-column">
                    <div >
                    <NuxtLink :to="slotProps.node.to" class="flex flex-column gap-2 justify-content-center align-items-center">                    
                        <Button :label="slotProps.node.label" link  iconPos="top" >
                            <template #icon>
                                <div>                                    
                                    <i :class="slotProps.node.icon" style="font-size: 1.5rem"></i>
                                </div>
                            </template>
                        </Button>
                    </NuxtLink>                        
                    </div>
                </div>
            </template>
        </OrganizationChart>
    </div>
</template>

<script setup lang="ts">
const { $isDev } = useNuxtApp();

const router = useRouter()

const model = ref([
    {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        to: '/',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
        ]
    },
    {
        label: 'Contratos',        
        icon: 'pi pi-fw pi-file',
        items: [
            {   
                label: 'Alta (BETA)',
                dev: true,
                icon: 'pi pi-fw pi-user-plus',
                to: '/soluciones/contratos/alta',
            },   
            {
                label: 'Listado',
                icon: 'pi pi-fw pi-users',
                to: '/soluciones/contratos/Listado'
            },
            {
                label: 'Facturas',
                icon: 'pi pi-fw pi-receipt',
                to: '/soluciones/facturas'
            },
        ]
    },
    {
        label: 'Comparador (BETA)', 
        icon: 'pi pi-fw pi-box',
        items: [
            {
                label: 'Comparativa',
                icon: 'pi pi-fw pi-copy',
                url:  $isDev ? '/soluciones/comparador/comparativa' : 'https://comparador.lideraenergia.com/',
                target: $isDev ? '' : '_blank'
            },
            {
                label: 'Listado',
                icon: 'pi pi-fw pi-bars',
                url: $isDev ? '/soluciones/comparador/listado' : 'https://comparador.lideraenergia.com/listado',
                target: $isDev ? '' : '_blank'
            },
            {
                label: 'Historico',
                icon: 'pi pi-fw pi-chart-bar',
                to: '/soluciones/comparador/historico'
            },
        ]
    },
    {
        label: 'Agentes',
        icon: 'pi pi-fw pi-user',
        dev: true,
        items: [
            {
                label: 'Listado',
                icon: 'pi pi-fw pi-users',
                to: "/agentes/listado"
            }
        ]
    },
    {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        dev: true,
        items: [
            {
                label: 'Listado',                
                icon: 'pi pi-users',
                to: "/usuarios/listado"
            }
        ]
    },
    {
        label: 'Utilidades',
        icon: 'pi pi-fw pi-box',
        items: [
            {
                label: 'Sips',
                icon: 'pi pi-fw pi-box',
                to: "/utilidades/sips"
            },
        ]
    },
]);

const data = ref({
    key: '0',
    label: 'Dashboard',
    children: [
        {
            key: '0-0',
            label: 'Argentina',
            children: [
                {
                    key: '0-0-0',
                    label: 'Argentina'
                },
                {
                    key: '0-0-1',
                    label: 'Croatia'
                }
            ]
        },
        {
            key: '0-1',
            label: 'France',
            children: [
                {
                    key: '0-1-0',
                    label: 'France'
                },
                {
                    key: '0-1-1',
                    label: 'Morocco'
                }
            ]
        }
    ]
});

const siteMapModel = computed(() => {

    const modelSinHome = model.value.filter(item => item.label !== 'Home');

    const test = {
        key: '0',
        type: 'person',
        label: "Dashboard",
        icon: 'pi pi-fw pi-home',
        to: '/',
        children: modelSinHome.map((item, parentIndex) => {
            return {
                key: `0-${parentIndex}`, // Nivel del primer hijo
                type: 'person',
                label: item.label,
                icon: item.icon,
                children: item.items.map((subItem, childIndex) => {
                    return {
                        key: `0-${parentIndex}-${childIndex}`, // Nivel del segundo hijo
                        label: subItem.label,
                        icon: subItem.icon,
                        to: subItem.to,
                    };
                })
            };
        })
    };
    return test;
});

</script>

<style scoped>

</style>