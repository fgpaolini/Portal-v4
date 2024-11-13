<template>
    <div >
        <NuxtLoadingIndicator />
        <div class="layout-main-container ">
            <div class="layout-main">
                <NuxtPage />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
//const { layoutConfig, layoutState } = useLayout();


/* const containerClass = computed(() => {
    return {
        'layout-theme-light': layoutConfig.darkTheme.value === false,
        'layout-theme-dark': layoutConfig.darkTheme.value === true,
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-ripple-disabled': layoutConfig.ripple.value === false
    };
}); */
</script>