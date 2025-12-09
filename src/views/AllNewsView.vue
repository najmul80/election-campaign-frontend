<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const newsList = ref([])
const loading = ref(true)
const currentPage = ref(1)
const lastPage = ref(1)

// ডাটা আনার ফাংশন (পেজ নম্বর সহ)
const fetchNews = async (page = 1) => {
    loading.value = true
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/news?page=${page}`)
        newsList.value = response.data.data

        // লারাভেল পেজিনেশন মেটা ডাটা
        if (response.data.meta) {
            currentPage.value = response.data.meta.current_page
            lastPage.value = response.data.meta.last_page
        }
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
        // পেজ চেঞ্জ হলে উপরে স্ক্রল হবে
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const changePage = (page) => {
    if (page >= 1 && page <= lastPage.value) {
        fetchNews(page)
    }
}

onMounted(() => {
    fetchNews()
})
</script>

<template>
    <!-- Main Wrapper: Dark Mode Background Added -->
    <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
        <AppHeader />

        <div class="container mx-auto px-4 py-10 md:py-10 flex-grow">
            <!-- Title: Dark Mode Text Added -->
            <h1 class="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">সকল সংবাদ</h1>

            <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
            <div v-if="loading" class="grid md:grid-cols-3 gap-8 mb-12">
                <div v-for="n in 6" :key="n"
                    class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 animate-pulse">
                    <!-- Image Skeleton -->
                    <div class="h-48 bg-gray-300 dark:bg-gray-700"></div>
                    
                    <!-- Content Skeleton -->
                    <div class="p-6 space-y-4">
                        <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 pt-2"></div>
                    </div>
                </div>
            </div>

            <!-- ২. আসল কন্টেন্ট (Dark Mode Added) -->
            <div v-else>
                <!-- News Grid -->
                <div class="grid md:grid-cols-3 gap-8 mb-12">
                    <div v-for="item in newsList" :key="item.id"
                        class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-transparent dark:border-gray-700">
                        <div class="h-48 overflow-hidden relative">
                            <img :src="item.image || 'https://placehold.co/600x400'" class="w-full h-full object-cover">
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">{{ item.title }}</h3>
                            <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">{{ item.date }}</p>
                            <router-link :to="{ name: 'news-detail', params: { slug: item.slug } }"
                                class="text-green-600 dark:text-green-400 font-bold hover:underline transition-colors">
                                বিস্তারিত পড়ুন &rarr;
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- Pagination Buttons (Dark Mode Styled) -->
                <div v-if="lastPage > 1" class="flex justify-center items-center space-x-4">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        &larr; আগের পেজ
                    </button>

                    <span class="text-gray-600 dark:text-gray-400 font-medium">
                        পেজ {{ currentPage }} / {{ lastPage }}
                    </span>

                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === lastPage"
                        class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        পরের পেজ &rarr;
                    </button>
                </div>

                <!-- Empty State -->
                <div v-if="newsList.length === 0" class="text-center py-10 text-gray-400 dark:text-gray-500">
                    <p>কোনো সংবাদ পাওয়া যায়নি।</p>
                </div>
            </div>
        </div>

        <AppFooter />
    </div>
</template>