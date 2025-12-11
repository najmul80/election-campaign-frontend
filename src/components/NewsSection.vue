<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  news: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
})

const selectedDate = ref('')

const filteredNews = computed(() => {
  if (!selectedDate.value) return props.news
  return props.news.filter((item) => {
    return item.date.includes(selectedDate.value) || item.title.includes(selectedDate.value)
  })
})
</script>

<template>
  <section
    id="news"
    class="py-10 md:py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
  >
    <div class="container mx-auto px-4">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
          সর্বশেষ সংবাদ
        </h2>
        <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>

      <!-- 🔍 Filter -->
      <div v-if="!loading" class="flex justify-center mb-8">
        <div
          class="bg-white dark:bg-gray-800 p-2 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex items-center w-full max-w-md"
        >
          <span class="material-icons text-green-600 dark:text-green-400 ml-2 mr-2">search</span>
          <input
            v-model="selectedDate"
            type="text"
            placeholder="তারিখ বা শিরোনাম দিয়ে খুঁজুন..."
            class="bg-transparent border-none text-gray-700 dark:text-gray-200 font-medium focus:ring-0 w-full py-2 outline-none"
          />
        </div>
      </div>

      <!-- Skeleton -->
      <div v-if="loading" class="grid md:grid-cols-3 gap-8">
        <div
          v-for="n in 3"
          :key="n"
          class="h-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-pulse"
        ></div>
      </div>

      <!-- News Grid -->
      <div v-else class="grid md:grid-cols-3 gap-8">
        <div
          v-for="item in filteredNews"
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-transparent dark:border-gray-700"
        >
          <div class="h-48 overflow-hidden relative">
            <!-- ✅ FIX: object-top যোগ করা হয়েছে -->
            <img
              :src="item.image || 'https://placehold.co/600x400?text=News'"
              :alt="item.title"
              class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
            />
            <div
              class="absolute bottom-0 left-0 bg-green-600 text-white text-xs px-3 py-1 rounded-tr-lg"
            >
              {{ item.date }}
            </div>
          </div>
          <div class="p-6">
            <h3
              class="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition line-clamp-2"
            >
              {{ item.title }}
            </h3>
            <div
              class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3"
              v-html="item.content"
            ></div>
            <router-link
              :to="{ name: 'news-detail', params: { slug: item.slug } }"
              class="inline-flex items-center text-green-600 dark:text-green-400 font-semibold hover:text-green-800 dark:hover:text-green-300 transition"
            >
              বিস্তারিত পড়ুন <span class="material-icons text-sm ml-1">arrow_forward</span>
            </router-link>
          </div>
        </div>
      </div>

      <div
        v-if="!loading && filteredNews.length === 0"
        class="text-center py-10 text-gray-400 dark:text-gray-500"
      >
        <p>কোনো সংবাদ পাওয়া যায়নি।</p>
      </div>

      <div class="text-center mt-10" v-if="!loading && news.length > 0">
        <router-link
          to="/all-news"
          class="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg inline-flex items-center"
        >
          সব খবর দেখুন <span class="material-icons ml-2">list_alt</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>