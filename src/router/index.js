import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'
import AllNewsView from '../views/AllNewsView.vue'
import AllGalleryView from '../views/AllGalleryView.vue'
import CandidateDetailView from '../views/CandidateDetailView.vue'
import AllVideoView from '@/views/AllVideoView.vue'
import ProgramDetailView from '@/views/ProgramDetailView.vue'
import AllPosterView from '../views/AllPosterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/news/:slug',
      name: 'news-detail',
      component: NewsDetailView,
    },
    { path: '/all-news', name: 'all-news', component: AllNewsView },
    { path: '/all-gallery', name: 'all-gallery', component: AllGalleryView },
    {
      path: '/candidate/:id',
      name: 'candidate-detail',
      component: CandidateDetailView,
    },
    {
      path: '/all-videos',
      name: 'all-videos',
      component: AllVideoView,
    },
    {
      path: '/program/:id',
      name: 'program-detail',
      component: ProgramDetailView,
    },
    {
      path: '/all-posters',
      name: 'all-posters',
      component: AllPosterView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
