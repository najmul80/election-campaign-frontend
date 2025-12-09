<script setup>
defineProps({
    quotes: {
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
    <section id="quotes"
        class="py-10 md:py-10 bg-green-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
        <!-- Background Design (Adjusted for Dark Mode) -->
        <div
            class="absolute top-0 left-0 text-green-100 dark:text-green-900/20 opacity-50 transform -translate-x-10 -translate-y-10 pointer-events-none">
            <span class="material-icons text-[200px]">format_quote</span>
        </div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center mb-8">
                <!-- Title: Dark mode text white -->
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">নেতৃবৃন্দের উক্তি</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
            <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- ৩টি স্কেলেটন কার্ড -->
                <div v-for="n in 3" :key="n"
                    class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-gray-200 dark:border-gray-700 animate-pulse">

                    <!-- Text Lines Skeleton -->
                    <div class="space-y-3 mb-8">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>

                    <!-- Author Info Skeleton -->
                    <div class="flex items-center">
                        <div class="w-14 h-14 bg-gray-300 dark:bg-gray-600 rounded-full mr-4"></div>
                        <div class="space-y-2 flex-1">
                            <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ২. আসল কন্টেন্ট (Dark Mode Added) -->
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="item in quotes" :key="item.id"
                    class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-t-4 border-green-500 relative hover:-translate-y-2 transition duration-300">
                    <!-- Quote Icon -->
                    <span
                        class="material-icons text-4xl text-green-200 dark:text-green-900 absolute top-4 right-4">format_quote</span>

                    <p class="text-gray-600 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                        "{{ item.quote }}"
                    </p>

                    <div class="flex items-center">
                        <img :src="item.image || 'https://placehold.co/100x100?text=User'" alt="Author"
                            class="w-14 h-14 rounded-full border-2 border-green-500 object-cover mr-4">
                        <div>
                            <h4 class="font-bold text-gray-800 dark:text-white">{{ item.name }}</h4>
                            <p class="text-green-600 dark:text-green-400 text-sm font-medium">{{ item.designation }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && quotes.length === 0" class="text-center text-gray-400 dark:text-gray-500">
                <p>বর্তমানে কোনো উক্তি নেই।</p>
            </div>
        </div>
    </section>
</template>