<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const gallery = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/gallery')
        gallery.value = response.data.data
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <!-- Main Wrapper: Dark Mode Background Added -->
    <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300">
        <AppHeader />

        <div class="container mx-auto px-4 py-10 md:py-10 flex-grow">
            <!-- Title: Dark Mode Text Added -->
            <h1 class="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">সম্পূর্ণ ফটো গ্যালারী</h1>

            <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
            <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <!-- ১২টি স্কেলেটন বক্স -->
                <div v-for="n in 12" :key="n" class="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            </div>

            <!-- ২. আসল কন্টেন্ট (Real Content) -->
            <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="item in gallery" :key="item.id"
                    class="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md border border-transparent dark:border-gray-700">

                    <img :src="item.image"
                        class="w-full h-full object-cover group-hover:scale-110 transition duration-500">

                    <!-- Overlay (Text always white on black overlay, works for both modes) -->
                    <div
                        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                        <p class="text-white font-medium text-sm">{{ item.caption }}</p>
                    </div>
                </div>
            </div>

            <!-- ৩. যদি কোনো ডাটা না থাকে (Empty State) -->
            <div v-if="!loading && gallery.length === 0" class="text-center py-20 text-gray-400 dark:text-gray-500">
                <span class="material-icons text-4xl mb-2">image_not_supported</span>
                <p>কোনো ছবি পাওয়া যায়নি।</p>
            </div>
        </div>

        <AppFooter />
    </div>
</template>