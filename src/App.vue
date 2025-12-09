<script setup>
import { onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/homeStore'

const store = useHomeStore()
const { settings } = storeToRefs(store)

onMounted(() => {
  store.fetchHomeData()
})

watch(settings, (newSettings) => {
  if (newSettings) {
    document.title = newSettings.site_name || 'ইলেকশন পোর্টাল'
    if (newSettings.favicon) {
      let link = document.querySelector("link[rel~='icon']")
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.getElementsByTagName('head')[0].appendChild(link)
      }
      link.href = newSettings.favicon
    }
  }
}, { immediate: true })
</script>

<template>
  <RouterView />
</template>