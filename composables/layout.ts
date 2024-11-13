import { computed, reactive, readonly } from 'vue';

const layoutConfig : LayoutConfig = reactive({
    ripple: true,
    darkTheme: false,
    inputStyle: 'outlined',
    theme: '',
    scale: 14,
    activeMenuItem: '', 
    //
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    menuMode: 'static'
});

const layoutState : LayoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    //activeMenuItem: null
});

export function useLayout() {


    watch(
        layoutConfig, 
        () => {
            const newLayout: LayoutConfig = {
                ripple: layoutConfig.ripple,
                darkTheme: layoutConfig.darkTheme,
                inputStyle: layoutConfig.inputStyle,
                menuMode: layoutConfig.menuMode,
                theme: layoutConfig.theme,
                scale: layoutConfig.scale,
                activeMenuItem: layoutConfig.activeMenuItem,
                preset: layoutConfig.preset,
                primary: layoutConfig.primary,
                surface: layoutConfig.surface,
            };
            currentLayout.value = newLayout;
            localStorage.setItem('layoutConfig', JSON.stringify(newLayout));
        }, 
        { deep: true }
    );
    const currentLayout = ref({ ...layoutConfig})


    const setPrimary = (value: string) => {
        layoutConfig.primary = value;
    };

    const setSurface = (value: string) => {
        layoutConfig.surface = value;
    };

    const setPreset = (value: string) => {
        layoutConfig.preset = value;
    };

    const setActiveMenuItem = (item: any) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const setMenuMode = (mode: string) => {
        layoutConfig.menuMode = mode;
    };

    const toggleDarkMode = () => {
        if (!document.startViewTransition) {
            executeDarkModeToggle();

            return;
        }

        document.startViewTransition(() => executeDarkModeToggle(/* event */));
    };

    const executeDarkModeToggle = () => {
        layoutConfig.darkTheme = !layoutConfig.darkTheme;
        document.documentElement.classList.toggle('app-dark');
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const resetMenu = () => {
        layoutState.overlayMenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
    };

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    const getPrimary = computed(() => layoutConfig.primary);

    const getSurface = computed(() => layoutConfig.surface);

    const getLayoutConfig = () => {
        const layoutFormStorage = localStorage.getItem('layoutConfig');
        return JSON.parse(layoutFormStorage!)
    }

    return { 
        layoutConfig: toRefs(layoutConfig),
        layoutState: toRefs(layoutState),
        onMenuToggle, 
        isSidebarActive, 
        isDarkTheme, 
        getPrimary, 
        getSurface, 
        setActiveMenuItem, 
        toggleDarkMode, 
        setPrimary, 
        setSurface, 
        setPreset, 
        resetMenu, 
        setMenuMode,
        currentLayout,
        getLayoutConfig
    };
}
