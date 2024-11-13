<template>

    <Sidebar v-model:visible="layoutState.configSidebarVisible.value" position="right" class="layout-config-sidebar w-26rem" pt:closeButton="ml-auto mr-4">
        <Toast/>
        <div class="p-2">  
            <section class="pb-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                <span class="text-xl font-semibold">Idioma</span>
                <div class="flex align-items-center gap-2 py-1 px-2">
                    <AppLang/>  
                </div>
            </section>
            <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                <span class="text-xl font-semibold">Tamaño</span>
                <div class="flex align-items-center gap-2 border-1 surface-border py-1 px-2" style="border-radius: 30px">
                    <Button icon="pi pi-minus" @click="()=> handleChange(decrementScale)" text rounded :disabled="layoutConfig.scale.value === scales[0]" />
                    <i v-for="s in scales" :key="s" :class="['pi pi-circle-fill text-sm text-200', { 'text-lg text-primary': s === layoutConfig.scale.value }]" />
                    <Button icon="pi pi-plus" @click="()=> handleChange(incrementScale)" text rounded :disabled="layoutConfig.scale.value === scales[scales.length - 1]" />
                </div>
            </section>

            <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                <span :class="['text-xl font-semibold']">Modo Oscuro</span>
                <InputSwitch :modelValue="layoutConfig.darkTheme.value" @update:modelValue="(value: boolean) => handleChange(()=> onDarkModeChange(value))" />
            </section>

            <template v-if="!simple">
                <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                    <span class="text-xl font-semibold">Menu</span>
                    <SelectButton :modelValue="layoutConfig.menuMode.value" @update:modelValue="(value: string) => handleChange(() => onMenuModeChange(value))" :options="menuModes" optionLabel="label" optionValue="value" :allowEmpty="false" />
                </section>

                <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                    <span class="text-lg font-semibold">Variante Input</span>
                    <SelectButton :modelValue="inputStyle" @update:modelValue="(value: any) => handleChange(() => onInputStyleChange(value))" :options="inputStyles" optionLabel="label" optionValue="value" :allowEmpty="false" />
                </section>
            </template>

            <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
                <span class="text-xl font-semibold">Efecto Ripple</span>
                <InputSwitch :modelValue="layoutConfig.ripple.value" @update:modelValue="(value: boolean) => handleChange(() => onRippleChange(value))" />
            </section>

            <section class="py-4 border-bottom-1 surface-border">
                <div class="text-xl font-semibold mb-3">Temas</div>
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/aura.png" alt="Aura" style="width: 1.5rem" />
                    <span class="font-medium">Aura</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3 mb-3">
                    <UIThemeButton
                        theme="aura"
                        color="green"
                        linearGradient="#4dac9c 0%, rgba(77, 172, 156, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="aura"
                        color="cyan"
                        linearGradient="#06b6d4 0%, rgba(6, 182, 212, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="aura"
                        color="blue"
                        linearGradient="#4378e6 0%, rgba(67, 120, 230, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="aura"
                        color="indigo"
                        linearGradient="#585fe0 0%, rgba(88, 95, 224, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                </div>
                <div class="flex align-items-center justify-content-between gap-3 mb-3">
                    <UIThemeButton
                        theme="aura"
                        color="purple"
                        linearGradient="#7758e4 0%, rgba(119, 88, 228, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="aura"
                        color="amber"
                        linearGradient="#f59e0b 0%, rgba(245, 158, 11, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="aura"
                        color="teal"
                        linearGradient="#14b8a6 0%, rgba(20, 184, 166, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="aura"
                        color="pink"
                        linearGradient="#ec4899 0%, rgba(236, 72, 153, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="aura"
                        color="noir"
                        linearGradient="#0f172a 0%, rgba(0, 0, 0, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="aura"
                        color="lime"
                        linearGradient="#84cc16 0%, rgb(132, 204, 22, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <span class="w-3"></span>
                    <span class="w-3"></span>
                </div>

                <section class="pt-4 flex align-items-center justify-content-between">
                    <span class="text-sm">Primary Focus Ring</span>
                    <InputSwitch :modelValue="primaryFocusRing" @update:modelValue="onFocusRingColorChange" />
                </section>
            </section>

            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/lara-light-teal.png" alt="Lara" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Lara</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3 mb-3">
                    <UIThemeButton
                        theme="lara"
                        color="green"
                        linearGradient="#4dac9c 0%, rgba(77, 172, 156, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="lara"
                        color="cyan"
                        linearGradient="#06b6d4 0%, rgba(6, 182, 212, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="lara"
                        color="blue"
                        linearGradient="#4378e6 0%, rgba(67, 120, 230, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="lara"
                        color="indigo"
                        linearGradient="#585fe0 0%, rgba(88, 95, 224, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="lara"
                        color="purple"
                        linearGradient="#7758e4 0%, rgba(119, 88, 228, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="lara"
                        color="amber"
                        linearGradient="#f59e0b 0%, rgba(245, 158, 11, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="lara"
                        color="teal"
                        linearGradient="#14b8a6 0%, rgba(20, 184, 166, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="lara"
                        color="pink"
                        linearGradient="#ec4899 0%, rgba(236, 72, 153, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                </div>
            </section>
            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/bootstrap4-light-blue.svg" alt="Bootstrap" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Bootstrap</span>
                    <div class="w-2"></div>
                    <img src="/layout/images/themes/rhea.png" alt="Rhea" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Rhea</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="bootstrap4"
                        color="blue"
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="bootstrap4"
                        color="purple"
                        linearGradient="#702f92 0%, rgba(112, 47, 146, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="rhea"
                        color=""
                        linearGradient="#7B95A3 0%, rgba(123, 149, 163, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <div class="w-3"></div>
                </div>
            </section>
            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/md-light-indigo.svg" alt="Material Design" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Material</span>
                    <div class="ml-auto flex align-items-center gap-2">
                        <label for="material-condensed" class="text-sm">Condensed</label>
                        <InputSwitch inputId="material-condensed" :modelValue="compactMaterial" @update:modelValue="onCompactMaterialChange" class="ml-auto" />
                    </div>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="md"
                        color="indigo"
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="md"
                        color="deeppurple"
                        linearGradient="#702f92 0%, rgba(112, 47, 146, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <div class="w-3"></div>
                    <div class="w-3"></div>
                </div>
            </section>
            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/fluent-light.png" alt="Fluent UI" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Fluent</span>
                    <div class="w-2"></div>
                    <img src="/layout/images/themes/tailwind-light.png" alt="Tailwind" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Tailwind</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="fluent"
                        color=""
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <div class="w-3"></div>
                    <UIThemeButton
                        theme="tailwind"
                        color=""
                        linearGradient="#702f92 0%, rgba(112, 47, 146, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <div class="w-3"></div>
                </div>
            </section>
            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/luna-blue.png" alt="Luna" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Luna</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="luna"
                        color="green"
                        linearGradient="#4dac9c 0%, rgba(77, 172, 156, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="luna"
                        color="blue"
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="luna"
                        color="amber"
                        linearGradient="#f59e0b 0%, rgba(245, 158, 11, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="luna"
                        color="pink"
                        linearGradient="#ec4899 0%, rgba(236, 72, 153, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                </div>
            </section>
            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/arya-green.png" alt="Material Design" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Arya</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="arya"
                        color="green"
                        linearGradient="#4dac9c 0%, rgba(77, 172, 156, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="arya"
                        color="blue"
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="arya"
                        color="purple"
                        linearGradient="#7758e4 0%, rgba(119, 88, 228, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="arya"
                        color="orange"
                        linearGradient="#f97316 0%, rgba(251, 146, 60, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                </div>
            </section>
            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/nova.png" alt="Nova" class="border-circle" style="width: 1.5rem" />
                    <span class="font-medium">Nova</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="nova"
                        color=""
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 0.1)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="nova"
                        color="alt"
                        linearGradient="#0f172a 0%, rgba(0, 0, 0, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="nova"
                        color="accent"
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 1)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <div class="w-3"></div>
                </div>
            </section>
            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/saga-green.png" alt="Saga" style="width: 1.5rem" />
                    <span class="font-medium">Saga</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="saga"
                        color="green"
                        linearGradient="#4dac9c 0%, rgba(77, 172, 156, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="saga"
                        color="blue"
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="saga"
                        color="purple"
                        linearGradient="#7758e4 0%, rgba(119, 88, 228, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="saga"
                        color="orange"
                        linearGradient="#f97316 0%, rgba(251, 146, 60, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                </div>
            </section>
            <section class="py-4 border-bottom-1 surface-border">
                <div class="flex align-items-center gap-2 mb-3">
                    <img src="/layout/images/themes/saga-purple.png" alt="vela" style="width: 1.5rem" />
                    <span class="font-medium">Vela</span>
                </div>
                <div class="flex align-items-center justify-content-between gap-3">
                    <UIThemeButton
                        theme="vela"
                        color="green"
                        linearGradient="#4dac9c 0%, rgba(77, 172, 156, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="vela"
                        color="blue"
                        linearGradient="#0565f2 0%, rgba(5, 101, 242, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="vela"
                        color="purple"
                        linearGradient="#7758e4 0%, rgba(119, 88, 228, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                    <UIThemeButton
                        theme="vela"
                        color="orange"
                        linearGradient="#f97316 0%, rgba(251, 146, 60, 0.5)"
                        @theme-changed="handleChange"
                    ></UIThemeButton>
                </div>
            </section>
        </div>
    </Sidebar>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
