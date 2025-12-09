<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useHomeStore } from '@/stores/homeStore'
import { useRouter, useRoute } from 'vue-router'

const store = useHomeStore()
const router = useRouter()
const route = useRoute()

// ডিফল্ট লোগো পাথ (public ফোল্ডার থেকে)
const defaultLogo = '/logo.png' 

// State
const isMobileMenuOpen = ref(false)
const isDark = ref(false)
const isScrolled = ref(false)

const menuItems = [
  { label: 'প্রার্থীরা', id: 'candidates' },
  { label: 'কর্মসূচি', id: 'programs' },
  { label: 'গ্যালারী', id: 'gallery' },
  { label: 'সংবাদ', id: 'news' },
  { label: 'যোগাযোগ', id: 'contact', isButton: true }
]

// --- ডার্ক মোড লজিক ---
const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  const htmlTag = document.documentElement
  if (isDark.value) {
    htmlTag.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    htmlTag.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// --- স্ক্রল হ্যান্ডলার ---
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark'
  updateTheme()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// --- নেভিগেশন ---
watch(route, () => {
  isMobileMenuOpen.value = false
})

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : 'auto'
}

const navigateToSection = async (sectionId) => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = 'auto'

  if (route.name !== 'home') {
    await router.push('/')
    setTimeout(() => scrollToElement(sectionId), 300)
  } else {
    scrollToElement(sectionId)
  }
}

const handleLogoClick = async () => {
  if (route.name === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    await router.push('/')
  }
}

const scrollToElement = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
  }
}
</script>

<template>
<header
  class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b" :class="[ isScrolled ? 'py-2 shadow-xl bg-gradient-to-br from-green-600/95 to-teal-700/95 dark:bg-gradient-to-br dark:from-gray-900/95 dark:via-gray-800/95 dark:to-black/95 border-teal-600 dark:border-gray-800' : 'py-4 bg-gradient-to-br from-green-500 to-teal-600 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black border-transparent dark:border-transparent'
  ]"
>
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center">
        
        <!-- Logo Area (Updated) -->
        <a @click.prevent="handleLogoClick" class="flex items-center gap-3 z-50 cursor-pointer group">
          <div class="bg-white rounded-full p-1 shadow-lg transition-transform duration-300 group-hover:scale-110 ring-2 ring-white/20"
               :class="isScrolled ? 'w-10 h-10' : 'w-12 h-12'">
            <!-- ✅ লোগো লজিক আপডেট: সেটিংস লোগো অথবা ডিফল্ট লোগো -->
            <img 
              :src="store.settings?.logo || defaultLogo" 
              alt="Logo" 
              class="w-full h-full object-contain"
              @error="(e) => e.target.src = defaultLogo" 
            >
          </div>
          <div>
            <h1 class="font-bold tracking-wider text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-orange-400"
                :class="isScrolled ? 'text-lg' : 'text-2xl'">
                {{ store.settings?.site_name || 'দাড়িপাল্লা' }}
            </h1>
          </div>
        </a>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-4">
            
            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-1">
              <template v-for="item in menuItems" :key="item.id">
                <button 
                  @click="navigateToSection(item.id)"
                  class="px-5 py-2 rounded-full font-bold text-white transition-all duration-300 
                         hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:shadow-lg hover:-translate-y-0.5">
                  {{ item.label }}
                </button>
              </template>
            </div>

            <!-- Dark Mode Toggle -->
            <button @click="toggleTheme"
                class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/30 z-50 group"
                :title="isDark ? 'Switch to Light' : 'Switch to Dark'">
                <span v-if="isDark" class="material-icons text-yellow-300 text-xl animate-spin-slow group-hover:scale-110 transition-transform">light_mode</span>
                <span v-else class="material-icons text-white text-xl animate-pulse group-hover:scale-110 transition-transform">dark_mode</span>
            </button>

            <!-- Mobile Hamburger -->
            <button @click="toggleMenu" class="md:hidden z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none group">
              <span class="w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-yellow-300 shadow-sm" :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"></span>
              <span class="w-4 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-yellow-300 shadow-sm group-hover:w-6" :class="{ 'opacity-0': isMobileMenuOpen }"></span>
              <span class="w-6 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:bg-yellow-300 shadow-sm" :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"></span>
            </button>
        </div>

      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      class="fixed inset-0 bg-gradient-to-br from-green-600/95 to-teal-700/95 dark:from-gray-900/95 dark:to-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'">
      
      <template v-for="item in menuItems" :key="item.id">
          <button 
            @click="navigateToSection(item.id)"
            class="text-xl font-bold text-white px-10 py-3 rounded-full border-2 border-white/20 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-500 hover:scale-105">
            {{ item.label }}
          </button>
      </template>

    </div>
  </header>
</template>

<style scoped>
.animate-spin-slow {
  animation: spin 4s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>