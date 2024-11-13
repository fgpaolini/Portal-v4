<script setup lang="ts">
import AppConfigurator from '~/layouts/AppConfigurator.vue';
import { useLayout } from '@/composables/layout';

const { toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="fixed flex gap-2 top-1 right-0 mb-7 mr-5">
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
