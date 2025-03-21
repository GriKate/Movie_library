<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
// import styles from './AllMovies.module.scss';
import MovieCard from './MovieCard.vue';

const movies = ref([]);
const sortedMovies = ref([]);
const showSortByName = ref(false);
const showSortByYear = ref(false);

async function fetchData() { 
  const response = await axios.get('https://mashroom-movies-api.netlify.app/api/movies') 
  movies.value = response.data.data.slice(0, 4); 
  sortedMovies.value = response.data.data.slice(0, 4);
} 

onMounted(async () => { 
  await fetchData();
})

// onMounted(() => {
  // fetch('https://mashroom-movies-api.netlify.app/api/movies')
  //     .then(res => res.json())
  //     .then(data => {
  //       movies.value = data.data.slice(0, 4);
  //       sortedMovies.value = data.data.slice(0, 4);
  //     });
// })

const handleSort = (arg) => {
	if(arg === 'year') {
    showSortByName.value = false;
    compYear.value && sortByYear()
	} else if (arg === 'name') {
    showSortByYear.value = false;
    compName.value && sortByName()
	}
}

const compName = computed(() => {return showSortByName})
const compYear = computed(() => {return showSortByYear})

function sortByName() {
	sortedMovies.value.sort((a, b) => a.title.localeCompare(b.title))
	console.log(sortedMovies)
}
function sortByYear() {
	sortedMovies.value.sort((a, b) => a.year - b.year)
	console.log(sortedMovies)
}


</script>

<!-- <template>
    <div :class="styles.container">Movies</div>
      <p :class="$style.red">
      Текст
    </p>
</template> -->

<template>
  <div>
    year <input type="checkbox" v-model="showSortByYear" @click="handleSort('year')">
    name <input type="checkbox" v-model="showSortByName" @click="handleSort('name')">
    <!-- <p>{{showSortByYear}}</p>
    <p>{{showSortByName}}</p> -->
  </div>
  <template v-if="showSortByName || showSortByYear">
    <ul>
      <MovieCard v-for="movie in sortedMovies" :key="movie.id" :movie="movie"/>
    </ul>
  </template>
  <template v-else-if="movies.length">
    <ul>
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie"/>
    </ul>
  </template>
  <p v-else>К сожалению, по вашему запросу ничего не найдено...</p>
</template>

<style module lang="scss">
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>