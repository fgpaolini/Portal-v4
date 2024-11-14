<template>
    <div class="grid nested-grid">
        <div class="col-12 lg:col-4 xl:col-4">
            <div>
                <CardResumen title="Contratos" content="1200" icon="pi pi-file" color="blue" suffix="+24" text="esta semana"/>
            </div>
        </div>
        <div class="col-12 lg:col-4 xl:col-4">
            <div>
                <CardResumen title="Contratos" content="1200" icon="pi pi-file" color="blue" suffix="+24" text="esta semana"/>
            </div>
        </div>
        <div class="col-12 lg:col-4 xl:col-4">
            <div>
                <CardResumen title="Contratos" content="1200" icon="pi pi-file" color="blue" suffix="+24" text="esta semana"/>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import CardResumen from '@/components/CardResumen.vue'
import { useLayout } from '../composables/layout';

const { getPrimary, getSurface, isDarkTheme } = useLayout();

</script>