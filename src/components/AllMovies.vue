<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import styles from './AllMovies.module.scss';
import MovieCard from './MovieCard.vue';

import { useMovieStore } from '@/store';
const movieStore = useMovieStore();

const preloader = ref(false);

async function fetchData() { 
  const reqString = 'https://mashroom-movies-api.netlify.app/api/movies';
  await axios.get(reqString)
    .then(res => {
      preloader.value = false;
      if(res.status === 200 && res.data) {
        movieStore.setMovies(res.data.data);
      }
    })
    .catch(function(error) {
      preloader.value = false;
      alert(error.message)
    });

  // console.log('запрос всех фильмов')
} 

onMounted(async () => { 
  if (movieStore.movies.length === 0) {
    preloader.value = true;
    await fetchData();
  }
})

function sortByName() {
  const sortedMovies = movieStore.movies.toSorted((a, b) => {
    if (isNaN(+a.title[0]) && !isNaN(+b.title[0])){
      return -1
    } else if (!isNaN(+a.title[0]) && isNaN(+b.title[0])) {
      return 1
    }
    return new Intl.Collator("en").compare(a.title, b.title)
  });
  
  return sortedMovies;
}
function sortByYear() {
	const sortedMovies = movieStore.movies.toSorted((a, b) => a.year - b.year);
  return sortedMovies;
}
</script>

<template>

  <template v-if="preloader">
    <div :class="styles.preloadWrapper">
      <span :class="styles.preload"></span>
    </div>
  </template>

  <template v-else-if="!movieStore.movies.length && !preloader">
    <p>К сожалению, по вашему запросу ничего не найдено...</p>
  </template>

  <template v-else>
    <template v-if="movieStore.showSortByName">
      <ul>
        <li v-for="movie in sortByName()" :key="movie.id">
          <MovieCard :movie="movie"/>
        </li>
      </ul>
    </template>
    <template v-else-if="movieStore.showSortByYear">
      <ul>
        <li v-for="movie in sortByYear()" :key="movie.id">
          <MovieCard :movie="movie"/>
        </li>
      </ul>
    </template>
    <template v-else-if="movieStore.movies.length">
      <ul>
        <li v-for="movie in movieStore.movies" :key="movie.id">
          <MovieCard :movie="movie"/>
        </li>
      </ul>
    </template>
  </template>
    
</template>

<style module>
</style>
