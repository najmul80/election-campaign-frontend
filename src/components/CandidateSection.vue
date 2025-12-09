<script setup>
defineProps({
    candidates: {
        type: Array,
        required: true,
        default: () => []
    },
    commonSymbol: {
        type: String,
        default: null
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const defaultImage = "https://www.w3schools.com/howto/img_avatar.png"
const localSymbol = "/logo.png"

const handleImageError = (event) => {
    event.target.src = localSymbol
}
</script>

<template>
    <!-- Section: Dark bg added -->
    <section id="candidates" class="py-10 md:py-10 bg-white dark:bg-gray-900 relative transition-colors duration-300">
        <!-- Background Pattern (Hidden in dark mode) -->
        <div class="absolute inset-0 bg-gray-50 opacity-50 dark:opacity-0 pointer-events-none"></div>

        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">আমাদের প্রার্থীরা</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">সিরাজগঞ্জ জেলার ৬টি আসনের সম্মানিত প্রার্থীগণ</p>
            </div>

            <!-- ১. স্কেলেটন লোডার -->
            <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="n in 3" :key="n"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
                    <div class="h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
                        <div
                            class="w-44 h-44 bg-gray-300 dark:bg-gray-600 rounded-full border-8 border-white dark:border-gray-800">
                        </div>
                    </div>
                    <div class="p-6 text-center space-y-4">
                        <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                        <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-1/3 mx-auto"></div>
                        <div class="space-y-2 pt-2">
                            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                        </div>
                        <div class="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center mt-4">
                            <div class="flex gap-2">
                                <div class="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div class="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            </div>
                            <div class="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ২. আসল কন্টেন্ট -->
            <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div v-for="(candidate, index) in candidates" :key="candidate.id"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">

                    <!-- Image Header -->
                    <div
                        class="h-56 bg-gradient-to-br from-green-500 to-teal-700 flex items-center justify-center relative overflow-hidden">

                        <div
                            class="absolute w-64 h-64 bg-white/10 rounded-full -top-10 -right-10 scale-0 group-hover:scale-150 transition-transform duration-700 z-0">
                        </div>

                        <!-- Candidate Photo Wrapper -->
                        <div class="relative z-10">
                            <div
                                class="inline-flex items-center justify-center rounded-full border-8 border-white dark:border-gray-800 transition-colors duration-300">
                                <div class="rounded-full p-1 bg-gradient-to-r from-red-500 to-orange-500">
                                    <!-- ✅ ছবিতে লিংক যুক্ত করা হয়েছে -->
                                    <router-link :to="{ name: 'candidate-detail', params: { id: candidate.id } }">
                                        <img :src="candidate.photo_url || defaultImage" :alt="candidate.name"
                                            class="h-44 w-44 object-cover rounded-full shadow-xl group-hover:scale-105 transition-transform duration-500 cursor-pointer">
                                    </router-link>
                                </div>
                            </div>

                            <!-- Symbol Badge -->
                            <div
                                class="absolute bottom-0 right-0 rounded-full p-px bg-gradient-to-r from-red-500 to-orange-500 shadow-lg w-16 h-16 flex items-center justify-center transform group-hover:rotate-12 transition duration-500 z-20 pointer-events-none">
                                <img :src="commonSymbol || localSymbol" @error="handleImageError" alt="Marka"
                                    class="w-14 h-14 object-contain rounded-full bg-white dark:bg-gray-200 shadow-md">
                            </div>
                        </div>
                    </div>

                    <!-- Card Body -->
                    <div class="p-6 text-center">
                        <!-- ✅ নামে লিংক যুক্ত করা হয়েছে -->
                        <h3 class="text-xl font-bold mb-1 text-gray-800 dark:text-white transition-colors">
                            <router-link 
                                :to="{ name: 'candidate-detail', params: { id: candidate.id } }"
                                class="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            >
                                {{ candidate.name }}
                            </router-link>
                        </h3>

                        <div
                            class="inline-block bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full border border-green-100 dark:border-green-800 mb-3 transition-colors">
                            <p class="text-green-700 dark:text-green-400 font-semibold text-sm">
                                {{ candidate.constituency }}
                            </p>
                        </div>

                        <p
                            class="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 min-h-[40px] transition-colors">
                            {{ candidate.designation || 'দাড়িপাল্লা মার্কার প্রার্থী' }}
                        </p>

                        <!-- Action Footer -->
                        <div
                            class="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center mt-auto transition-colors duration-300">
                            
                            <!-- Left: Facebook & Tags -->
                            <div class="flex items-center gap-2">
                                <!-- Facebook Link (Dynamic) -->
                                <a v-if="candidate.facebook" 
                                   :href="candidate.facebook" 
                                   target="_blank"
                                   class="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                   title="Facebook Profile">
                                   <span class="material-icons text-base">facebook</span>
                                </a>

                                <!-- Tags -->
                                <div class="flex gap-1">
                                    <span class="text-[10px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-600">
                                        জননেতা
                                    </span>
                                    <span v-if="!candidate.facebook" class="text-[10px] sm:text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-600 hidden sm:inline-block">
                                        সেবক
                                    </span>
                                </div>
                            </div>

                            <!-- Right: Details Link -->
                            <router-link :to="{ name: 'candidate-detail', params: { id: candidate.id } }"
                                class="group/link flex items-center text-sm font-bold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors">
                                বিস্তারিত
                                <span class="material-icons text-sm ml-1 transform group-hover/link:translate-x-1 transition-transform duration-300">
                                    arrow_forward
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- No Candidates Found Message -->
            <div v-if="!loading && candidates.length === 0" class="text-center py-10 text-gray-500 dark:text-gray-400">
                <span class="material-icons text-4xl mb-2">person_off</span>
                <p>কোনো প্রার্থীর তথ্য পাওয়া যায়নি।</p>
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
</style>