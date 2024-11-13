
<template>
    <div class="flex justify-content-center">
        <Dropdown v-model="selectedCountry" disabled :options="countries" optionLabel="name" optionValue="code" placeholder="Selecciona..." class="w-full md:w-14rem">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"  
                    :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px"/>
                    <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <img :alt="slotProps.option.name" src="/demo/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px"/>
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>

<script setup lang="ts">

const countries = ref([
    { name: 'Español', code: 'es' },
    { name: 'Ingles', code: 'us' },
    { name: 'Italiano', code: 'it' },
]);

const selectedCountry = ref(countries.value[0]);
</script>
