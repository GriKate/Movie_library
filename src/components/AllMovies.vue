<script setup>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import styles from './AllMovies.module.scss';
import MovieCard from './MovieCard.vue';
import { RouterView } from 'vue-router';

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
  console.log(movies)
})

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

<template>
  <nav :class="styles.nav">
    <template v-if="$route.path === '/'">
      <h1 :class="styles.navHeader">Фильмы</h1>
      <div :class="styles.sortTab">
        <input type="checkbox" 
          v-model="showSortByName" 
          @click="handleSort('name')" 
          id="nameInpt" 
          :class="styles.checkInpt">
        <label for="nameInpt" :class="[styles.inputLabel, { active: showSortByName }]">
          Отсортировать по названию</label>
        <input type="checkbox" 
          v-model="showSortByYear" 
          @click="handleSort('year')" 
          id="yearInpt" 
          :class="styles.checkInpt">
        <label for="yearInpt" :class="[styles.inputLabel, { active: showSortByYear }]">
          Отсортировать по году</label>
      </div>
    </template>
    <template v-else>
      <div :class="styles.sortTab">
        <RouterLink :to="{ path: '/' }" :class="styles.return">
          <span :class="styles.arrow"></span>
          Назад к списку
        </RouterLink>
      </div>
    </template>
  </nav>
  <template v-if="$route.path === '/'">
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
  <template v-else>
    <RouterView />
  </template>
</template>

<style module>
</style>
<style scoped lang="scss">
.active {
  &::before {
      content: url(../assets/img/check_box_active.svg);
      display: block;
      position: absolute;
      top: -1px;
      left: -25px;
      width: 18px;
      height: 18px;
      background-color: transparent;
  }
}
</style>