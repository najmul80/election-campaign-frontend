<script setup>
defineProps({
    programs: {
        type: Array,
        required: true,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <section id="programs" class="py-10 md:py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">আসন্ন কর্মসূচি</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">জনসভা, মিছিল এবং ঘরোয়া সভার সময়সূচী</p>
            </div>

            <!-- ১. স্কেলেটন লোডার -->
            <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="n in 3" :key="n"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse h-full flex flex-col">
                    <div class="h-48 bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
                    <div class="p-6 space-y-4 flex-1">
                        <div class="h-7 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        <div class="flex items-center gap-3">
                            <div class="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                        </div>
                        <div class="space-y-2">
                            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                        </div>
                        <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mt-auto"></div>
                    </div>
                </div>
            </div>

            <!-- ২. আসল কন্টেন্ট -->
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="program in programs" :key="program.id"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                    
                    <!-- Image Area (Fixed Height) -->
                    <div class="h-48 overflow-hidden relative bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                        <img :src="program.image || 'https://placehold.co/600x400?text=Event'" :alt="program.title"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        
                        <!-- Date Badge -->
                        <div class="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-lg text-center shadow">
                            <p class="text-green-700 dark:text-green-400 font-bold text-sm">{{ program.date }}</p>
                            <p class="text-gray-600 dark:text-gray-400 text-xs">{{ program.time }}</p>
                        </div>
                    </div>

                    <!-- Content Area (Flex Grow to fill space) -->
                    <div class="p-6 flex flex-col flex-1">
                        
                        <!-- Title (Fixed Line Height limit) -->
                        <h3 class="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition line-clamp-2 h-[3.5rem]">
                            {{ program.title }}
                        </h3>

                        <!-- Location -->
                        <div class="flex items-center text-gray-500 dark:text-gray-400 mb-4 text-sm">
                            <span class="material-icons text-green-500 dark:text-green-400 mr-2 text-base">location_on</span>
                            <span class="truncate">{{ program.location }}</span>
                        </div>

                        <!-- Description (Limited lines) -->
                        <div class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 flex-1">
                            <div v-html="program.description"></div>
                        </div>

                        <!-- Button (Pushed to bottom) -->
                        <router-link :to="{ name: 'program-detail', params: { id: program.id } }"
                            class="mt-auto w-full bg-gray-50 dark:bg-gray-700 text-green-700 dark:text-green-400 font-bold py-2 px-4 rounded border border-green-200 dark:border-green-800 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition-colors block text-center">
                            বিস্তারিত দেখুন
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="!loading && programs.length === 0" class="text-center py-10">
                <p class="text-gray-500 dark:text-gray-400">বর্তমানে কোনো কর্মসূচি নেই।</p>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* টেক্সট লিমিট করার স্টাইল */
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