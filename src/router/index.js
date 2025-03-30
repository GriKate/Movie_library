import { createRouter, createWebHistory } from 'vue-router';
import AllMovies from '@/components/AllMovies.vue';
import MovieCard from '@/components/MovieCard.vue';
import MovieLibrary from '@/components/MovieLibrary.vue';
// import NotFoundComponent from '@/components/NotFoundComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MovieLibrary,
      children: [
        {
          path: '/',
          component: AllMovies
        },
        {
          path: '/movie/:id',
          component: MovieCard
        }
      ]
    },
  ],
})

export default router