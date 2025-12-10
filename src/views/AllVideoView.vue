<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/axios'

const videos = ref([])
const loading = ref(true)
const currentPage = ref(1)
const lastPage = ref(1)

// ডাটা আনার ফাংশন
const fetchVideos = async (page = 1) => {
  loading.value = true
  try {
    const response = await api.get(`/api/videos?page=${page}`)
    videos.value = response.data.data

    if (response.data.meta) {
      currentPage.value = response.data.meta.current_page
      lastPage.value = response.data.meta.last_page
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchVideos(page)
  }
}

onMounted(() => {
  fetchVideos()
})
</script>

<template>
  <!-- ✅ FIX: pt-24 (Mobile) এবং md:pt-28 (PC) প্যাডিং যোগ করা হয়েছে -->
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300 pt-24 md:pt-28"
  >
    <AppHeader />

    <div class="container mx-auto px-4 py-10 md:py-10 flex-grow">
      <h1 class="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        ভিডিও গ্যালারী
      </h1>

      <!-- ১. স্কেলেটন লোডার (Skeleton Loader) -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div
          v-for="n in 8"
          :key="n"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse border border-gray-100 dark:border-gray-700"
        >
          <div class="aspect-video bg-gray-300 dark:bg-gray-700"></div>
          <div class="p-4 space-y-2">
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- ২. আসল কন্টেন্ট -->
      <div v-else>
        <!-- Video Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="video in videos"
            :key="video.id"
            class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-transparent dark:border-gray-700"
          >
            <!-- Video Embed -->
            <div class="aspect-video w-full">
              <iframe
                class="w-full h-full"
                :src="`https://www.youtube.com/embed/${video.youtube_code}`"
                title="YouTube video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>

            <!-- Title -->
            <div class="p-4">
              <h3
                class="font-semibold text-gray-800 dark:text-gray-200 line-clamp-2"
                :title="video.title"
              >
                {{ video.title }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Pagination Buttons -->
        <div v-if="lastPage > 1" class="flex justify-center items-center space-x-4">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            &larr; আগের পেজ
          </button>

          <span class="text-gray-600 dark:text-gray-400 font-medium">
            পেজ {{ currentPage }} / {{ lastPage }}
          </span>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === lastPage"
            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            পরের পেজ &rarr;
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="videos.length === 0" class="text-center py-20 text-gray-400 dark:text-gray-500">
          <span class="material-icons text-4xl mb-2">videocam_off</span>
          <p>কোনো ভিডিও পাওয়া যায়নি।</p>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
