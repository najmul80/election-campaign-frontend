<script setup>
import { ref, watch } from 'vue'
import { useHomeStore } from '@/stores/homeStore'

const store = useHomeStore()
const showPopup = ref(false)
const defaultPopup = '/logo.png' // ফলব্যাক ইমেজ

const closePopup = () => {
  showPopup.value = false
  sessionStorage.setItem('popupClosed', 'true')
}

const handleImageError = (e) => {
  // যদি ইমেজ লোড না হয়, পপআপ বন্ধ করে দিবে অথবা ডিফল্ট দেখাবে
  // e.target.src = defaultPopup 
  showPopup.value = false // ইমেজ না থাকলে পপআপ না দেখানোই ভালো
}

// স্টোর থেকে সেটিংস আসলে চেক করবে পপ-আপ দেখাবে কিনা
watch(() => store.settings, (newSettings) => {
  if (newSettings) {
    const isClosedBefore = sessionStorage.getItem('popupClosed')
    
    // চেক: অ্যাডমিন অন রেখেছে? আগে ক্লোজ করেনি? এবং ইমেজ আছে?
    if (newSettings.is_popup_active && !isClosedBefore && newSettings.popup_image) {
      setTimeout(() => {
        showPopup.value = true
      }, 2000) // ২ সেকেন্ড পর আসবে
    }
  }
}, { immediate: true })
</script>

<template>
  <div v-if="showPopup" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
     
     <div class="relative bg-transparent max-w-lg w-full transform transition-all scale-100">
        
        <!-- Close Button -->
        <button 
          @click="closePopup" 
          class="absolute -top-4 -right-4 z-50 bg-white text-red-600 rounded-full p-1 hover:scale-110 transition shadow-lg border-2 border-red-600"
          title="বন্ধ করুন"
        >
           <span class="material-icons text-2xl font-bold block">close</span>
        </button>
        
        <!-- Image Container -->
        <div class="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-white">
            <img 
              :src="store.settings?.popup_image" 
              @error="handleImageError"
              alt="Campaign Offer" 
              class="w-full h-auto max-h-[80vh] object-cover block"
            >
            
            <!-- Action Button -->
            <div class="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent flex justify-center">
              <a 
                href="#contact" 
                @click="closePopup"
                class="bg-green-600 text-white px-8 py-2 rounded-full font-bold shadow-lg hover:bg-green-500 transition transform hover:scale-105 border-2 border-white/50 text-sm md:text-base"
              >
                যোগ দিন
              </a>
            </div>
        </div>

     </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>