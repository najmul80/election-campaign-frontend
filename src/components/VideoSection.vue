<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    videos: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false }
})

const searchQuery = ref('')
const playingVideoId = ref(null)

const playVideo = (id) => { playingVideoId.value = id }

const getThumbnail = (video) => {
    if (video.thumbnail) return video.thumbnail
    return `https://img.youtube.com/vi/${video.youtube_code}/hqdefault.jpg`
}

const filteredVideos = computed(() => {
    if (!searchQuery.value) return props.videos
    return props.videos.filter(v => v.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>

<template>
    <section id="videos" class="py-10 md:py-10 bg-white border-t border-gray-100 dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">ভিডিও গ্যালারী</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            <!-- 🔍 Filter: ভিডিও সার্চ -->
            <div v-if="!loading" class="flex justify-center mb-8">
                <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex items-center w-full max-w-md">
                    <span class="material-icons text-red-600 dark:text-red-400 ml-2 mr-2">search</span>
                    <input v-model="searchQuery" type="text" placeholder="ভিডিওর বিষয় খুঁজুন..." 
                        class="bg-transparent border-none text-gray-700 dark:text-gray-200 font-medium focus:ring-0 w-full py-2 outline-none">
                </div>
            </div>

            <!-- Skeleton -->
            <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="n in 4" :key="n" class="bg-gray-50 dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>
            </div>

            <!-- Video Grid -->
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="video in filteredVideos" :key="video.id" class="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
                    <div class="aspect-video w-full relative bg-black cursor-pointer">
                        <iframe v-if="playingVideoId === video.id" class="w-full h-full" :src="`https://www.youtube.com/embed/${video.youtube_code}?autoplay=1`" title="YouTube" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        <div v-else @click="playVideo(video.id)" class="w-full h-full relative">
                            <img :src="getThumbnail(video)" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" :alt="video.title">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <span class="material-icons text-white text-3xl ml-1">play_arrow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-800 dark:text-white line-clamp-2" :title="video.title">{{ video.title }}</h3>
                    </div>
                </div>
            </div>

            <div v-if="!loading && filteredVideos.length === 0" class="text-center py-10 text-gray-400 dark:text-gray-500">
                <p>কোনো ভিডিও পাওয়া যায়নি।</p>
            </div>

            <div class="text-center mt-10">
                <router-link to="/all-videos" class="inline-flex items-center text-red-600 dark:text-red-400 font-bold hover:underline">
                    <span class="material-icons mr-1">play_circle</span> সব ভিডিও দেখুন &rarr;
                </router-link>
            </div>
        </div>
    </section>
</template>