<template>
    <div class="card">
        <div class="flex justify-content-between mb-1">
            <div>
                <span class="block text-500 font-medium mb-3">{{ title }}</span>
                <div class="text-900 font-medium text-xl">{{ content }}</div>
            </div>
            <div :class="`flex align-items-center justify-content-center bg-${color}-100 border-round`" style="width: 2.5rem; height: 2.5rem">
                <i :class="[icon, `text-${color}-500`, 'text-xl']"></i>
            </div>
        </div>
        <span class="text-green-500 font-medium">{{`${suffix} ` }}</span>
        <span class="text-500">{{text}}</span>
    </div>
</template>

<script setup lang="ts">


interface Props {
    title: string | null;
    content: string | null;
    icon: string | null;
    color: string | null;
    suffix: string | null;
    text: string | null;

}

const props = withDefaults(defineProps<Props>(), {
    title: "Lorem",
    content: "lorem ipsum",
    icon: "pi pi-comment",
    color: null,
    suffix: null,
    text: null
});
</script>

<style scoped>

</style>