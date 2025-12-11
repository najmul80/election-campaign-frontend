<script setup>
import { ref, onMounted, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/axios'

const gallery = ref([])
const loading = ref(true)
const currentPage = ref(1)
const lastPage = ref(1)

// --- ফিল্টার লজিক ---
const selectedCategory = ref('all')
const categories = [
  { label: 'সব ছবি', value: 'all' },
  { label: 'জনসভা', value: 'rally' },
  { label: 'প্রচারণা', value: 'campaign' },
  { label: 'মিটিং', value: 'meeting' },
]

// --- লাইটবক্স (Image Viewer) লজিক ---
const isLightboxOpen = ref(false)
const currentImage = ref(null)

const openLightbox = (item) => {
  currentImage.value = item
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden' // স্ক্রল বন্ধ
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  currentImage.value = null
  document.body.style.overflow = 'auto' // স্ক্রল চালু
}

// --- ডাটা ফেচিং ---
const fetchGallery = async (page = 1) => {
  loading.value = true
  try {
    const response = await api.get(`/api/gallery?page=${page}`)
    
    // পোস্টার বাদ দিয়ে বাকি ডাটা লোড করা
    const allData = response.data.data.filter((item) => item.category !== 'poster')
    gallery.value = allData

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
    fetchGallery(page)
  }
}

// --- ফিল্টারড ডাটা ---
const filteredGallery = computed(() => {
  if (selectedCategory.value === 'all') return gallery.value
  return gallery.value.filter(item => item.category === selectedCategory.value)
})

onMounted(() => {
  fetchGallery()
})
</script>

<template>
  <!-- Main Wrapper -->
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300 pt-24 md:pt-28">
    <AppHeader />

    <div class="container mx-auto px-4 py-10 flex-grow">
      
      <!-- Title Section -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-3">
          ফটো গ্যালারী
        </h1>
        <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">নির্বাচনী প্রচারণার কিছু বিশেষ মুহূর্ত</p>
      </div>

      <!-- 🔍 Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button 
          v-for="cat in categories" 
          :key="cat.value"
          @click="selectedCategory = cat.value"
          class="px-6 py-2 rounded-full font-medium transition-all duration-300 border"
          :class="selectedCategory === cat.value 
            ? 'bg-green-600 text-white border-green-600 shadow-lg scale-105' 
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-green-500'"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- ১. স্কেলেটন লোডার -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
        <div v-for="n in 12" :key="n" class="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      </div>

      <!-- ২. আসল কন্টেন্ট -->
      <div v-else>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          <div
            v-for="item in filteredGallery"
            :key="item.id"
            @click="openLightbox(item)"
            class="group relative h-64 rounded-xl overflow-hidden cursor-zoom-in shadow-md border border-transparent dark:border-gray-700"
          >
            <img
              :src="item.image"
              :alt="item.caption"
              class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
            />

            <!-- Overlay with Icon -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4">
              <span class="material-icons text-white text-3xl mb-2 scale-0 group-hover:scale-100 transition duration-300 delay-100">visibility</span>
              <p class="text-white text-center text-sm font-medium translate-y-4 group-hover:translate-y-0 transition duration-300">{{ item.caption }}</p>
            </div>
            
            <!-- Category Badge (Top Left) -->
            <div class="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition duration-300">
               {{ item.category }}
            </div>
          </div>
        </div>

        <!-- Pagination Buttons -->
        <div v-if="lastPage > 1" class="flex justify-center items-center space-x-4">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            &larr; আগের পেজ
          </button>
          
          <span class="text-gray-600 dark:text-gray-400 font-medium">
            পেজ {{ currentPage }} / {{ lastPage }}
          </span>
          
          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === lastPage"
            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            পরের পেজ &rarr;
          </button>
        </div>

        <!-- ৩. ডাটা না থাকলে -->
        <div
          v-if="filteredGallery.length === 0"
          class="text-center py-20 text-gray-400 dark:text-gray-500"
        >
          <span class="material-icons text-5xl mb-3 opacity-50">photo_library</span>
          <p class="text-lg">এই ক্যাটাগরিতে কোনো ছবি পাওয়া যায়নি।</p>
        </div>
      </div>
    </div>

    <AppFooter />

    <!-- 🌟 Lightbox Modal (Full Screen Image View) -->
    <div v-if="isLightboxOpen" class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" @click="closeLightbox">
       
       <!-- Close Button -->
       <button @click="closeLightbox" class="absolute top-5 right-5 text-white/70 hover:text-white transition p-2 bg-white/10 rounded-full">
         <span class="material-icons text-3xl">close</span>
       </button>

       <!-- Image Container -->
       <div class="max-w-5xl max-h-[90vh] relative" @click.stop>
          <img :src="currentImage.image" :alt="currentImage.caption" class="max-w-full max-h-[85vh] rounded-lg shadow-2xl border border-white/20">
          <p v-if="currentImage.caption" class="text-white text-center mt-4 text-lg font-medium bg-black/50 inline-block px-4 py-2 rounded-full mx-auto w-max block">
             {{ currentImage.caption }}
          </p>
       </div>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>