//import ThemeButton from '~/components/UI/ThemeButton.vue';
const { $toast, $api } = useNuxtApp()


defineProps({
    simple: {
        type: Boolean,
        default: false
    }
});

const showToast = () => {
    $toast.add({
        severity: 'success',
        summary: 'Interfaz',
        detail: 'Persolanización guardada.',
        life: 3000
    })
}

const $primevue = usePrimeVue();
const inputStyle = computed(() => $primevue.config.inputStyle || 'outlined');

const scales = ref([12, 13, 14, 15, 16]);
const visible = ref(false);
const inputStyles = ref([
    { label: 'Outlined', value: 'outlined' },
    { label: 'Filled', value: 'filled' }
]);

const menuModes = ref([
    { label: 'Static', value: 'static' },
    { label: 'Overlay', value: 'overlay' }
]);

const primaryFocusRing = ref(true);

const { layoutConfig, layoutState, currentLayout, getLayoutConfig  } = useLayout();
const { compactMaterial, onDarkModeChange, changeTheme, onInputStyleChange, onMenuModeChange, onRippleChange } = useThemes(layoutConfig);

const preferencia = computed(() =>{
    return {
        TipoPreferencia: 'layoutConfig',
        Preferencia: currentLayout.value
    } as ApplicationPreference<any>
});

