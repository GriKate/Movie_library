import { createRouter, createWebHistory } from 'vue-router'
import AllMovies from '@/components/AllMovies.vue'
import MovieCard from '@/components/MovieCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AllMovies,
      children: [
        {
          path: '/movie/:id',
          component: MovieCard
        }
      ]
    },
    // {
    //   path: '/movie/:id',
    //   name: 'movie',
    //   component: MovieCard,
    // },
  ],
})

export default router