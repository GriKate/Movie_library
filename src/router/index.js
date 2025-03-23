import { createRouter, createWebHistory } from 'vue-router'
import AllMovies from '@/components/AllMovies.vue'
import MovieCard from '@/components/MovieCard.vue'
// import NotFoundComponent from '@/components/NotFoundComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AllMovies,
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieCard,
    },
  ],
})

export default router