<script setup>
import { ref } from 'vue'
import api from '@/axios'

// ১. loading প্রপ রিসিভ করা
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const volunteerForm = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  interested_area: '',
})

const submitLoading = ref(false)
const showSuccess = ref(false)

const submitVolunteer = async () => {
  submitLoading.value = true
  try {
    await api.post('/api/volunteer-submit', volunteerForm.value)
    showSuccess.value = true
    volunteerForm.value = { name: '', phone: '', email: '', address: '', interested_area: '' }

    setTimeout(() => (showSuccess.value = false), 5000)
  } catch (error) {
    alert('রেজিস্ট্রেশন ব্যর্থ হয়েছে। দয়া করে আবার চেষ্টা করুন।')
    console.error(error)
  } finally {
    submitLoading.value = false
  }
}
</script>

<template>
  <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
  <section
    v-if="loading"
    class="py-10 md:py-10 bg-gray-100 dark:bg-gray-900 animate-pulse transition-colors duration-300"
  >
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Side Text Skeleton -->
        <div class="space-y-6">
          <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div class="space-y-2 pt-4">
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
          <div class="flex gap-4 pt-4">
            <div class="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div class="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>

        <!-- Right Side Form Skeleton -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 border border-transparent dark:border-gray-700"
        >
          <div class="h-8 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto mb-6"></div>

          <div class="space-y-3">
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <!-- Name -->

            <div class="grid grid-cols-2 gap-3">
              <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <!-- Phone -->
              <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <!-- Area -->
            </div>

            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <!-- Email -->
            <div class="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <!-- Address -->

            <div class="h-12 bg-gray-300 dark:bg-gray-600 rounded w-full mt-2"></div>
            <!-- Button -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ২. আসল কন্টেন্ট (Dark Mode Added) -->
  <section
    v-else
    class="py-10 md:py-10 bg-gradient-to-r from-green-600 to-teal-700 dark:from-green-900 dark:to-teal-900 text-white relative overflow-hidden transition-colors duration-300"
  >
    <!-- Decorative Circle -->
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full -ml-10 -mb-10 pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="text-center md:text-left">
          <h2 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            দেশ ও দশের সেবায়<br />আমাদের সাথে যোগ দিন
          </h2>
          <p class="text-green-100 text-lg mb-8">
            স্বেচ্ছাসেবক হিসেবে যোগ দিয়ে সিরাজগঞ্জের উন্নয়নে আপনিও ভূমিকা রাখতে পারেন। আজই
            রেজিস্ট্রেশন করুন।
          </p>
          <div class="flex flex-wrap justify-center md:justify-start gap-4">
            <div class="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <span class="material-icons mr-2">verified</span> সমাজসেবা
            </div>
            <div class="flex items-center bg-white/20 px-4 py-2 rounded-full">
              <span class="material-icons mr-2">verified</span> নেতৃত্ব
            </div>
          </div>
        </div>

        <!-- Registration Form -->
        <div
          class="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-2xl p-6 md:p-8 border border-transparent dark:border-gray-700 transition-colors duration-300"
        >
          <h3 class="text-2xl font-bold mb-4 text-center text-green-700 dark:text-green-400">
            স্বেচ্ছাসেবক রেজিস্ট্রেশন
          </h3>

          <form @submit.prevent="submitVolunteer" class="space-y-3">
            <input
              v-model="volunteerForm.name"
              type="text"
              placeholder="আপনার নাম"
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            <div class="grid grid-cols-2 gap-3">
              <input
                v-model="volunteerForm.phone"
                type="text"
                placeholder="মোবাইল নম্বর"
                required
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                v-model="volunteerForm.interested_area"
                type="text"
                placeholder="আগ্রহী এলাকা"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <input
              v-model="volunteerForm.email"
              type="email"
              placeholder="ইমেইল (যদি থাকে)"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <textarea
              v-model="volunteerForm.address"
              rows="2"
              placeholder="আপনার ঠিকানা"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>

            <button
              type="submit"
              :disabled="submitLoading"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex justify-center items-center shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="submitLoading" class="material-icons animate-spin mr-2 text-sm"
                >autorenew</span
              >
              {{ submitLoading ? 'সাবমিট হচ্ছে...' : 'জমা দিন' }}
            </button>
          </form>

          <!-- Success Alert -->
          <div
            v-if="showSuccess"
            class="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-center text-sm font-semibold animate-fade-in border border-green-200 dark:border-green-800"
          >
            অভিনন্দন! আপনার রেজিস্ট্রেশন সফল হয়েছে।
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
