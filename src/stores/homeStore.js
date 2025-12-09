import { defineStore } from 'pinia'
import api from '@/axios'

export const useHomeStore = defineStore('home', {
  state: () => ({
    settings: null,
    sliders: [],
    candidates: [],
    manifestos: [],
    programs: [],
    gallery: [],
    videos: [],
    quotes: [],
    news: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchHomeData() {
      this.loading = true

      try {
        // আপনার ব্যাকএন্ড API URL
        const response = await api.get('/api/home-data')

        const data = response.data.data

        this.settings = data.settings
        this.sliders = data.sliders
        this.candidates = data.candidates
        this.manifestos = data.manifestos
        this.programs = data.programs
        this.gallery = data.gallery
        this.videos = data.videos
        this.quotes = data.quotes
        this.news = data.news
      } catch (err) {
        console.error('API Error:', err)
        this.error = 'ডাটা লোড করতে সমস্যা হচ্ছে।'
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 3000)
      }
    },
  },
})
