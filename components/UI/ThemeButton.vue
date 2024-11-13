<template>
    <div>
        <Button v-tooltip.left="tooltip"
            :class="[
                'bg-transparent border-1 cursor-pointer p-2 w-full flex align-items-center justify-content-center transition-all transition-duration-200',
                { 'border-primary': isThemeActive, 'hover:border-500 surface-border': !isThemeActive }
            ]"
            style="border-radius: 30px"
            @click="handleChangeTheme()"
        >
            <span class="block h-1rem" :style="style"></span>
        </Button>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    theme: {
        type: String,
        required: true,
        default: "aura",
    },
    color: {
        type: String,
        required: true,
        default: "green",
    },
    linearGradient: {
        type: String,
        required: true,
        default: "#4dac9c 0%, rgba(77, 172, 156, 0.5)",
    }
});

const emit = defineEmits(['themeChanged'])

const tooltip = computed(() => CapitalizeFirstLetter(props.color));

const { layoutConfig, currentLayout } = useLayout();
const { compactMaterial, onDarkModeChange, changeTheme, onInputStyleChange, onMenuModeChange, onRippleChange } = useThemes(layoutConfig);

const style = computed(() => `border-radius: 30px; background: linear-gradient(180deg, ${props.linearGradient} 100%)`);

const isThemeActive = computed(() => {
    let themeName;
    let themePrefix = props.theme === 'md' && compactMaterial.value ? 'mdc' : props.theme;

    themeName = themePrefix + (layoutConfig.darkTheme.value ? '-dark' : '-light');

    if (props.color) {
        themeName += '-' + props.color;
    }

    return layoutConfig.theme.value === themeName;
});

const handleChangeTheme = async () => {
    changeTheme(props.theme, props.color)
    emit('themeChanged')
}


</script>

<style scoped>
span {
    width: 42px;
}

/* Button {
    width: 60px;
} */
</style>