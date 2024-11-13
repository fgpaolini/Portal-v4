<script setup lang="ts">
import { useLayout } from '@/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
        <i class="pi pi-bars"></i>
        </button>
        <router-link to="/" class="layout-topbar-logo">
        <img src="../assets/img/logo_lidera.png" alt="logo"/>
        <span class="ml-2 text-color">Portal</span>
        </router-link>


        <button class="p-link layout-topbar-menu-button layout-topbar-button" >
        <i class="pi pi-ellipsis-v"></i>
        </button>
    <slot></slot>

        <div class="layout-topbar-buttons">
            <div class="layout-topbar-menu">
                <button type="button" class="p-link layout-topbar-button" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ 
                            selector: '.box2', 
                            enterFromClass: 'hidden', 
                            enterActiveClass: 'animate-slidedown',  
                            leaveActiveClass: 'animate-slideup', 
                            leaveToClass: 'hidden', 
                            hideOnOutsideClick: true }"
                        type="button"
                        class="p-link layout-topbar-button layout-topbar-button-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator class="box2 fadein transition-duration-500 overflow-hidden"  />
                </div>
            </div>

<!--             <button
                class="p-link layout-topbar-menu-button layout-topbar-button"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>
 -->
            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="p-link layout-topbar-button">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="p-link layout-topbar-button">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="p-link layout-topbar-button">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
