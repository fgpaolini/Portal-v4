<script setup>
import { useLayout } from '../composables/layout';
import { ProductService } from '../services/ProductService';
import { onMounted, ref, watch } from 'vue';
import CardResumen from '@/components/CardResumen.vue'

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const products = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' }
]);

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

function setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                type: 'bar',
                label: 'Subscriptions',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                data: [4000, 10000, 15000, 4000],
                barThickness: 32
            },
            {
                type: 'bar',
                label: 'Advertising',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-300'),
                data: [2100, 8400, 2400, 7500],
                barThickness: 32
            },
            {
                type: 'bar',
                label: 'Affiliate',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                data: [4100, 5200, 3400, 7400],
                borderRadius: {
                    topLeft: 8,
                    topRight: 8
                },
                borderSkipped: true,
                barThickness: 32
            }
        ]
    };
}

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: borderColor,
                    borderColor: 'transparent',
                    drawTicks: false
                }
            }
        }
    };
}

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>

<template>
    <div class="grid nested-grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div>
                <CardResumen title="Contratos" content="1200" icon="pi pi-file" color="blue" suffix="+24" text="esta semana"/>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div>
                <CardResumen title="Contratos" content="1200" icon="pi pi-file" color="blue" suffix="+24" text="esta semana"/>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div>
                <CardResumen title="Contratos" content="1200" icon="pi pi-file" color="blue" suffix="+24" text="esta semana"/>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div>
                <CardResumen title="Contratos" content="1200" icon="pi pi-file" color="blue" suffix="+24" text="esta semana"/>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <div class=" font-semibold text-xl mb-4">Recent Sales</div>
                <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
                    <Column style="width: 15%" header="Image">
                        <template #body="slotProps">
                            <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`" :alt="slotProps.data.image" width="50" class="shadow-1" />
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true" style="width: 35%"></Column>
                    <Column field="price" header="Price" :sortable="true" style="width: 35%">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column style="width: 15%" header="View">
                        <template #body>
                            <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="card">
                <div class="flex justify-content-between align-items-center mb-6">
                    <div class="font-semibold text-xl">Best Selling Products</div>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
                        <Menu ref="menu2" :popup="true" :model="items" class="min-w-40"></Menu>
                    </div>
                </div>
                <ul class="list-none p-0 m-0">
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-6">
                        <div>
                            <span class="text-color-dark font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
                            <div class="mt-1 text-color-secondary">Clothing</div>
                        </div>
                        <div class="mt-2 md:mt-0 flex align-items-center">
                            <div class="bg-gray-300 dark:bg-gray-500 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-orange-500 h-full" style="width: 50%"></div>
                            </div>
                            <span class="text-orange-500 ml-4 font-medium">%50</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-6">
                        <div>
                            <span class="text-color-dark font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
                            <div class="mt-1 text-color-secondary">Accessories</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-5 flex align-items-center">
                            <div class="bg-gray-300 dark:bg-gray-500 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-cyan-500 h-full" style="width: 16%"></div>
                            </div>
                            <span class="text-cyan-500 ml-4 font-medium">%16</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-6">
                        <div>
                            <span class="text-color-dark font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
                            <div class="mt-1 text-color-secondary">Accessories</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-5 flex align-items-center">
                            <div class="bg-gray-300 dark:bg-gray-500 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-pink-500 h-full" style="width: 67%"></div>
                            </div>
                            <span class="text-pink-500 ml-4 font-medium">%67</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-6">
                        <div>
                            <span class="text-color-dark font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
                            <div class="mt-1 text-color-secondary">Office</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-5 flex align-items-center">
                            <div class="bg-gray-300 dark:bg-gray-500 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-green-500 h-full" style="width: 35%"></div>
                            </div>
                            <span class="text-primary ml-4 font-medium">%35</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-6">
                        <div>
                            <span class="text-color-dark font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
                            <div class="mt-1 text-color-secondary">Accessories</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-5 flex align-items-center">
                            <div class="bg-gray-300 dark:bg-gray-500 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-purple-500 h-full" style="width: 75%"></div>
                            </div>
                            <span class="text-purple-500 ml-4 font-medium">%75</span>
                        </div>
                    </li>
                    <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between">
                        <div>
                            <span class="text-color-dark font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
                            <div class="mt-1 text-color-secondary">Clothing</div>
                        </div>
                        <div class="mt-2 md:mt-0 ml-0 md:ml-5 flex align-items-center">
                            <div class="bg-gray-300 dark:bg-gray-500 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                                <div class="bg-teal-500 h-full" style="width: 40%"></div>
                            </div>
                            <span class="text-teal-500 ml-4 font-medium">%40</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-12">
                    <div class="card">
                        <div class="font-semibold text-xl mb-4">Team Members</div>
                        <ul class="list-none p-0 m-0">
                            <li class="flex align-items-center py-3 px-2 border-top-1 border-color surface-border">
                                <img src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" style="width: 45px; height: 45px" />
                                <div class="text-color-secondary line-height-3">
                                    <span class="text-color-dark font-medium block">Amy Elsner</span>
                                    CEO
                                </div>
                                <Button icon="pi pi-plus" type="button" class="ml-auto p-button-rounded p-button-text"></Button>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 border-color surface-border">
                                <img src="https://primefaces.org/cdn/primevue/images/avatar/annafali.png" class="mr-2" style="width: 45px; height: 45px" />
                                <div class="text-color-secondary line-height-3">
                                    <span class="text-color-dark font-medium block">Anna Fali</span>
                                    CFO
                                </div>
                                <Button icon="pi pi-plus" type="button" class="ml-auto p-button-rounded p-button-text"></Button>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 border-color surface-border">
                                <img src="https://primefaces.org/cdn/primevue/images/avatar/ivanmagalhaes.png" class="mr-2" style="width: 45px; height: 45px" />
                                <div class="text-color-secondary line-height-3">
                                    <span class="text-color-dark font-medium block">Ivan Magalhaes</span>
                                    CTO
                                </div>
                                <Button icon="pi pi-plus" type="button" class="ml-auto p-button-rounded p-button-text"></Button>
                            </li>
                            <li class="flex align-items-center py-3 px-2 border-top-1 border-color surface-border">
                                <img src="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" class="mr-2" style="width: 45px; height: 45px" />
                                <div class="text-color-secondary line-height-3">
                                    <span class="text-color-dark font-medium block">Xu Xuefeng</span>
                                    CDO
                                </div>
                                <Button icon="pi pi-plus" type="button" class="ml-auto p-button-rounded p-button-text"></Button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-12">
                    <div class="card">
                        <div class="flex justify-content-between align-items-center mb-4">
                            <div class="font-semibold text-xl">Top Performers</div>
                            <div>
                                <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu.toggle($event)"></Button>
                                <Menu ref="menu" :popup="true" :model="items" class="min-w-40"></Menu>
                            </div>
                        </div>
                        <ul class="list-none p-0 m-0">
                            <li class="flex align-items-center pb-3">
                                <div class="relative">
                                    <img src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-3" style="width: 45px; height: 45px" />
                                    <span class="p-tag p-tag-circle p-tag-primary absolute -top-2 -right-2">1</span>
                                </div>
                                <div class="text-color-secondary line-height-3">
                                    <span class="text-color-dark font-medium block">Amy Elsner</span>
                                    24k Sales
                                </div>
                                <Button icon="pi pi-plus" type="button" class="ml-auto p-button-rounded p-button-text"></Button>
                            </li>
                            <li class="flex align-items-center py-3">
                                <div class="relative">
                                    <img src="https://primefaces.org/cdn/primevue/images/avatar/annafali.png" class="mr-3" style="width: 45px; height: 45px" />
                                    <span class="p-tag p-tag-circle p-tag-primary absolute -top-2 -right-2">2</span>
                                </div>
                                <div class="text-color-secondary line-height-3">
                                    <span class="text-color-dark font-medium block">Anna Fali</span>
                                    23k Sales
                                </div>
                                <Button icon="pi pi-plus" type="button" class="ml-auto p-button-rounded p-button-text"></Button>
                            </li>
                            <li class="flex align-items-center py-3">
                                <div class="relative">
                                    <img src="https://primefaces.org/cdn/primevue/images/avatar/ivanmagalhaes.png" class="mr-3" style="width: 45px; height: 45px" />
                                    <span class="p-tag p-tag-circle p-tag-primary absolute -top-2 -right-2">3</span>
                                </div>
                                <div class="text-color-secondary line-height-3">
                                    <span class="text-color-dark font-medium block">Ivan Magalhaes</span>
                                    20k Sales
                                </div>
                                <Button icon="pi pi-plus" type="button" class="ml-auto p-button-rounded p-button-text"></Button>
                            </li>
                            <li class="flex align-items-center pt-3">
                                <div class="relative">
                                    <img src="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" class="mr-3" style="width: 45px; height: 45px" />
                                    <span class="p-tag p-tag-circle p-tag-primary absolute -top-2 -right-2">4</span>
                                </div>
                                <div class="text-color-secondary line-height-3">
                                    <span class="text-color-dark font-medium block">Xu Xuefeng</span>
                                    19k Sales
                                </div>
                                <Button icon="pi pi-plus" type="button" class="ml-auto p-button-rounded p-button-text"></Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>