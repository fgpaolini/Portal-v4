<script setup>
import AppConfigurator from '@/layouts/AppConfigurator.vue';
import { useLayout } from '../composables/layout.js';

const { toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="fixed flex">
        <Button type="button" @click="toggleDarkMode" rounded :icon="{ 'pi pi-moon': isDarkTheme, 'pi pi-sun': !isDarkTheme }" severity="secondary" />
        <div class="relative">
            <Button
                icon="pi pi-palette"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                type="button"
                rounded
            />
            <AppConfigurator />
        </div>
    </div>
</template>
