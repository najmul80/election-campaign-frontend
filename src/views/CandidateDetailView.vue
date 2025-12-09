<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHomeStore } from '@/stores/homeStore'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/axios'

const route = useRoute()
const store = useHomeStore()
const candidate = ref(null)
const loading = ref(true)

const getEmbedUrl = (url) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? 'https://www.youtube.com/embed/' + match[2] : null
}

const getSymbol = () => {
  return store.settings?.logo || '/logo.png'
}

onMounted(async () => {
  try {
    const response = await api.get(`/api/candidate/${route.params.id}`)
    candidate.value = response.data.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Main Wrapper: Dark Mode Background Added -->
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300"
  >
    <AppHeader />

    <!-- Skeleton Loader (Dark Mode Supported) -->
    <div v-if="loading" class="animate-pulse container mx-auto px-4 py-12 flex-grow">
      <!-- Top Profile & Video Skeleton -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-transparent dark:border-gray-700"
      >
        <div class="md:flex">
          <!-- Left: Profile Skeleton -->
          <div
            class="md:w-1/3 bg-gray-200 dark:bg-gray-700 p-8 flex flex-col items-center justify-center h-[400px]"
          >
            <div
              class="w-48 h-48 bg-gray-300 dark:bg-gray-600 rounded-full mb-6 border-4 border-white dark:border-gray-600"
            ></div>
            <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
            <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded-full w-1/2 mb-2"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
          <!-- Right: Video Skeleton -->
          <div class="md:w-2/3 p-8">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div class="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
          </div>
        </div>
      </div>

      <!-- Biography Skeleton -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-transparent dark:border-gray-700"
      >
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
        <div class="space-y-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
        </div>
      </div>
    </div>

    <!-- Candidate Content (Dark Mode Added) -->
    <div v-else-if="candidate" class="container mx-auto px-4 py-12 flex-grow">
      <!-- Top Section: Photo & Basic Info -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-transparent dark:border-gray-700 transition-colors"
      >
        <div class="md:flex">
          <!-- Left: Photo Area (Gradient stays same, looks good in dark mode) -->
          <div
            class="md:w-1/3 bg-gradient-to-br from-green-600 to-teal-800 p-8 flex flex-col items-center justify-center text-center text-white relative"
          >
            <div class="relative mb-6">
              <!-- Candidate Image -->
              <div
                class="inline-flex items-center justify-center rounded-full border-8 border-white dark:border-gray-300"
              >
                <div class="rounded-full p-1 bg-gradient-to-r from-red-500 to-orange-500">
                  <img
                    :src="candidate.photo_url || 'https://placehold.co/300x300'"
                    class="h-44 w-44 object-cover rounded-full shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <!-- Symbol Badge -->
              <div
                class="absolute bottom-0 right-0 rounded-full p-px bg-gradient-to-r from-red-500 to-orange-500 shadow-lg w-16 h-16 flex items-center justify-center transform group-hover:rotate-12 transition duration-500 z-20"
              >
                <img
                  :src="getSymbol()"
                  class="w-14 h-14 object-contain rounded-full bg-white shadow-md"
                />
              </div>
            </div>

            <h1 class="text-3xl font-bold mb-2">{{ candidate.name }}</h1>
            <div class="bg-white/20 px-4 py-1 rounded-full mb-2">
              <p class="font-semibold">{{ candidate.constituency }}</p>
            </div>
            <p class="opacity-90">{{ candidate.designation }}</p>
          </div>

          <!-- Right: Video -->
          <div class="md:w-2/3 p-8">
            <h2
              class="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b dark:border-gray-700 pb-2"
            >
              পরিচিতি ভিডিও
            </h2>

            <div
              v-if="candidate.video_link"
              class="aspect-video rounded-lg overflow-hidden bg-black shadow-lg"
            >
              <iframe
                class="w-full h-full"
                :src="getEmbedUrl(candidate.video_link)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div
              v-else
              class="h-64 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500"
            >
              <p>ভিডিও উপলব্ধ নেই</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Biography Section -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-transparent dark:border-gray-700 transition-colors"
      >
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <span class="material-icons text-green-600 dark:text-green-400 mr-2">history_edu</span>
          জীবন বৃত্তান্ত ও ভিশন
        </h2>

        <!-- Prose style handles dark mode via CSS below -->
        <div
          class="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-justify"
          v-html="candidate.biography"
        ></div>

        <!-- Back Button -->
        <div class="mt-10 pt-6 border-t dark:border-gray-700">
          <router-link
            to="/"
            class="inline-flex items-center bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition shadow-lg"
          >
            <span class="material-icons mr-2">arrow_back</span> ফিরে যান
          </router-link>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-20 flex-grow">
      <h2 class="text-2xl text-red-500 mb-4">প্রার্থীর তথ্য পাওয়া যায়নি!</h2>
      <router-link to="/" class="text-blue-500 underline">হোমপেজে ফিরে যান</router-link>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
/* ✅ FIX: Tailwind Import Added for @apply to work in v4 */
@import 'tailwindcss';

/* Rich Text Dark Mode Support */
:deep(.prose h2) {
  @apply text-gray-800 dark:text-white font-bold mt-6 mb-2 text-2xl;
}
:deep(.prose ul) {
  @apply list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300;
}
:deep(.prose p) {
  @apply mb-4 text-gray-700 dark:text-gray-300;
}
:deep(.prose strong) {
  @apply font-bold text-gray-900 dark:text-white;
}
</style>
