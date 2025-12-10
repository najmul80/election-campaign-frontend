<script setup>
import { ref, onMounted, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/axios'

const gallery = ref([])
const loading = ref(true)

// ডাউনলোড ফাংশন (রিইউজেবল)
const downloadPoster = async (imageUrl, imageName) => {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = imageName || 'poster.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
    window.open(imageUrl, '_blank')
  }
}

// শুধুমাত্র পোস্টারগুলো ফিল্টার করা
const posters = computed(() => {
  return gallery.value.filter((item) => item.category === 'poster' || item.category === 'campaign')
})

onMounted(async () => {
  try {
    // গ্যালারির সব ডাটা এনে ফ্রন্টএন্ডে ফিল্টার করা হচ্ছে
    // (অথবা আপনি ব্যাকএন্ডে আলাদা API বানাতে পারেন)
    const response = await api.get('/api/gallery')
    gallery.value = response.data.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300 pt-24 md:pt-28"
  >
    <AppHeader />

    <div class="container mx-auto px-4 py-10 flex-grow">
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
          সকল ডিজিটাল পোস্টার
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          প্রচারের জন্য পোস্টারগুলো ডাউনলোড করে শেয়ার করুন
        </p>
      </div>

      <!-- ১. স্কেলেটন লোডার -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="n in 8"
          :key="n"
          class="h-[350px] bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"
        ></div>
      </div>

      <!-- ২. আসল কন্টেন্ট -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="item in posters"
          :key="item.id"
          class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300"
        >
          <!-- Image -->
          <div class="h-[350px] overflow-hidden bg-gray-100 dark:bg-gray-900">
            <img
              :src="item.image"
              :alt="item.caption"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4"
          >
            <p class="text-white text-center text-sm mb-4 font-semibold">
              {{ item.caption }}
            </p>
            <button
              @click="downloadPoster(item.image, `poster_${item.id}.jpg`)"
              class="bg-green-600 text-white px-4 py-2 rounded-full font-bold flex items-center hover:bg-green-500 transition shadow-lg transform hover:scale-105"
            >
              <span class="material-icons text-sm mr-2">download</span> ডাউনলোড
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && posters.length === 0"
        class="text-center py-20 text-gray-400 dark:text-gray-500"
      >
        <span class="material-icons text-4xl mb-2">image_not_supported</span>
        <p>কোনো পোস্টার পাওয়া যায়নি।</p>
      </div>
    </div>

    <AppFooter />
  </div>
</template>
