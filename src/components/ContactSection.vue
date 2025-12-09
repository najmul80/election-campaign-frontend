<script setup>
import { ref } from 'vue'
import axios from 'axios'

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitLoading = ref(false)
const statusMessage = ref(null)
const statusType = ref('')

const submitContact = async () => {
  submitLoading.value = true
  statusMessage.value = null

  try {
    await axios.post('http://127.0.0.1:8000/api/contact-submit', formData.value)
    statusType.value = 'success'
    statusMessage.value = 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করবো।'
    formData.value = { name: '', email: '', phone: '', subject: '', message: '' }
  } catch (error) {
    console.error(error)
    statusType.value = 'error'
    statusMessage.value = 'দুঃখিত! বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।'
  } finally {
    submitLoading.value = false
  }
}
</script>

<template>
  <!-- Section: Dark bg added -->
  <section id="contact" class="py-10 md:py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="container mx-auto px-4">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">যোগাযোগ</h2>
        <div class="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">আপনার মতামত বা অভিযোগ আমাদের জানান</p>
      </div>

      <!-- ১. স্কেলেটন লোডার (Dark Mode Supported) -->
      <div v-if="loading"
        class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-100 dark:border-gray-700">
        <div class="grid md:grid-cols-2">

          <!-- Left Skeleton -->
          <div class="bg-gray-300 dark:bg-gray-700 p-8 flex flex-col justify-center h-full min-h-[300px]">
            <div class="h-8 bg-gray-400 dark:bg-gray-600 rounded w-1/2 mb-8"></div>
            <div class="space-y-6">
              <div v-for="n in 3" :key="n" class="flex items-start">
                <div class="w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full mr-4"></div>
                <div class="space-y-2 flex-1 pt-1">
                  <div class="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/4"></div>
                  <div class="h-3 bg-gray-400 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Skeleton -->
          <div class="p-8 space-y-5">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="grid grid-cols-2 gap-4">
              <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div class="h-12 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
          </div>

        </div>
      </div>

      <!-- ২. আসল কন্টেন্ট (Dark Mode Added) -->
      <div v-else
        class="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">
        <div class="grid md:grid-cols-2">

          <!-- Contact Info Side -->
          <div class="bg-gradient-to-br from-green-600 to-teal-700 p-8 text-white flex flex-col justify-center">
            <h3 class="text-2xl font-bold mb-6">আমাদের ঠিকানা</h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <span class="material-icons bg-white/20 p-2 rounded-full mr-4">location_on</span>
                <div>
                  <h4 class="font-semibold">অফিস</h4>
                  <p class="text-green-100 text-sm">সিরাজগঞ্জ সদর, সিরাজগঞ্জ-৬০০০</p>
                </div>
              </div>

              <div class="flex items-start">
                <span class="material-icons bg-white/20 p-2 rounded-full mr-4">phone</span>
                <div>
                  <h4 class="font-semibold">ফোন</h4>
                  <p class="text-green-100 text-sm">০১৭১২-৩৪৫৬৭৮</p>
                </div>
              </div>

              <div class="flex items-start">
                <span class="material-icons bg-white/20 p-2 rounded-full mr-4">email</span>
                <div>
                  <h4 class="font-semibold">ইমেইল</h4>
                  <p class="text-green-100 text-sm">info@election.com</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Side -->
          <div class="p-8">
            <h3 class="text-xl font-bold mb-6 text-gray-800 dark:text-white">বার্তা পাঠান</h3>

            <form @submit.prevent="submitContact" class="space-y-4">
              <div>
                <input v-model="formData.name" type="text" placeholder="আপনার নাম" required
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 outline-none transition">
              </div>

              <div class="grid grid-cols-2 gap-4">
                <input v-model="formData.phone" type="text" placeholder="মোবাইল নম্বর"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 outline-none transition">
                <input v-model="formData.email" type="email" placeholder="ইমেইল (অপশনাল)"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 outline-none transition">
              </div>

              <div>
                <input v-model="formData.subject" type="text" placeholder="বিষয়"
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 outline-none transition">
              </div>

              <div>
                <textarea v-model="formData.message" rows="4" placeholder="আপনার বার্তা লিখুন..." required
                  class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-800 outline-none transition"></textarea>
              </div>

              <!-- Status Message -->
              <div v-if="statusMessage"
                :class="statusType === 'success' ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'"
                class="p-3 rounded text-sm text-center">
                {{ statusMessage }}
              </div>

              <button type="submit" :disabled="submitLoading"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition transform active:scale-95 disabled:opacity-50 flex justify-center items-center">
                <span v-if="submitLoading" class="material-icons animate-spin mr-2 text-sm">autorenew</span>
                {{ submitLoading ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান' }}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>