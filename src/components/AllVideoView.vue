<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const videos = ref([])
const loading = ref(true)
const currentPage = ref(1)
const lastPage = ref(1)

// ডাটা আনার ফাংশন
const fetchVideos = async (page = 1) => {
    loading.value = true
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/videos?page=${page}`)
        videos.value = response.data.data

        // পেজিনেশন মেটা ডাটা সেট করা
        currentPage.value = response.data.meta.current_page
        lastPage.value = response.data.meta.last_page
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const changePage = (page) => {
    if (page >= 1 && page <= lastPage.value) {
        fetchVideos(page)
    }
}

onMounted(() => {
    fetchVideos()
})
</script>

<template>
    <div class="bg-gray-50 min-h-screen flex flex-col">
        <AppHeader />

        <div class="container mx-auto px-4 py-10 md:py-10 flex-grow">
            <h1 class="text-4xl font-bold text-center mb-12 text-gray-800">ভিডিও গ্যালারী</h1>

            <!-- লোডিং স্টেট -->
            <div v-if="loading" class="text-center py-20">
                <span class="material-icons text-6xl text-green-600 animate-spin">autorenew</span>
            </div>

            <div v-else>
                <!-- Video Grid -->
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div v-for="video in videos" :key="video.id"
                        class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
                        <!-- Video Embed -->
                        <div class="aspect-video w-full">
                            <iframe class="w-full h-full" :src="`https://www.youtube.com/embed/${video.youtube_code}`"
                                title="YouTube video" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>

                        <!-- Title -->
                        <div class="p-4">
                            <h3 class="font-semibold text-gray-800 line-clamp-2" :title="video.title">
                                {{ video.title }}
                            </h3>
                        </div>
                    </div>
                </div>

                <!-- Pagination Buttons -->
                <div v-if="lastPage > 1" class="flex justify-center items-center space-x-4">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        &larr; আগের পেজ
                    </button>

                    <span class="text-gray-600 font-medium">
                        পেজ {{ currentPage }} / {{ lastPage }}
                    </span>

                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === lastPage"
                        class="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        পরের পেজ &rarr;
                    </button>
                </div>
            </div>
        </div>

        <AppFooter />
    </div>
</template>