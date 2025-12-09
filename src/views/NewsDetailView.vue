<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import api from '@/axios'

const route = useRoute()
const news = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get(`/api/news/${route.params.slug}`)
    news.value = response.data.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Main Wrapper: Dark Mode Background Added -->
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <AppHeader />

    <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
    <div v-if="loading" class="container mx-auto px-4 py-10 animate-pulse">
      <div
        class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-transparent dark:border-gray-700"
      >
        <!-- Featured Image Skeleton -->
        <div class="h-64 md:h-96 w-full bg-gray-300 dark:bg-gray-700 relative">
          <div class="absolute bottom-0 left-0 w-full p-6">
            <div class="h-8 bg-gray-400 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
            <div class="flex gap-4">
              <div class="h-4 bg-gray-400 dark:bg-gray-600 rounded w-24"></div>
              <div class="h-4 bg-gray-400 dark:bg-gray-600 rounded w-20"></div>
            </div>
          </div>
        </div>

        <!-- Content Skeleton -->
        <div class="p-8 md:p-12 space-y-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>

          <!-- Back Button Skeleton -->
          <div class="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-40"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ২. আসল কন্টেন্ট (Real Content) -->
    <div v-else-if="news" class="container mx-auto px-4 py-10">
      <div
        class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-transparent dark:border-gray-700 transition-colors duration-300"
      >
        <!-- Featured Image -->
        <div class="h-64 md:h-96 w-full relative">
          <img
            :src="news.image || 'https://placehold.co/800x400'"
            :alt="news.title"
            class="w-full h-full object-cover"
          />
          <!-- Gradient Overlay -->
          <div
            class="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent w-full p-6 pt-20"
          >
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{{ news.title }}</h1>
            <div class="flex items-center text-gray-200 text-sm">
              <span class="mr-4"
                ><span class="material-icons text-sm align-middle">calendar_today</span>
                {{ news.date }}</span
              >
              <span
                ><span class="material-icons text-sm align-middle">person</span>
                {{ news.author || 'Admin' }}</span
              >
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-8 md:p-12">
          <!-- Prose style handles dark mode via CSS below -->
          <div
            class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
            v-html="news.content"
          ></div>

          <!-- Back Button -->
          <div class="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
            <router-link
              to="/"
              class="inline-flex items-center text-green-700 dark:text-green-400 font-bold hover:underline transition-colors"
            >
              <span class="material-icons mr-1">arrow_back</span> হোমপেজে ফিরে যান
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ৩. এরর স্টেট -->
    <div v-else class="text-center py-20">
      <h2 class="text-2xl text-red-500 mb-4">খবরটি পাওয়া যায়নি!</h2>
      <router-link to="/" class="text-blue-500 underline">হোমপেজে যান</router-link>
    </div>
  </div>
</template>

<style scoped>
/* ✅ FIX: Tailwind Import for @apply in v4 */
@import 'tailwindcss';

/* Rich Text Dark Mode Support */
:deep(.prose h2) {
  @apply text-2xl font-bold mt-6 mb-2 text-gray-800 dark:text-white;
}

:deep(.prose p) {
  @apply mb-4 text-gray-700 dark:text-gray-300;
}

:deep(.prose ul) {
  @apply list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300;
}

:deep(.prose a) {
  @apply text-green-600 dark:text-green-400 underline;
}

:deep(.prose strong) {
  @apply font-bold text-gray-900 dark:text-white;
}
</style>
