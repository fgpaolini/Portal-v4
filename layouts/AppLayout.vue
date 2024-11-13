<template>
    <DynamicDialog/>
    <div class="layout-wrapper" :class="containerClass">
        <NuxtLoadingIndicator/>
        <app-topbar></app-topbar>
        <div class="layout-sidebar">
            <app-sidebar></app-sidebar>
        </div>
        <div class="layout-main-container">
            <div class="layout-main">
                <NuxtPage />
            </div>
            <app-footer></app-footer>
        </div>
        <!-- <AppConfigurator></AppConfigurator> -->
        <Toast/>
        <div class="layout-mask"></div>
    </div>  
    <Toast/>
</template>

<script setup lang="ts">
import { useLayout } from '../composables/layout';
import { computed, ref, watch } from 'vue';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';
import AppConfigurator from './AppConfigurator.vue';

const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout();

const outsideClickListener = ref<((event: MouseEvent) => void) | null>(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event: MouseEvent) => {
            if (isOutsideClicked(event)) {
                resetMenu();
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event: MouseEvent) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl?.isSameNode(event.target as Node) || sidebarEl?.contains(event.target as Node) || 
            topbarEl?.isSameNode(event.target as Node) || topbarEl?.contains(event.target as Node));
}
</script>
