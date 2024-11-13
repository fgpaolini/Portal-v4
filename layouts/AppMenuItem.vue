<template>
    <li :class="{ 'layout-root-menuitem': root, 'active-menuitem': isActiveMenu }">
        <div v-if="root && item.visible !== false" class="layout-menuitem-root-text">
            {{ item.label }}
        </div>
        <a v-if="(!item.to || item.items) && item.visible !== false" :href="item.url" @click="itemClick($event, item)" :class="item.class" :target="item.target" tabindex="0">
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
        </a>
        <NuxtLink v-if="item.to && !item.items && item.visible !== false" @click="itemClick($event, item)" :class="[item.class, { 'active-route': checkActiveRoute(item) }]" tabindex="0" 
            :to="item.to"
            >
            <i :class="item.icon" class="layout-menuitem-icon"></i>
            <span class="layout-menuitem-text">{{ item.label }}</span>
            <i v-if="item.items" class="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
        </NuxtLink>
        <Transition v-if="item.items && item.visible !== false" name="layout-submenu">
            <ul v-show="root ? true : isActiveMenu" class="layout-submenu">
                <app-menu-item v-for="(child, i) in item.items" :index="i" :item="child" :parentItemKey="itemKey" :root="false"></app-menu-item>
            </ul>
        </Transition>
    </li>
</template>

<script setup lang="ts">
import { useLayout } from '@/composables/layout';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { layoutState, layoutConfig, setActiveMenuItem, onMenuToggle } = useLayout();

const props = defineProps({
    item: {
        type: Object as () => MenuItem,
        default: () => ({ label: '' }) // provide a default label
    },
    index: {
        type: Number,
        default: 0
    },
    root: {
        type: Boolean,
        default: true
    },
    parentItemKey: {
        type: String,
        default: null
    }
});

const isActiveMenu = ref<boolean>(false);
const itemKey = ref<string>('');

onBeforeMount(() => {
    itemKey.value = props.parentItemKey ? props.parentItemKey + '-' + props.index : String(props.index);

    const activeItem = layoutConfig.activeMenuItem.value;
    //console.log(activeItem.value)
    isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem.startsWith(itemKey.value + '-') : false;

    //isActiveMenu.value = activeItem === itemKey.value || activeItem ? activeItem?.startsWith(itemKey.value + '-') : false;
    //isActiveMenu.value = activeItem && activeItem.value === itemKey.value || (activeItem && activeItem.value?.startsWith(itemKey.value + '-')) || false;

});

watch(
    () => layoutConfig.activeMenuItem.value,
    (newVal: any) => {
        isActiveMenu.value = newVal === itemKey.value || newVal.startsWith(itemKey.value + '-');
    }
);

const itemClick = (event: Event, item: MenuItem) => {
    if (item.disabled) {
        event.preventDefault();
        return;
    }        
    
    const { overlayMenuActive, staticMenuMobileActive } = layoutState;


    if ((item.to || item.url) && (staticMenuMobileActive.value || overlayMenuActive.value)) {
        onMenuToggle();
    }
/* 
    if (item.command) {
        item.command({ originalEvent: event, item: item });
    }
 */
    const foundItemKey = item.items ? (isActiveMenu.value ? props.parentItemKey : itemKey) : itemKey.value;

    setActiveMenuItem(foundItemKey);
}

function checkActiveRoute(item: MenuItem) {
    return route.path === item.to;
}
</script>

<style lang="scss" scoped></style>
