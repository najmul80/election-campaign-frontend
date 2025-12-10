<script setup>
import { onMounted } from 'vue'
import { useHomeStore } from '@/stores/homeStore'

// Components
import AppHeader from '@/components/AppHeader.vue'
import HeroSlider from '@/components/HeroSlider.vue'
import CandidateSection from '@/components/CandidateSection.vue'
import VoteAppealSection from '@/components/VoteAppealSection.vue'
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

onMounted(() => {
  if (!store.sliders.length) {
    store.fetchHomeData()
  }
})
</script>

<template>
  <!-- Main Wrapper: Dark Mode Background Added -->
  <div
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300"
  >
    <!-- Header -->
    <AppHeader />

    <main class="flex-grow">
      <!-- ১. Hero Slider (Skeleton সহ) -->
      <HeroSlider :sliders="store.sliders" :loading="store.loading" />

      <!-- Vote Appeal Section -->
      <VoteAppealSection />

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

    <!-- Mobile Sticky Bottom Bar (Dark Mode Supported) -->
    <div
      class="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 flex justify-around py-3 px-2 transition-colors duration-300"
    >
      <a
        href="#candidates"
        @click="store.navigateToSection('candidates')"
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
