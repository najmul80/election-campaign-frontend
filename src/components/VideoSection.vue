<script setup>
import { ref } from 'vue'

defineProps({
    videos: {
        type: Array,
        required: true,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})

// বর্তমানে কোন ভিডিওটি প্লে হচ্ছে তার ID রাখার জন্য
const playingVideoId = ref(null)

const playVideo = (id) => {
    playingVideoId.value = id
}

// যদি আপনার আপলোড করা থাম্বনেইল না থাকে, তবে ইউটিউবের অটো থাম্বনেইল নিবে
const getThumbnail = (video) => {
    if (video.thumbnail) {
        return video.thumbnail;
    }
    // YouTube Default Thumbnail Fallback
    return `https://img.youtube.com/vi/${video.youtube_code}/hqdefault.jpg`;
}
</script>

<template>
    <section id="videos" class="py-10 md:py-10 bg-white border-t border-gray-100 dark:bg-gray-900 dark:border-gray-800 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">ভিডিও গ্যালারী</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">নির্বাচনী প্রচারণার বিশেষ মুহূর্তসমূহ</p>
            </div>

            <!-- ১. স্কেলেটন লোডার -->
            <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="n in 4" :key="n"
                    class="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse border border-gray-100 dark:border-gray-700">
                    <div class="aspect-video bg-gray-300 dark:bg-gray-700"></div>
                    <div class="p-4 space-y-2">
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                </div>
            </div>

            <!-- ২. আসল কন্টেন্ট -->
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="video in videos" :key="video.id"
                    class="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
                    
                    <!-- Video Wrapper (16:9) -->
                    <div class="aspect-video w-full relative bg-black cursor-pointer">
                        
                        <!-- A. যদি ভিডিও প্লে অবস্থায় থাকে -->
                        <iframe v-if="playingVideoId === video.id" 
                            class="w-full h-full"
                            :src="`https://www.youtube.com/embed/${video.youtube_code}?autoplay=1`"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>

                        <!-- B. যদি ভিডিও প্লে না থাকে (থাম্বনেইল দেখাবে) -->
                        <div v-else @click="playVideo(video.id)" class="w-full h-full relative">
                            <!-- Thumbnail Image -->
                            <img 
                                :src="getThumbnail(video)" 
                                class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                :alt="video.title"
                            >
                            
                            <!-- Play Button Overlay -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <span class="material-icons text-white text-3xl ml-1">play_arrow</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Title -->
                    <div class="p-4">
                        <h3 class="font-semibold text-gray-800 dark:text-white line-clamp-2" :title="video.title">
                            {{ video.title }}
                        </h3>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && videos.length === 0" class="text-center py-10 text-gray-400 dark:text-gray-500">
                <span class="material-icons text-4xl mb-2">videocam_off</span>
                <p>কোনো ভিডিও পাওয়া যায়নি।</p>
            </div>

            <!-- See More Button -->
            <div class="text-center mt-10" v-if="!loading && videos.length > 0">
                <router-link to="/all-videos" class="inline-flex items-center text-red-600 dark:text-red-400 font-bold hover:underline">
                    <span class="material-icons mr-1">play_circle</span> সব ভিডিও দেখুন &rarr;
                </router-link>
            </div>
        </div>
    </section>
</template>