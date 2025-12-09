<script setup>
import { defineProps } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
// Lazy মডিউল বাদ দেওয়া হয়েছে (Native lazy loading ভালো কাজ করে)
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules'

// Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const props = defineProps({
  sliders: {
    type: Array,
    required: false,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const modules = [EffectCoverflow, Pagination, Navigation, Autoplay]

const swiperOptions = {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  // স্লাইড ট্রানজিশন স্পিড (১ সেকেন্ড)
  speed: 1000,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  // ✅ সব সময় স্লাইড করার কনফিগারেশন
  autoplay: {
    delay: 3000, // ৩ সেকেন্ড পর পর চেঞ্জ হবে
    disableOnInteraction: false, // ইউজার টাচ করলেও অটো স্লাইড বন্ধ হবে না
    pauseOnMouseEnter: false, // মাউস নিলেও থামবে না
  },
  pagination: { clickable: true },
  navigation: true,
  loop: true,
}
</script>

<template>
  <!-- ১. স্কেলেটন লোডার -->
  <div
    v-if="loading"
    class="w-full h-[320px] md:h-[500px] bg-gray-200 dark:bg-gray-800 animate-pulse relative transition-colors duration-300"
  >
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="space-y-6 text-center w-3/4 flex flex-col items-center">
        <div class="h-8 md:h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-4 md:h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>

  <!-- ২. মেইন স্লাইডার -->
  <section
    v-else-if="sliders.length > 0"
    class="py-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden"
  >
    <Swiper v-bind="swiperOptions" :modules="modules" class="mySwiper w-full py-4">
      <SwiperSlide
        v-for="(slide, index) in sliders"
        :key="slide.id ?? index"
        class="bg-black rounded-2xl overflow-hidden shadow-2xl relative group"
      >
        <!-- Image (Standard Lazy Load) -->
        <img
          :src="slide.image_url"
          class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          :alt="slide.title || 'slider image'"
          loading="lazy"
        />

        <!-- Overlay Gradient -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        ></div>

        <!-- Content -->
        <div class="absolute bottom-0 left-0 w-full p-6 md:p-10 text-center md:text-left">
          <h2 class="text-xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
            {{ slide.title }}
          </h2>

          <p
            v-if="slide.subtitle"
            class="text-xs md:text-lg text-gray-200 mb-4 md:mb-6 line-clamp-2"
          >
            {{ slide.subtitle }}
          </p>

          <div v-if="slide.button_text">
            <!-- <a :href="slide.button_link || '#'"
               class="bg-green-600 hover:bg-green-500 text-white text-xs md:text-base font-bold py-2 px-6 rounded-full shadow-lg transition transform hover:-translate-y-1 inline-flex items-center">
              {{ slide.button_text }}
              <span class="material-icons text-sm ml-1">arrow_forward</span>
            </a> -->
            <a
              :href="slide.button_link || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-green-600 hover:bg-green-500 text-white text-xs md:text-base font-bold py-2 px-6 rounded-full shadow-lg transition transform hover:-translate-y-1 inline-flex items-center"
            >
              {{ slide.button_text }}
              <span class="material-icons text-sm ml-1">arrow_forward</span>
            </a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>

  <!-- ৩. ফলব্যাক -->
  <div
    v-else
    class="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
  >
    <p>কোনো স্লাইডার পাওয়া যায়নি</p>
  </div>
</template>

<style scoped>
.swiper-slide {
  width: 85%;
  height: 280px;
}

@media (min-width: 768px) {
  .swiper-slide {
    width: 60%;
    height: 450px;
  }
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #16a34a !important;
}
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
