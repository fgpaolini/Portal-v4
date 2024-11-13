<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item :item="item" :index="i"></app-menu-item>
            <li class="menu-separator"></li>
        </template>
    </ul>
</template>


<script setup lang="ts">
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/FormLayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/InputDoc' },
            /* { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/ButtonDoc', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/TableDoc' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/ListDoc' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/TreeDoc' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/PanelsDoc' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/OverlayDoc' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/MediaDoc' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/MenuDoc' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/MessagesDoc' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/FileDoc' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/ChartDoc' },
            { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/TimelineDoc' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/MiscDoc' } */
        ]
    },
/*     {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        
        items: [
            {
                label: 'Landing',
                icon: 'pi pi-fw pi-globe',
                to: '/Landing'
            },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/Login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/Error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/Access'
                    }
                ]
            },
            {
                label: 'Crud',
                icon: 'pi pi-fw pi-pencil',
                to: '/pages/Crud'
            },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/NotFound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/Empty'
            }
        ]
    },
    {
        label: 'Hierarchy',
        items: [
            {
                label: 'Submenu 1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 1.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'Submenu 2',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Submenu 2.2',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            }
        ]
    }, */
/*     {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-book',
                to: '/documentation'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-github',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            }
        ]
    } */
]);
</script>

<style lang="scss" scoped></style>
