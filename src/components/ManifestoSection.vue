<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
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

const activeTab = ref('central') // ডিফল্টভাবে কেন্দ্রীয় ইশতেহার

// ১. ইউনিক ট্যাব তৈরি করা (যাদের ইশতেহার আছে শুধু তাদের নাম আসবে)
const tabs = computed(() => {
    const list = [{ label: 'কেন্দ্রীয় ইশতেহার', value: 'central' }]
    
    // ইউনিক ক্যান্ডিডেট/আসন বের করা
    const candidates = new Map()
    props.manifestos.forEach(m => {
        if (m.candidate_id && m.constituency) {
            if (!candidates.has(m.candidate_id)) {
                candidates.set(m.candidate_id, {
                    label: m.constituency, // ট্যাবে আসনের নাম দেখাবে (যেমন: সিরাজগঞ্জ-১)
                    value: m.candidate_id
                })
            }
        }
    })
    
    return [...list, ...candidates.values()]
})

// ২. ফিল্টার করা ইশতেহার
const filteredManifestos = computed(() => {
    if (activeTab.value === 'central') {
        // যাদের candidate_id নেই তারা কেন্দ্রীয়
        return props.manifestos.filter(m => !m.candidate_id)
    }
    // নির্দিষ্ট প্রার্থীর ইশতেহার
    return props.manifestos.filter(m => m.candidate_id === activeTab.value)
})
</script>

<template>
    <section id="manifesto" class="py-10 md:py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div class="container mx-auto px-4">
            <div class="text-center mb-8">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">নির্বাচনী ইশতেহার</h2>
                <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">উন্নয়নের লক্ষ্যে আমাদের সুনির্দিষ্ট পরিকল্পনাসমূহ</p>
            </div>

            <div class="max-w-4xl mx-auto">

                <!-- 🔥 Filter Tabs (Horizontal Scrollable on Mobile) -->
                <div v-if="!loading" class="flex flex-nowrap overflow-x-auto md:flex-wrap justify-start md:justify-center gap-3 mb-8 pb-2 no-scrollbar">
                    <button 
                        v-for="tab in tabs" 
                        :key="tab.value"
                        @click="activeTab = tab.value"
                        class="px-5 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap border"
                        :class="activeTab === tab.value 
                            ? 'bg-green-600 text-white border-green-600 shadow-lg scale-105' 
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-green-500'"
                    >
                        {{ tab.label }}
                    </button>
                </div>

                <!-- ১. স্কেলেটন লোডার -->
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

                <!-- ২. আসল কন্টেন্ট -->
                <div v-else class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden transition-colors duration-300 border border-transparent dark:border-gray-700 min-h-[300px]">
                    <!-- Decorative Background -->
                    <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-100 dark:bg-green-900/20 rounded-full opacity-50 blur-2xl"></div>

                    <h3 class="text-2xl font-bold mb-8 text-green-700 dark:text-green-400 flex items-center">
                        <span class="material-icons mr-2">verified</span>
                        {{ activeTab === 'central' ? 'আমাদের প্রতিশ্রুতিসমূহ' : 'এলাকা ভিত্তিক প্রতিশ্রুতি' }}
                    </h3>

                    <!-- Transition Group for smooth filtering -->
                    <transition-group name="list" tag="div" class="space-y-8">
                        <div v-for="(item, index) in filteredManifestos" :key="item.id"
                            class="relative pl-8 md:pl-10 border-l-2 border-green-200 dark:border-green-800 hover:border-green-500 dark:hover:border-green-500 transition-colors duration-300">
                            
                            <!-- Bullet Point -->
                            <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-800 border-4 border-green-500"></div>

                            <div class="group">
                                <h4 class="text-xl font-bold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition mb-2 flex items-center">
                                    <img v-if="item.icon" :src="item.icon" class="w-6 h-6 mr-2 object-contain" alt="Icon">
                                    {{ item.title }}
                                </h4>
                                <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                    {{ item.description }}
                                </p>
                                <!-- Candidate Tag (If filtered but wanted to show name) -->
                                <p v-if="item.candidate_name && activeTab !== 'central'" class="text-xs text-green-600 mt-2 font-semibold">
                                    প্রস্তাবক: {{ item.candidate_name }}
                                </p>
                            </div>
                        </div>
                    </transition-group>

                    <!-- Empty State -->
                    <div v-if="filteredManifestos.length === 0" class="text-center py-10 text-gray-400 dark:text-gray-500">
                        <span class="material-icons text-4xl mb-2">assignment_late</span>
                        <p>এই ক্যাটাগরিতে কোনো ইশতেহার নেই।</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* List Animation */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>