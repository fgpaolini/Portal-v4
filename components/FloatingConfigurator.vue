<script setup lang="ts">
import AppConfigurator from '@/layouts/AppConfigurator.vue';
import { useLayout } from '@/composables/layout.js';

const { toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="fixed flex">
        <Button type="button" @click="toggleDarkMode" rounded :icon="isDarkTheme ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />
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
