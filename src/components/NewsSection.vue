<script setup>
defineProps({
    news: {
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
    <section id="news" class="py-10 md:py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <!-- Title & Text: Dark mode colors -->
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">সর্বশেষ সংবাদ</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">নির্বাচন ও এলাকা ভিত্তিক সর্বশেষ খবর</p>
            </div>

            <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
            <div v-if="loading" class="grid md:grid-cols-3 gap-8">
                <div v-for="n in 3" :key="n"
                    class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse border border-gray-100 dark:border-gray-700">
                    <!-- Image Skeleton -->
                    <div class="h-48 bg-gray-300 dark:bg-gray-700"></div>
                    <!-- Content Skeleton -->
                    <div class="p-6 space-y-4">
                        <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                        <div class="space-y-2 pt-2">
                            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                        </div>
                        <div class="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 pt-4"></div>
                    </div>
                </div>
            </div>

            <!-- ২. আসল কন্টেন্ট (Dark Mode Added) -->
            <div v-else class="grid md:grid-cols-3 gap-8">
                <!-- Loop News -->
                <div v-for="item in news" :key="item.id"
                    class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-transparent dark:border-gray-700">
                    <!-- Image -->
                    <div class="h-48 overflow-hidden relative">
                        <img :src="item.image || 'https://placehold.co/600x400?text=News'" :alt="item.title"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute bottom-0 left-0 bg-green-600 text-white text-xs px-3 py-1 rounded-tr-lg">
                            {{ item.date }}
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <h3
                            class="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition line-clamp-2">
                            {{ item.title }}
                        </h3>

                        <div class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3" v-html="item.content">
                        </div>

                        <router-link :to="{ name: 'news-detail', params: { slug: item.slug } }"
                            class="inline-flex items-center text-green-600 dark:text-green-400 font-semibold hover:text-green-800 dark:hover:text-green-300 transition">
                            বিস্তারিত পড়ুন <span class="material-icons text-sm ml-1">arrow_forward</span>
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && news.length === 0" class="text-center py-10 text-gray-400 dark:text-gray-500">
                <p>বর্তমানে কোনো সংবাদ নেই।</p>
            </div>

            <!-- See All Button -->
            <div class="text-center mt-10" v-if="!loading && news.length > 0">
                <router-link to="/all-news"
                    class="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg inline-flex items-center">
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