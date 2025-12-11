<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHomeStore } from '@/stores/homeStore'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import api from '@/axios'

const route = useRoute()
const store = useHomeStore()
const candidate = ref(null)
const loading = ref(true)
const activeTab = ref(0) // বর্তমানে কোন ট্যাব ওপেন আছে

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

    // ডাটা যদি পুরনো স্ট্রিং ফরমেটে থাকে, তবে সেটাকে অ্যারেতে কনভার্ট করে নিব (সেফটির জন্য)
    if (candidate.value && typeof candidate.value.biography === 'string') {
      candidate.value.biography = [{ title: 'জীবন বৃত্তান্ত', content: candidate.value.biography }]
    }
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

    <!-- Skeleton Loader -->
    <div v-if="loading" class="container mx-auto px-4 py-8 animate-pulse">
      <div class="grid lg:grid-cols-12 gap-8">
        <div class="lg:col-span-4 bg-gray-200 dark:bg-gray-800 rounded-2xl h-96"></div>
        <div class="lg:col-span-8 space-y-4">
          <div class="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"></div>
          <div class="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="candidate" class="container mx-auto px-4 py-8 flex-grow">
      <div class="grid lg:grid-cols-12 gap-8 items-start">
        <!-- ১. বাম পাশের সাইডবার (Sticky Profile) -->
        <div class="lg:col-span-4 lg:sticky lg:top-32">
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <!-- Top Gradient Pattern -->
            <div class="h-32 bg-gradient-to-r from-green-600 to-teal-700 relative">
              <div
                class="absolute inset-0 bg-[url('/logo.png')] opacity-10 bg-repeat transform scale-50"
              ></div>
            </div>

            <div class="px-6 pb-8 text-center relative">
              <!-- Profile Image -->
              <div class="relative -mt-16 mb-4 inline-block">
                <div class="p-1.5 bg-white dark:bg-gray-800 rounded-full">
                  <img
                    :src="candidate.photo_url || 'https://placehold.co/300x300'"
                    class="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700 shadow-lg"
                  />
                </div>
                <div
                  class="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md w-12 h-12 flex items-center justify-center border border-gray-200"
                >
                  <img :src="getSymbol()" class="w-8 h-8 object-contain" />
                </div>
              </div>

              <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {{ candidate.name }}
              </h1>
              <p class="text-green-600 dark:text-green-400 font-medium mb-4">
                {{ candidate.designation }}
              </p>

              <div
                class="inline-block bg-gray-100 dark:bg-gray-700 px-4 py-1.5 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 mb-6"
              >
                {{ candidate.constituency }}
              </div>

              <!-- Social Links -->
              <div
                v-if="candidate.facebook"
                class="flex justify-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700"
              >
                <a
                  :href="candidate.facebook"
                  target="_blank"
                  class="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg transition"
                >
                  <span class="material-icons text-lg">facebook</span> ফেসবুকে যুক্ত হোন
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ২. ডান পাশের মেইন কন্টেন্ট (Tabs & Video) -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Video Section (Always visible) -->
          <div
            v-if="candidate.video_link"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-1 overflow-hidden"
          >
            <div class="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                class="w-full h-full"
                :src="getEmbedUrl(candidate.video_link)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <!-- Dynamic Tabs Section -->
          <div
            v-if="Array.isArray(candidate.biography) && candidate.biography.length > 0"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <!-- Tab Headers -->
            <div
              class="flex flex-wrap border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
            >
              <button
                v-for="(section, index) in candidate.biography"
                :key="index"
                @click="activeTab = index"
                class="px-6 py-4 text-sm md:text-base font-bold transition-all duration-300 relative outline-none focus:outline-none"
                :class="
                  activeTab === index
                    ? 'text-green-600 dark:text-green-400 bg-white dark:bg-gray-800'
                    : 'text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                "
              >
                {{ section.title }}
                <!-- Active Indicator Line -->
                <span
                  v-if="activeTab === index"
                  class="absolute top-0 left-0 w-full h-1 bg-green-500 rounded-b"
                ></span>
              </button>
            </div>

            <!-- Tab Content -->
            <div class="p-8 md:p-10 min-h-[300px]">
              <transition name="fade" mode="out-in">
                <div :key="activeTab" class="animate-fade-in">
                  <h2
                    class="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center"
                  >
                    <span class="material-icons text-green-600 dark:text-green-400 mr-2"
                      >verified</span
                    >
                    {{ candidate.biography[activeTab].title }}
                  </h2>
                  <!-- Rich Text Content -->
                  <div
                    class="prose-content text-justify"
                    v-html="candidate.biography[activeTab].content"
                  ></div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Fallback if data is not array (Old data support) -->
          <div v-else class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div class="prose-content text-justify" v-html="candidate.biography"></div>
          </div>

          <!-- Back Button -->
          <div class="mt-4">
            <router-link
              to="/"
              class="inline-flex items-center text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 font-medium transition"
            >
              <span class="material-icons mr-2">arrow_back</span> হোমপেজে ফিরে যান
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 flex-grow">
      <h2 class="text-2xl text-red-500 mb-4">প্রার্থীর তথ্য পাওয়া যায়নি!</h2>
      <router-link to="/" class="text-blue-500 underline">হোমপেজে ফিরে যান</router-link>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
/* Fade Animation for Tabs */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Rich Text Styles */
:deep(.prose-content p) {
  margin-bottom: 1.25rem;
  color: #4b5563;
  line-height: 1.8;
}
:deep(.prose-content ul) {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}
:deep(.prose-content ul li) {
  position: relative;
  padding-left: 1.75rem;
  margin-bottom: 0.75rem;
  color: #374151;
}
:deep(.prose-content ul li::before) {
  content: '✔';
  position: absolute;
  left: 0;
  color: #16a34a;
  font-weight: bold;
}
:deep(.prose-content h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #15803d;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Dark Mode Overrides */
:global(.dark) :deep(.prose-content p),
:global(.dark) :deep(.prose-content ul li) {
  color: #d1d5db;
}
:global(.dark) :deep(.prose-content h3) {
  color: #4ade80;
}
</style>
