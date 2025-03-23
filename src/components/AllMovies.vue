<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
// import styles from './AllMovies.module.scss';
import MovieCard from './MovieCard.vue';

import { useMovieStore } from '@/store';
const movieStore = useMovieStore();

async function fetchData() { 
  const response = await axios.get('https://mashroom-movies-api.netlify.app/api/movies');
  movieStore.setMovies(response.data.data.slice(0, 4)) 
  movieStore.setSortedMovies(response.data.data.slice(0, 4)) 
  // console.log('запрос всех фильмов')
} 

onMounted(async () => { 
  await fetchData();
})
</script>

<template>
    <template v-if="movieStore.showSortByName || movieStore.showSortByYear">
      <ul>
        <MovieCard v-for="movie in movieStore.sortedMovies" :key="movie.id" :movie="movie"/>
      </ul>
    </template>
    <template v-else-if="movieStore.movies.length">
      <ul>
        <MovieCard v-for="movie in movieStore.movies" :key="movie.id" :movie="movie"/>
      </ul>
    </template>
    <p v-else>К сожалению, по вашему запросу ничего не найдено...</p>
  <!-- </template> -->
  <!-- <template v-else>
    <RouterView />
  </template> -->
</template>

<style module>
</style>
