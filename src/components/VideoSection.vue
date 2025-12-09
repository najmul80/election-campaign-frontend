<script setup>
defineProps({
    videos: {
        type: Array,
        required: true,
        default: () => []
    },
    // লোডিং প্রপ
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <!-- Section: Dark bg added -->
    <section id="videos"
        class="py-10 md:py-10 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <!-- Title & Text: Dark mode colors -->
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">ভিডিও গ্যালারী</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">নির্বাচনী প্রচারণার বিশেষ মুহূর্তসমূহ</p>
            </div>

            <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
            <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="n in 4" :key="n"
                    class="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse border border-gray-100 dark:border-gray-700">
                    <!-- Video Area Skeleton -->
                    <div class="aspect-video bg-gray-300 dark:bg-gray-700"></div>

                    <!-- Title Skeleton -->
                    <div class="p-4 space-y-2">
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                </div>
            </div>

            <!-- ২. আসল কন্টেন্ট (Dark Mode Added) -->
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Loop Videos -->
                <div v-for="video in videos" :key="video.id"
                    class="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <!-- Video Wrapper (16:9 Aspect Ratio) -->
                    <div class="aspect-video w-full">
                        <iframe class="w-full h-full" :src="`https://www.youtube.com/embed/${video.youtube_code}`"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
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
                <router-link to="/all-videos"
                    class="inline-flex items-center text-red-600 dark:text-red-400 font-bold hover:underline transition-colors">
                    <span class="material-icons mr-1">play_circle</span> সব ভিডিও দেখুন &rarr;
                </router-link>
            </div>
        </div>
    </section>
</template>