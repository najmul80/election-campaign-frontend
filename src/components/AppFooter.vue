<script setup>
import { useHomeStore } from '@/stores/homeStore'
const store = useHomeStore()

// ডিফল্ট লোগো পাথ
const defaultLogo = '/logo.png'
</script>

<template>
  <footer
    class="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8 border-t-8 border-green-600 dark:border-green-800 font-sans relative transition-colors duration-300">

    <!-- Background Texture -->
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

    <div class="container mx-auto px-6 relative z-10">

      <!-- Main Grid (Updated for Mobile Columns) -->
      <!-- ✅ ফিক্স: grid-cols-2 দেওয়া হয়েছে যাতে মোবাইলেও ২ কলাম থাকে -->
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-12">

        <!-- 1. Branding (Full Width on Mobile) -->
        <!-- ✅ col-span-2 দেওয়া হয়েছে যাতে মোবাইলে ব্র্যান্ডিং সেকশনটি পুরো জায়গা নেয় -->
        <div class="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div class="bg-white p-3 rounded-xl border-4 border-green-500 shadow-xl mb-5 inline-block transform hover:scale-105 transition duration-300">
            <img 
              :src="store.settings?.logo || defaultLogo" 
              class="h-16 w-auto object-contain max-w-[140px]" 
              alt="Logo"
              @error="(e) => e.target.src = defaultLogo"
            />
          </div>

          <h2 class="text-2xl font-bold mb-3 text-white dark:text-gray-100 tracking-wide">
            {{ store.settings?.site_name || 'দাড়িপাল্লা' }}
          </h2>

          <p class="text-gray-400 dark:text-gray-500 text-sm leading-relaxed mb-6 max-w-sm mx-auto lg:mx-0">
            {{ store.settings?.meta_description || 'উন্নয়ন ও অগ্রগতির লক্ষ্যে আমাদের এই পথচলা। আপনাদের সমর্থন আমাদের একান্ত কাম্য।' }}
          </p>

          <!-- Social Icons -->
          <div class="flex space-x-3 justify-center lg:justify-start">
            <a v-if="store.settings?.social_links?.facebook" :href="store.settings.social_links.facebook" target="_blank"
               class="w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg text-white transform hover:-translate-y-1 bg-blue-600 hover:bg-white hover:text-blue-600">
              <span class="material-icons text-xl">facebook</span>
            </a>
            <a v-if="store.settings?.social_links?.youtube" :href="store.settings.social_links.youtube" target="_blank"
               class="w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg text-white transform hover:-translate-y-1 bg-red-600 hover:bg-white hover:text-red-600">
              <span class="material-icons text-xl">play_circle</span>
            </a>
            <a v-if="store.settings?.social_links?.twitter" :href="store.settings.social_links.twitter" target="_blank"
               class="w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg text-white transform hover:-translate-y-1 bg-sky-500 hover:bg-white hover:text-sky-500">
              <span class="material-icons text-xl">flutter_dash</span>
            </a>
          </div>
        </div>

        <!-- 2. Quick Links -->
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 class="text-lg font-bold uppercase tracking-wider mb-6 border-b-2 border-green-500 pb-2 inline-block text-white dark:text-gray-200">
            দ্রুত লিঙ্ক
          </h3>
          <ul class="space-y-3 w-full">
            <li><a class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300" href="#candidates">প্রার্থী পরিচিতি</a></li>
            <li><a class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300" href="#manifesto">নির্বাচনী ইশতেহার</a></li>
            <li><a class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300" href="#programs">কর্মসূচিসমূহ</a></li>
            <li><a class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300" href="#gallery">ফটো গ্যালারী</a></li>
            <li><a class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300" href="#contact">যোগাযোগ করুন</a></li>
          </ul>
        </div>

        <!-- 3. Important / Other Links -->
        <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 class="text-lg font-bold uppercase tracking-wider mb-6 border-b-2 border-green-500 pb-2 inline-block text-white dark:text-gray-200">
            গুরুত্বপূর্ণ লিঙ্ক
          </h3>
          <ul class="space-y-3 w-full">
            <li>
              <a href="https://jamaat-e-islami.org/" target="_blank" class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300 flex items-center justify-center lg:justify-start gap-2">
                <span class="material-icons text-sm">public</span> জামায়াতে ইসলামী
              </a>
            </li>
            <li>
              <a href="https://shibir.org.bd/" target="_blank" class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300 flex items-center justify-center lg:justify-start gap-2">
                <span class="material-icons text-sm">school</span> ইসলামী ছাত্রশিবির
              </a>
            </li>
            <li>
              <a href="https://bjilibrary.com/" target="_blank" class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300 flex items-center justify-center lg:justify-start gap-2">
                <span class="material-icons text-sm">library_books</span> বিজেআই লাইব্রেরি
              </a>
            </li>
            <li>
              <a href="https://www.icsbook.info/" target="_blank" class="text-gray-400 hover:text-green-400 dark:text-gray-400 dark:hover:text-green-500 transition block hover:translate-x-1 duration-300 flex items-center justify-center lg:justify-start gap-2">
                <span class="material-icons text-sm">menu_book</span> আইসিএস বুক
              </a>
            </li>
          </ul>
        </div>

        <!-- 4. Address (Full Width on Mobile) -->
        <div class="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-end text-center lg:text-right mt-4 lg:mt-0">
          <h3 class="text-lg font-bold uppercase tracking-wider mb-6 border-b-2 border-green-500 pb-2 inline-block text-white dark:text-gray-200">
            ঠিকানা
          </h3>
          <ul class="space-y-5 w-full flex flex-col items-center lg:items-end">
            <li v-if="store.settings?.contact_address" class="flex flex-col lg:flex-row items-center gap-3 group">
              <span class="text-gray-400 dark:text-gray-300 text-sm lg:max-w-[200px] order-2 lg:order-1">{{ store.settings.contact_address }}</span>
              <div class="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-green-600 transition shrink-0 order-1 lg:order-2 shadow-md">
                <span class="material-icons text-green-500 group-hover:text-white transition">location_on</span>
              </div>
            </li>
            <li v-if="store.settings?.contact_phone" class="flex flex-col lg:flex-row items-center gap-3 group">
              <a :href="`tel:${store.settings.contact_phone}`" class="text-gray-400 dark:text-gray-300 hover:text-white transition order-2 lg:order-1 text-lg font-bold">
                {{ store.settings.contact_phone }}
              </a>
              <div class="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-green-600 transition shrink-0 order-1 lg:order-2 shadow-md">
                <span class="material-icons text-green-500 group-hover:text-white transition">phone</span>
              </div>
            </li>
            <li v-if="store.settings?.contact_email" class="flex flex-col lg:flex-row items-center gap-3 group">
              <a :href="`mailto:${store.settings.contact_email}`" class="text-gray-400 dark:text-gray-300 hover:text-white transition order-2 lg:order-1 text-sm">
                {{ store.settings.contact_email }}
              </a>
              <div class="w-10 h-10 bg-gray-800 dark:bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-green-600 transition shrink-0 order-1 lg:order-2 shadow-md">
                <span class="material-icons text-green-500 group-hover:text-white transition">email</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <!-- Footer Bottom -->
      <div class="border-t border-gray-800 dark:border-gray-900 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
        <p class="text-center md:text-left">
          &copy; {{ new Date().getFullYear() }}
          <span class="text-green-500 font-bold">{{ store.settings?.site_name }}</span>
          | সর্বস্বত্ব সংরক্ষিত
        </p>
        <div class="flex space-x-6">
          <a class="hover:text-white transition underline decoration-dotted" href="#">গোপনীয়তা নীতি</a>
          <a class="hover:text-white transition underline decoration-dotted" href="#">শর্তাবলী</a>
        </div>
      </div>

    </div>
  </footer>
</template>