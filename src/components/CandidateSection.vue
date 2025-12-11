<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  candidates: { type: Array, default: () => [] },
  commonSymbol: { type: String, default: null },
  loading: { type: Boolean, default: false },
})

const defaultImage = 'https://www.w3schools.com/howto/img_avatar.png'
const localSymbol = '/logo.png'
const handleImageError = (e) => (e.target.src = localSymbol)

// --- Filter Logic ---
const selectedConstituency = ref('')

// ইউনিক আসনগুলোর তালিকা তৈরি (Dropdown এর জন্য)
const constituencies = computed(() => {
  return [...new Set(props.candidates.map((c) => c.constituency))]
})

// ফিল্টার করা প্রার্থী তালিকা
const filteredCandidates = computed(() => {
  if (!selectedConstituency.value) return props.candidates
  return props.candidates.filter((c) => c.constituency === selectedConstituency.value)
})
</script>

<template>
  <section
    id="candidates"
    class="py-10 md:py-10 bg-white dark:bg-gray-900 relative transition-colors duration-300"
  >
    <div class="absolute inset-0 bg-gray-50 opacity-50 dark:opacity-0 pointer-events-none"></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
          আমাদের প্রার্থীরা
        </h2>
        <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          সিরাজগঞ্জ জেলার ৬টি আসনের সম্মানিত প্রার্থীগণ
        </p>
      </div>

      <!-- 🔍 Filter Bar -->
      <div v-if="!loading" class="flex justify-center mb-8">
        <div
          class="bg-gray-50 dark:bg-gray-800 p-2 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex items-center"
        >
          <span class="material-icons text-green-600 dark:text-green-400 ml-2 mr-2"
            >filter_alt</span
          >
          <select
            v-model="selectedConstituency"
            class="bg-transparent border-none text-gray-700 dark:text-gray-200 font-medium focus:ring-0 cursor-pointer py-2 pr-8 pl-2"
          >
            <option value="">সকল আসন দেখুন</option>
            <option v-for="seat in constituencies" :key="seat" :value="seat">{{ seat }}</option>
          </select>
        </div>
      </div>

      <!-- Skeleton Loader -->
      <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="n in 3"
          :key="n"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-96 animate-pulse"
        ></div>
      </div>

      <!-- Candidates Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(candidate, index) in filteredCandidates"
          :key="candidate.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700"
        >
          <!-- Image Header -->
          <div
            class="h-56 bg-gradient-to-br from-green-500 to-teal-700 flex items-center justify-center relative overflow-hidden"
          >
            <div
              class="absolute w-64 h-64 bg-white/10 rounded-full -top-10 -right-10 scale-0 group-hover:scale-150 transition-transform duration-700 z-0"
            ></div>
            <div class="relative z-10">
              <div
                class="inline-flex items-center justify-center rounded-full border-8 border-white dark:border-gray-800 transition-colors duration-300"
              >
                <div class="rounded-full p-1 bg-gradient-to-r from-red-500 to-orange-500">
                  <img
                    :src="candidate.photo_url || defaultImage"
                    :alt="candidate.name"
                    class="h-44 w-44 object-cover rounded-full shadow-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div
                class="absolute bottom-0 right-0 rounded-full p-px bg-gradient-to-r from-red-500 to-orange-500 shadow-lg w-16 h-16 flex items-center justify-center transform group-hover:rotate-12 transition duration-500 z-20"
              >
                <img
                  :src="commonSymbol || localSymbol"
                  @error="handleImageError"
                  alt="Marka"
                  class="w-14 h-14 object-contain rounded-full bg-white dark:bg-gray-200 shadow-md"
                />
              </div>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-6 text-center">
            <h3 class="text-xl font-bold mb-1 text-gray-800 dark:text-white transition-colors">
              {{ candidate.name }}
            </h3>
            <div
              class="inline-block bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-100 dark:border-green-800 mb-3 transition-colors"
            >
              <p class="text-green-700 dark:text-green-400 font-semibold text-sm">
                {{ candidate.constituency }}
              </p>
            </div>
            <p
              class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px] transition-colors"
            >
              {{ candidate.designation || 'দাড়িপাল্লা মার্কার প্রার্থী' }}
            </p>

            <div
              class="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-auto transition-colors duration-300"
            >
              <div class="flex items-center gap-2">
                <a
                  v-if="candidate.facebook"
                  :href="candidate.facebook"
                  target="_blank"
                  class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 shadow-sm"
                >
                  <span class="material-icons text-base">facebook</span>
                </a>
                <div class="flex gap-1">
                  <span
                    class="text-[10px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-600"
                    >জননেতা</span
                  >
                  <span
                    v-if="!candidate.facebook"
                    class="text-[10px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-600 hidden sm:inline-block"
                    >সেবক</span
                  >
                </div>
              </div>
              <router-link
                :to="{ name: 'candidate-detail', params: { id: candidate.id } }"
                class="group/link flex items-center text-sm font-bold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
              >
                বিস্তারিত
                <span
                  class="material-icons text-sm ml-1 transform group-hover/link:translate-x-1 transition-transform duration-300"
                  >arrow_forward</span
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- No Data -->
      <div
        v-if="!loading && filteredCandidates.length === 0"
        class="text-center py-10 text-gray-500 dark:text-gray-400"
      >
        <span class="material-icons text-4xl mb-2">search_off</span>
        <p>এই আসনে কোনো প্রার্থী পাওয়া যায়নি।</p>
      </div>
    </div>
  </section>
</template>
