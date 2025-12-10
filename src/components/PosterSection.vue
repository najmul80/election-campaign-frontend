<script setup>
import { computed } from 'vue'

const props = defineProps({
  gallery: {
    type: Array,
    required: true,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// গ্যালারি থেকে শুধু 'poster' ও 'campaign' ক্যাটাগরি ফিল্টার করা
const posters = computed(() => {
  return props.gallery
    .filter((item) => item.category === 'poster' || item.category === 'campaign')
    .slice(0, 4)
})

// ডাউনলোড ফাংশন
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
</script>

<template>
  <!-- Dark/Light Mode Colors Fixed -->
  <section
    id="posters"
    class="py-12 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
  >
    <!-- Background Decor (Light mode: Subtle, Dark mode: Glowing) -->
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-green-200 dark:bg-green-600 rounded-full blur-[100px] opacity-30 dark:opacity-20 pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-64 h-64 bg-teal-200 dark:bg-teal-600 rounded-full blur-[100px] opacity-30 dark:opacity-20 pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-3 text-gray-800 dark:text-white">
          ডিজিটাল পোস্টার
        </h2>
        <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-300">
          সোশ্যাল মিডিয়ায় শেয়ার করার জন্য অফিসিয়াল পোস্টার
        </p>
      </div>

      <!-- ১. স্কেলেটন লোডার -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="n in 4"
          :key="n"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse border border-gray-100 dark:border-gray-700"
        >
          <div class="h-[350px] bg-gray-200 dark:bg-gray-700"></div>
          <div class="p-4">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- ২. মেইন পোস্টার গ্রিড -->
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="item in posters"
          :key="item.id"
          class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300"
        >
          <!-- Image -->
          <div class="h-[350px] overflow-hidden bg-gray-100 dark:bg-gray-900">
            <img
              :src="item.image"
              :alt="item.caption"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <!-- Overlay with Download Button -->
          <div
            class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4"
          >
            <p class="text-white text-center text-sm mb-4 font-semibold">
              {{ item.caption }}
            </p>

            <button
              @click="downloadPoster(item.image, `poster_${item.id}.jpg`)"
              class="bg-green-600 text-white px-4 py-2 rounded-full font-bold flex items-center hover:bg-green-500 transition transform hover:scale-105 shadow-lg"
            >
              <span class="material-icons text-sm mr-2">download</span> ডাউনলোড
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!loading && posters.length === 0"
        class="text-center py-10 text-gray-500 dark:text-gray-400"
      >
        <p>বর্তমানে কোনো পোস্টার নেই।</p>
      </div>

      <!-- ৩. সব পোস্টার দেখার বাটন -->
      <div class="text-center mt-12" v-if="!loading && posters.length > 0">
        <router-link
          to="/all-posters"
          class="inline-flex items-center text-green-600 dark:text-green-400 font-bold hover:underline text-lg transition-transform hover:translate-x-1"
        >
          সব পোস্টার দেখুন <span class="material-icons ml-1">arrow_forward</span>
        </router-link>
      </div>
    </div>
  </section>
</template>
