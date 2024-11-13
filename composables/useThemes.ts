import { usePrimeVue } from 'primevue/config';
import type { ToRefs } from 'vue';

export function useThemes(layoutConfig: ToRefs<LayoutConfig>) {
    
    const $primevue = usePrimeVue();
    const compactMaterial = ref(false);

    const setDefaultLayout = () => {
        onRippleChange(true)
        onChangeTheme('aura-light-green', false)
        onInputStyleChange('outlined');
        onMenuModeChange('static')
    }

    const onLayoutConfigChange = (_layoutConfig: LayoutConfig) => {
        onChangeTheme(_layoutConfig.theme, _layoutConfig.darkTheme)
        onInputStyleChange(_layoutConfig.inputStyle)
        onMenuModeChange(_layoutConfig.menuMode)
        onRippleChange(_layoutConfig.ripple)
    }
    
    const onChangeTheme = (theme: string, mode: boolean) => {        
        $primevue.config.theme(layoutConfig.theme.value, theme, 'theme-css', () => {
            layoutConfig.theme.value = theme;
            layoutConfig.darkTheme.value = mode;
        });
    }; 
    
    const changeTheme = (theme: string, color: string) => {
        let newTheme, dark;
        
        newTheme = theme + '-' + (layoutConfig.darkTheme.value ? 'dark' : 'light');
        
        if (color) {
            newTheme += '-' + color;
        }
        
        if (newTheme.startsWith('md-') && compactMaterial.value) {
            newTheme = newTheme.replace('md-', 'mdc-');
        }
        if(newTheme.startsWith('fluent-') && layoutConfig.darkTheme.value === true) {
            newTheme = 'fluent-light';
            layoutConfig.darkTheme.value = false;
        }
        if(newTheme.startsWith('nova-')) {
            newTheme = color != '' ? theme + '-' + color : theme;
            layoutConfig.darkTheme.value = false;
        }
        if(newTheme.startsWith('luna')) {
            newTheme = 'luna-' + color;
            layoutConfig.darkTheme.value = true;
        }
        if(newTheme.startsWith('arya')) {
            newTheme = 'arya-' + color;
            layoutConfig.darkTheme.value = true;
        }
        if(newTheme.startsWith('saga')) {
            newTheme = 'saga-' + color;
            layoutConfig.darkTheme.value = false;
        }
        if(newTheme.startsWith('vela')) {
            newTheme = 'vela-' + color;
            layoutConfig.darkTheme.value = true;
        }
        if(newTheme.startsWith('rhea')) {
            newTheme = 'rhea';
            layoutConfig.darkTheme.value = false;
        }
        if(newTheme.startsWith('tailwind-') && layoutConfig.darkTheme.value === true) {
            newTheme = 'tailwind-light';
            layoutConfig.darkTheme.value = false;
        }
        
        dark = layoutConfig.darkTheme.value;
        
        onChangeTheme(newTheme, dark);
    };

    const onDarkModeChange = (value: boolean) => {
        if(layoutConfig.theme.value.startsWith('fluent') || layoutConfig.theme.value.startsWith('tailwind')) return
        if(layoutConfig.theme.value.startsWith('luna')) return
        if(layoutConfig.theme.value.startsWith('saga')) return
        if(layoutConfig.theme.value.startsWith('rhea')) return
        if(layoutConfig.theme.value.startsWith('vela')) return
        if(layoutConfig.theme.value.startsWith('arya')) return
        const newThemeName = value ? layoutConfig.theme.value.replace('light', 'dark') : layoutConfig.theme.value.replace('dark', 'light');
        layoutConfig.darkTheme.value = value;
        onChangeTheme(newThemeName, value);
    };

    const onInputStyleChange = (value: 'filled' | 'outlined') => {
        $primevue.config.inputStyle = value;
        layoutConfig.inputStyle.value = value;
        
    };

    const onMenuModeChange = (value: string) => {
        layoutConfig.menuMode.value = value;
    };
    
    const onRippleChange = (value: boolean) => {
        layoutConfig.ripple.value = value;
    };

    return {
        compactMaterial,
        onLayoutConfigChange,
        onChangeTheme,
        changeTheme,
        onDarkModeChange,
        onInputStyleChange,
        onMenuModeChange,
        onRippleChange,
        setDefaultLayout
    }
}