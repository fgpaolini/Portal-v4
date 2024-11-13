import { defineNuxtPlugin } from '#app'
import { GridLayout, GridItem } from '@noction/vue-draggable-grid'
import '@noction/vue-draggable-grid/styles'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('GridLayout', GridLayout)
  nuxtApp.vueApp.component('GridItem', GridItem)
})
