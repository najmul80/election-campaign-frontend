<script setup>
import { ref } from 'vue'
import api from '@/axios'

// প্যারেন্ট থেকে ডাটা রিসিভ করা হচ্ছে
const props = defineProps({
  blogId: {
    type: Number,
    required: true,
  },
  comments: {
    type: Array,
    default: () => [],
  },
})

const form = ref({
  name: '',
  message: '',
})

const loading = ref(false)
const successMessage = ref(null)
const errorMessage = ref(null)

const submitComment = async () => {
  loading.value = true
  successMessage.value = null
  errorMessage.value = null

  try {
    await api.post('/api/comment-submit', {
      blog_id: props.blogId,
      name: form.value.name,
      message: form.value.message,
    })

    successMessage.value = 'ধন্যবাদ! আপনার মন্তব্যটি অ্যাডমিনের অনুমোদনের জন্য জমা হয়েছে।'
    form.value = { name: '', message: '' } // ফর্ম রিসেট

    // ৫ সেকেন্ড পর মেসেজ সরিয়ে ফেলা
    setTimeout(() => (successMessage.value = null), 5000)
  } catch (error) {
    console.error(error)
    errorMessage.value = 'দুঃখিত! মন্তব্য পাঠানো যায়নি। আবার চেষ্টা করুন।'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="mt-12 bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 transition-colors duration-300"
  >
    <!-- Header -->
    <div class="flex items-center gap-2 mb-8">
      <span class="material-icons text-green-600 dark:text-green-400">forum</span>
      <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
        মতামত ({{ comments.length }})
      </h3>
    </div>

    <!-- 1. Comment List -->
    <div class="space-y-6 mb-12">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors"
      >
        <div class="flex items-start gap-4">
          <!-- Avatar (First Letter) -->
          <div
            class="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-lg shrink-0"
          >
            {{ comment.name.charAt(0).toUpperCase() }}
          </div>

          <div class="flex-grow">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-bold text-gray-800 dark:text-white text-base">{{ comment.name }}</h4>
              <span
                class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
              >
                {{ comment.date }}
              </span>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {{ comment.message }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="comments.length === 0"
        class="text-center py-6 text-gray-500 dark:text-gray-400 italic bg-white dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700"
      >
        এখনো কোনো মন্তব্য নেই। আপনিই প্রথম মন্তব্য করুন!
      </div>
    </div>

    <!-- 2. Comment Form -->
    <div
      class="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
    >
      <h4
        class="text-lg font-bold mb-6 text-gray-800 dark:text-white border-b dark:border-gray-700 pb-2 inline-block"
      >
        আপনার মতামত দিন
      </h4>

      <form @submit.prevent="submitComment" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >আপনার নাম</label
          >
          <input
            v-model="form.name"
            type="text"
            placeholder="নাম লিখুন"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >আপনার মন্তব্য</label
          >
          <textarea
            v-model="form.message"
            rows="3"
            placeholder="এখানে লিখুন..."
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          ></textarea>
        </div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            :disabled="loading"
            class="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <span v-if="loading" class="material-icons animate-spin mr-2 text-sm">autorenew</span>
            {{ loading ? 'পাঠানো হচ্ছে...' : 'সাবমিট করুন' }}
          </button>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm text-center font-medium animate-pulse"
        >
          <span class="material-icons text-sm align-middle mr-1">check_circle</span>
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm text-center font-medium"
        >
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>