const { data, status, execute } = await $api.preferences.savePreference(preferencia, { immediate: false})

const handleChange = async (changeFunc?: Function) => {
    if (changeFunc) {
        changeFunc();
    }
    setTimeout(async () => {        
        await execute();
        showToast();
    }, 500);
}

const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
    showToast()
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};

const setScale = (scale: number) => {
    layoutConfig.scale.value = scale;
};

const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};


const isThemeActive = (themeFamily: string, color: string) => {
    let themeName;
    let themePrefix = themeFamily === 'md' && compactMaterial.value ? 'mdc' : themeFamily;

    themeName = themePrefix + (layoutConfig.darkTheme.value ? '-dark' : '-light');

    if (color) {
        themeName += '-' + color;
    }

    return layoutConfig.theme.value === themeName;
};

const onCompactMaterialChange = (value: boolean) => {
    compactMaterial.value = value;

    if (layoutConfig.theme.value.startsWith('md')) {
        let tokens = layoutConfig.theme.value.split('-');

        changeTheme(tokens[0].substring(0, 2), tokens[2]);
    }
};

const onFocusRingColorChange = (value: boolean) => {
    primaryFocusRing.value = value;
    let root = document.documentElement;

    if (value) {
        if (layoutConfig.darkTheme.value) root.style.setProperty('--p-focus-ring-color', 'var(--primary-500)');
        else root.style.setProperty('--p-focus-ring-color', 'var(--primary-500)');
    } else {
        if (layoutConfig.darkTheme.value) root.style.setProperty('--p-focus-ring-color', 'var(--surface-500)');
        else root.style.setProperty('--p-focus-ring-color', 'var(--surface-900)');
    }
};


</script>
