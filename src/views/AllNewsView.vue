<script setup>
import { ref, onMounted, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/axios'

const newsList = ref([])
const loading = ref(true)
const currentPage = ref(1)
const lastPage = ref(1)
const searchQuery = ref('') // সার্চ ইনপুট

// ডাটা আনার ফাংশন
const fetchNews = async (page = 1) => {
  loading.value = true
  try {
    const response = await api.get(`/api/news?page=${page}`)
    newsList.value = response.data.data

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
    fetchNews(page)
  }
}

// --- ফিল্টার লজিক (Frontend Filter on Current Page) ---
const filteredNews = computed(() => {
  if (!searchQuery.value) return newsList.value
  return newsList.value.filter(item => 
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.date.includes(searchQuery.value)
  )
})

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <!-- Main Wrapper -->
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300 pt-24 md:pt-28">
    
    <AppHeader />

    <div class="container mx-auto px-4 py-10 flex-grow">
      
      <!-- Title Section -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-3">সকল সংবাদ</h1>
        <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">নির্বাচন ও এলাকা ভিত্তিক সর্বশেষ আপডেট</p>
      </div>

      <!-- 🔍 Search & Filter Bar -->
      <div v-if="!loading" class="flex justify-center mb-12">
        <div class="relative w-full max-w-lg">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span class="material-icons text-green-600 dark:text-green-400">search</span>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            class="block w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full leading-5 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition shadow-sm" 
            placeholder="খবরের শিরোনাম দিয়ে খুঁজুন..." 
          />
        </div>
      </div>

      <!-- ১. স্কেলেটন লোডার -->
      <div v-if="loading" class="grid md:grid-cols-3 gap-8 mb-12">
        <div v-for="n in 6" :key="n" class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 animate-pulse">
          <div class="h-56 bg-gray-300 dark:bg-gray-700"></div>
          <div class="p-6 space-y-4">
            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 pt-2"></div>
          </div>
        </div>
      </div>

      <!-- ২. আসল কন্টেন্ট -->
      <div v-else>
        <!-- News Grid -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <div v-for="item in filteredNews" :key="item.id"
            class="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-gray-700 group hover:-translate-y-1">
            
            <!-- Image Area -->
            <div class="h-56 overflow-hidden relative">
              <img 
                :src="item.image || 'https://placehold.co/600x400'" 
                class="w-full h-full object-cover object-top transform group-hover:scale-110 transition duration-700"
              >
              <!-- Date Badge -->
              <div class="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-green-700 dark:text-green-400 shadow-md flex items-center gap-1">
                <span class="material-icons text-sm">calendar_today</span> {{ item.date }}
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                {{ item.title }}
              </h3>
              
              <!-- Author -->
              <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                <span class="material-icons text-base mr-1">person</span>
                {{ item.author || 'এডমিন' }}
              </div>

              <router-link 
                :to="{ name: 'news-detail', params: { slug: item.slug } }"
                class="inline-flex items-center text-green-600 dark:text-green-400 font-bold hover:text-green-800 dark:hover:text-green-300 transition-colors"
              >
                বিস্তারিত পড়ুন <span class="material-icons text-sm ml-1 transition-transform group-hover:translate-x-1">arrow_forward</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- No Results (Search) -->
        <div v-if="filteredNews.length === 0 && newsList.length > 0" class="text-center py-10 text-gray-500 dark:text-gray-400">
           <span class="material-icons text-5xl mb-2 text-gray-300">search_off</span>
           <p class="text-lg">"{{ searchQuery }}" দিয়ে কোনো খবর পাওয়া যায়নি।</p>
        </div>

        <!-- Pagination Buttons -->
        <div v-if="lastPage > 1" class="flex justify-center items-center space-x-4 mt-8">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span class="material-icons text-sm mr-1">arrow_back</span> আগের পেজ
          </button>

          <span class="text-gray-600 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm">
            {{ currentPage }} / {{ lastPage }}
          </span>

          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === lastPage"
            class="flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            পরের পেজ <span class="material-icons text-sm ml-1">arrow_forward</span>
          </button>
        </div>

        <!-- Empty State (No Data from API) -->
        <div v-if="newsList.length === 0 && !loading" class="text-center py-20 text-gray-400 dark:text-gray-500">
          <span class="material-icons text-6xl mb-4 opacity-50">newspaper</span>
          <p class="text-xl">কোনো সংবাদ পাওয়া যায়নি।</p>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>