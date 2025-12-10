<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/axios'

const route = useRoute()
const program = ref(null)
const loading = ref(true)

const shareProgram = async () => {
  const shareData = {
    title: program.value.title,
    text: `এই গুরুত্বপূর্ণ কর্মসূচিটি দেখুন: ${program.value.title}`,
    url: window.location.href,
  }

  if (navigator.share) {
    try {
      await navigator.share(shareData)
    } catch (err) {
      console.error('শেয়ার বাতিল করা হয়েছে', err)
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('লিংক কপি করা হয়েছে! এখন আপনি পেস্ট করতে পারেন।')
    } catch (err) {
      alert('লিংক কপি করা যায়নি।')
    }
  }
}
onMounted(async () => {
  try {
    const response = await api.get(`/api/program/${route.params.id}`)
    program.value = response.data.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- ✅ FIX: pt-24 (Mobile) & md:pt-28 (PC) যোগ করা হয়েছে হেডারের গ্যাপের জন্য -->
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300 pt-24 md:pt-28"
  >
    <AppHeader />

    <!-- ১. স্কেলেটন লোডার -->
    <div v-if="loading" class="container mx-auto px-4 py-6 flex-grow animate-pulse">
      <div
        class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-transparent dark:border-gray-700"
      >
        <!-- Banner Skeleton -->
        <div class="h-64 md:h-96 bg-gray-300 dark:bg-gray-700 relative">
          <div
            class="absolute top-6 right-6 h-16 w-24 bg-gray-400 dark:bg-gray-600 rounded-lg"
          ></div>
        </div>

        <div class="p-8 md:p-12">
          <!-- Title Skeleton -->
          <div class="h-8 md:h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-8"></div>

          <!-- Info Bar Skeleton -->
          <div
            class="flex flex-col md:flex-row gap-6 mb-8 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center w-1/2">
              <div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
              <div class="space-y-2 w-full">
                <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
            <div class="flex items-center w-1/2">
              <div class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
              <div class="space-y-2 w-full">
                <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <!-- Description Skeleton -->
          <div class="space-y-4 mb-8">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>

          <!-- Action Buttons Skeleton -->
          <div
            class="border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-between items-center"
          >
            <div class="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div class="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ২. আসল কন্টেন্ট -->
    <div v-else-if="program" class="container mx-auto px-4 py-6 flex-grow">
      <div
        class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-transparent dark:border-gray-700 transition-colors duration-300"
      >
        <!-- Banner Image -->
        <div class="h-64 md:h-96 relative">
          <img
            :src="program.image || 'https://placehold.co/800x400?text=Event'"
            :alt="program.title"
            class="w-full h-full object-cover"
          />
          <!-- Date Badge -->
          <div
            class="absolute top-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur px-4 py-2 rounded-lg shadow-lg text-center"
          >
            <p class="text-green-700 dark:text-green-400 font-bold text-xl">{{ program.date }}</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-semibold">{{ program.time }}</p>
          </div>
        </div>

        <!-- Content Area -->
        <div class="p-8 md:p-12">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
            {{ program.title }}
          </h1>

          <!-- Info Bar -->
          <div
            class="flex flex-col md:flex-row gap-6 mb-8 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-100 dark:border-green-800"
          >
            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <div
                class="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mr-3 shadow-sm text-green-600 dark:text-green-400"
              >
                <span class="material-icons">location_on</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">স্থান</p>
                <p class="font-semibold">{{ program.location }}</p>
              </div>
            </div>

            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <div
                class="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mr-3 shadow-sm text-green-600 dark:text-green-400"
              >
                <span class="material-icons">schedule</span>
              </div>
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">সময়</p>
                <p class="font-semibold">{{ program.time }}</p>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="prose-content text-justify mb-8" v-html="program.description"></div>

          <!-- Action Buttons -->
          <div
            class="border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-between items-center"
          >
            <router-link
              to="/"
              class="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 font-medium flex items-center transition"
            >
              <span class="material-icons mr-1">arrow_back</span> ফিরে যান
            </router-link>

            <button
              @click="shareProgram"
              class="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition shadow-lg flex items-center active:scale-95"
            >
              <span class="material-icons mr-2">share</span> শেয়ার করুন
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ৩. এরর স্টেট -->
    <div v-else class="text-center py-20 flex-grow pt-32">
      <h2 class="text-2xl text-red-500 mb-4">কর্মসূচির তথ্য পাওয়া যায়নি!</h2>
      <router-link to="/" class="text-blue-500 underline">হোমপেজে ফিরে যান</router-link>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
/* ✅ FIX: ম্যানুয়াল CSS ব্যবহার করা হয়েছে যাতে ডার্ক মোড এবং টেলউইন্ড কনফ্লিক্ট না করে */

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

/* Dark Mode Overrides (Global selector দিয়ে) */
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
</style>
