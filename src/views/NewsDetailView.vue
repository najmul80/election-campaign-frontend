<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue' // ফুটার যুক্ত করা হলো
import api from '@/axios'
import CommentSection from '@/components/CommentSection.vue'

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
  <!-- ✅ FIX: pt-24 (Mobile) & md:pt-28 (PC) যোগ করা হয়েছে -->
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300 pt-24 md:pt-28">
    
    <AppHeader />

    <!-- ১. স্কেলেটন লোডার -->
    <div v-if="loading" class="container mx-auto px-4 py-6 flex-grow animate-pulse">
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
          
          <div class="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-40"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ২. আসল কন্টেন্ট -->
    <div v-else-if="news" class="container mx-auto px-4 py-6 flex-grow">
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
            class="absolute bottom-0 left-0 bg-gradient-to-t from-black/90 to-transparent w-full p-6 pt-20"
          >
            <h1 class="text-2xl md:text-4xl font-bold text-white mb-2">{{ news.title }}</h1>
            <div class="flex items-center text-gray-300 text-sm">
              <span class="mr-4 flex items-center">
                <span class="material-icons text-sm mr-1">calendar_today</span> 
                {{ news.date }}
              </span>
              <span class="flex items-center">
                <span class="material-icons text-sm mr-1">person</span> 
                {{ news.author || 'Admin' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="p-8 md:p-12">
          <!-- Rich Text Content -->
          <div
            class="prose-content leading-relaxed text-justify"
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
        <CommentSection :blog-id="news.id" :comments="news.comments" />
      </div>
    </div>

    <!-- ৩. এরর স্টেট -->
    <div v-else class="text-center py-20 flex-grow pt-32">
      <h2 class="text-2xl text-red-500 mb-4">খবরটি পাওয়া যায়নি!</h2>
      <router-link to="/" class="text-blue-500 underline">হোমপেজে যান</router-link>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
/* ✅ FIX: ম্যানুয়াল CSS ব্যবহার করা হয়েছে যাতে কনফ্লিক্ট না হয় */

/* Light Mode Styles */
:deep(.prose-content h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: #1f2937; /* gray-800 */
}

:deep(.prose-content p) {
  margin-bottom: 1rem;
  color: #4b5563; /* gray-600 */
  line-height: 1.75;
}

:deep(.prose-content ul) {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-bottom: 1rem;
  color: #4b5563;
}

:deep(.prose-content strong) {
  font-weight: bold;
  color: #111827;
}

:deep(.prose-content a) {
  color: #16a34a;
  text-decoration: underline;
}

/* Dark Mode Overrides */
:global(.dark) :deep(.prose-content h2) {
  color: #ffffff;
}

:global(.dark) :deep(.prose-content p),
:global(.dark) :deep(.prose-content ul) {
  color: #d1d5db; /* gray-300 */
}

:global(.dark) :deep(.prose-content strong) {
  color: #ffffff;
}

:global(.dark) :deep(.prose-content a) {
  color: #4ade80;
}
</style>