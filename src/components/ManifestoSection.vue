<script setup>
defineProps({
    manifestos: {
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
    <!-- Section: Dark bg added -->
    <section id="manifesto" class="py-10 md:py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <!-- Title & Subtitle: Dark mode text colors -->
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">নির্বাচনী ইশতেহার</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">উন্নয়নের লক্ষ্যে আমাদের সুনির্দিষ্ট পরিকল্পনাসমূহ</p>
            </div>

            <div class="max-w-4xl mx-auto">

                <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
                <div v-if="loading" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 animate-pulse border border-transparent dark:border-gray-700">
                    <div class="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-10"></div>
                    <div class="space-y-10">
                        <div v-for="n in 4" :key="n" class="pl-8 border-l-2 border-gray-200 dark:border-gray-700 relative">
                            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                                <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ২. আসল কন্টেন্ট (Dark Mode Added) -->
                <div v-else class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden transition-colors duration-300 border border-transparent dark:border-gray-700">
                    <!-- Decorative Background (Adjusted opacity for dark mode) -->
                    <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-100 dark:bg-green-900/20 rounded-full opacity-50 blur-2xl">
                    </div>

                    <h3 class="text-2xl font-bold mb-8 text-green-700 dark:text-green-400 flex items-center">
                        <span class="material-icons mr-2">verified</span>
                        আমাদের প্রতিশ্রুতিসমূহ
                    </h3>

                    <div class="space-y-8">
                        <!-- Loop Through Manifestos -->
                        <div v-for="(item, index) in manifestos" :key="item.id"
                            class="relative pl-8 md:pl-10 border-l-2 border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-500 transition-colors duration-300">
                            <!-- Bullet Point/Icon (Background fixed to match card bg) -->
                            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border-4 border-green-500">
                            </div>

                            <div class="group">
                                <h4 class="text-xl font-bold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition mb-2 flex items-center">
                                    <!-- Optional Icon from DB -->
                                    <img v-if="item.icon" :src="item.icon" class="w-6 h-6 mr-2 object-contain"
                                        alt="Icon">
                                    {{ item.title }}
                                </h4>
                                <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                    {{ item.description }}
                                </p>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-if="manifestos.length === 0" class="text-center text-gray-400 dark:text-gray-500">
                            <p>ইশতেহার শীঘ্রই প্রকাশিত হবে।</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>