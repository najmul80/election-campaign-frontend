<script setup>
import { onMounted, computed } from 'vue'
import { useHomeStore } from '@/stores/homeStore'

// Components
import AppHeader from '@/components/AppHeader.vue'
import HeroSlider from '@/components/HeroSlider.vue'
import CandidateSection from '@/components/CandidateSection.vue'
import QuoteSection from '@/components/QuoteSection.vue'
import ManifestoSection from '@/components/ManifestoSection.vue'
import ProgramSection from '@/components/ProgramSection.vue'
import PosterSection from '@/components/PosterSection.vue'
import GallerySection from '@/components/GallerySection.vue'
import VideoSection from '@/components/VideoSection.vue'
import NewsSection from '@/components/NewsSection.vue'
import VolunteerSection from '@/components/VolunteerSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import AppFooter from '@/components/AppFooter.vue'

const store = useHomeStore()

// --- Vote Appeal Logic (Dynamic Data) ---
const defaultData = {
  logo: '/logo.png',
  name: 'দাড়িপাল্লা',
  subtitle: 'উন্নয়ন ও অগ্রগতির লক্ষ্যে আমাদের সাথেই থাকুন',
  btnText: 'সমর্থন জানান',
}

const logoSrc = computed(() => store.settings?.logo || defaultData.logo)
const siteName = computed(() => store.settings?.site_name || defaultData.name)
// ---------------------------------------

onMounted(() => {
  if (!store.sliders.length) {
    store.fetchHomeData()
  }
})
</script>

<template>
  <!-- 👇 CHANGE HERE: প্যাডিং আরও কমানো হয়েছে (pt-14 এবং md:pt-16) -->
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col pt-13 md:pt-14 transition-colors duration-300"
  >
    <!-- Header -->
    <AppHeader />

    <main class="flex-grow">
      <!-- ১. Hero Slider -->
      <HeroSlider :sliders="store.sliders" :loading="store.loading" />

      <!-- ২. Vote Appeal Section (Dynamic Code Inlined) -->
      <section
        class="bg-gradient-to-br from-green-600 to-teal-800 dark:bg-green-950 py-10 overflow-hidden relative transition-colors duration-300 border-t border-b border-transparent dark:border-green-900"
      >
        <!-- Background Decoration (Dynamic Logo) -->
        <div
          class="absolute top-0 left-0 w-full h-full bg-repeat opacity-5 dark:opacity-5 transform scale-50 pointer-events-none"
          :style="{ backgroundImage: `url('${logoSrc}')` }"
        ></div>

        <div
          class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-10 relative z-10"
        >
          <!-- Animated Logo -->
          <div
            class="rounded-full p-1.5 bg-gradient-to-r from-red-500 to-orange-500 shadow-2xl animate-bounce-slow"
          >
            <div class="bg-white dark:bg-gray-200 p-4 rounded-full">
              <img
                :src="logoSrc"
                alt="Marka"
                class="w-20 h-20 md:w-32 md:h-32 object-contain"
                @error="(e) => (e.target.src = defaultData.logo)"
              />
            </div>
          </div>

          <!-- Text Content -->
          <div class="text-center md:text-left text-white">
            <h2 class="text-3xl md:text-5xl font-bold mb-3 text-white drop-shadow-md">
              <span class="text-yellow-300">{{ siteName }}</span> মার্কায় ভোট দিন
            </h2>
            <p
              class="text-green-100 dark:text-green-300 text-lg md:text-xl font-medium tracking-wide"
            >
              {{ store.settings?.meta_description || defaultData.subtitle }}
            </p>
          </div>

          <!-- Action Button -->
          <a
            href="#contact"
            class="px-10 py-4 rounded-full font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block cursor-pointer bg-gradient-to-r from-red-500 to-orange-500 text-white border-2 border-transparent hover:from-white hover:to-white hover:text-red-600 hover:border-red-500"
          >
            {{ defaultData.btnText }}
          </a>
        </div>
      </section>

      <!-- ৩. অন্যান্য সেকশন -->
      <CandidateSection
        :candidates="store.candidates"
        :common-symbol="store.settings?.logo"
        :loading="store.loading"
      />

      <QuoteSection :quotes="store.quotes" :loading="store.loading" />

      <VolunteerSection :loading="store.loading" />

      <ManifestoSection :manifestos="store.manifestos" :loading="store.loading" />

      <ProgramSection :programs="store.programs" :loading="store.loading" />

      <PosterSection :gallery="store.gallery" :loading="store.loading" />

      <GallerySection :gallery="store.gallery" :loading="store.loading" />

      <VideoSection :videos="store.videos" :loading="store.loading" />

      <NewsSection :news="store.news" :loading="store.loading" />

      <ContactSection :loading="store.loading" />
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Mobile Sticky Bottom Bar -->
    <div
      class="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 flex justify-around py-3 px-2 transition-colors duration-300"
    >
      <a
        href="#candidates"
        class="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
      >
        <span class="material-icons text-green-600 dark:text-green-500">people</span>
        <span class="text-[10px] font-bold mt-1">প্রার্থী</span>
      </a>

      <a href="#contact" class="flex flex-col items-center justify-center -mt-8">
        <div
          class="w-14 h-14 bg-green-600 rounded-full shadow-lg flex items-center justify-center border-4 border-gray-50 dark:border-gray-900 text-white animate-pulse transition-colors"
        >
          <span class="material-icons text-2xl">how_to_vote</span>
        </div>
        <span class="text-[10px] font-bold mt-1 text-green-700 dark:text-green-400">ভোট দিন</span>
      </a>

      <a
        href="tel:01700000000"
        class="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
      >
        <span class="material-icons text-green-600 dark:text-green-500">call</span>
        <span class="text-[10px] font-bold mt-1">কল</span>
      </a>
    </div>

    <!-- Padding for Sticky Bar -->
    <div class="h-16 md:hidden bg-gray-50 dark:bg-gray-900 transition-colors"></div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(-5%);
  }
  50% {
    transform: translateY(5%);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}
</style>
