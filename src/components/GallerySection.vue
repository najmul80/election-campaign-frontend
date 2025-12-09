<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    gallery: {
        type: Array,
        required: true,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const activeTab = ref('all')

const filteredImages = computed(() => {
    if (activeTab.value === 'all') {
        return props.gallery
    }
    return props.gallery.filter(item => item.category === activeTab.value)
})

const tabs = [
    { label: 'সব ছবি', value: 'all' },
    { label: 'জনসভা', value: 'rally' },
    { label: 'প্রচারণা', value: 'campaign' },
    { label: 'মিটিং', value: 'meeting' },
]
</script>

<template>
    <!-- Section: Dark BG Added -->
    <section id="gallery" class="py-10 md:py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="text-center mb-10">
                <!-- Title: Dark Text Added -->
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">ফটো গ্যালারী</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            <!-- Filter Tabs -->
            <div class="flex flex-wrap justify-center gap-2 mb-10">
                <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
                    class="px-5 py-2 rounded-full font-medium transition-all duration-300"
                    :class="activeTab === tab.value
                        ? 'bg-green-600 text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'">
                    {{ tab.label }}
                </button>
            </div>

            <!-- ১. স্কেলেটন লোডার (Dark Mode Added) -->
            <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="n in 8" :key="n" class="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>

            <!-- ২. আসল গ্যালারী গ্রিড -->
            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="item in filteredImages" :key="item.id"
                    class="group relative overflow-hidden rounded-xl shadow-md cursor-pointer h-64 animate-fade-in border border-transparent dark:border-gray-700">
                    <img :src="item.image" :alt="item.caption"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">

                    <!-- Overlay -->
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p class="text-white font-medium text-sm">
                            {{ item.caption || 'ক্যাপশন নেই' }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && filteredImages.length === 0"
                class="text-center py-10 text-gray-400 dark:text-gray-500">
                <p>এই ক্যাটাগরিতে কোনো ছবি নেই।</p>
            </div>

            <div class="text-center mt-10">
                <router-link to="/all-gallery"
                    class="text-green-600 dark:text-green-400 font-bold hover:underline inline-block">
                    আরও দেখুন &rarr;
                </router-link>
            </div>
        </div>
    </section>
</template>