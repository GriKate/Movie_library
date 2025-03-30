<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { RouterLink, useRoute } from 'vue-router';
import styles from './MovieCard.module.scss';

import { useMovieStore } from '@/store';
const movieStore = useMovieStore();

const route = useRoute();

// для рендеринга внутри AllMovies
const props = defineProps({
    movie: Object
})

const movieToRender = ref({});
const duration = ref([]);
const preloader = ref(false);

async function fetchData() {
    const reqString = `https://mashroom-movies-api.netlify.app/api/movie/${route.params.id}`;
    await axios.get(reqString)
    .then(res => {
      preloader.value = false;
      if(res.status === 200 && res.data) {
        movieToRender.value = res.data.data;
      }
    })
    .catch(function(error) {
      preloader.value = false;
      alert(error.message)
    });
    
    // console.log('запрос 1 URL')
} 

onMounted(async () => {
  if(props.movie) {
    movieToRender.value = props.movie;
  } else if (movieStore.getMovies.length) {
    //есть в стейте - из стейта
    movieToRender.value = movieStore.getMovies.find(el => el.id === +route.params.id)
  } else {
    preloader.value = true;
    await fetchData();
  }
  duration.value = movieToRender.value.collapse.duration;
})

const createString = (arr, upper = true) => {
  if(arr.length > 1) {
    if(upper) {
      return arr.join(', ').toLocaleUpperCase()
    } else {
      return arr.join(', ')
    }
  } else {
    if(upper) {
      return arr[0].toLocaleUpperCase()
    } else {
      return arr[0]
    }
  }
}

const createRouteString = (id) => {
    return `/movie/${id}`
}
</script>

<template>
  <template v-if="preloader && $route.path !== '/'">
    <div :class="styles.preloadWrapper">
      <span :class="styles.preload"></span>
    </div>
  </template>

  <template v-else-if="!movieToRender.id && !preloader && $route.path !== '/'">
    <p>К сожалению, по вашему запросу ничего не найдено...</p>
  </template>

  <template v-else>
    <li :class="styles.movieItem">
      <article :class="[styles.article, { active: $route.path === '/' }]">
        <div :class="styles.imageWrapper">
          <img :src="movieToRender.poster" :class="styles.movieImage" :alt="movieToRender.title">
        </div>
        <div :class="styles.wrapper">
          <RouterLink :to="createRouteString(movieToRender.id)" :class="styles.movieName">
            {{movieToRender.title}}
          </RouterLink>
          <p :class="styles.description">
              <template v-if="movieToRender.year && movieToRender.genres">
                  <span>{{movieToRender.year + ', '}}</span>
                  <span>{{createString(movieToRender.genres)}}</span>
              </template>
              <template v-else>
                  <span v-if="movieToRender.year">{{movieToRender.year}}</span>
                  <span v-if="movieToRender.genres">{{createString(movieToRender.genres)}}</span>
              </template>
          </p>
          <p v-if="movieToRender.directors" :class="styles.description">
              <span>РЕЖИССЁР: </span>
              <span>{{createString(movieToRender.directors)}}</span>
          </p>
          <p v-if="movieToRender.actors" :class="styles.descriptionActors">
              <span :class="styles.actors">АКТЁРЫ: </span>
              <span :class="styles.actorsNames">{{createString(movieToRender.actors, false)}}</span>
          </p>
          <p v-if="movieToRender.description" :class="styles.descriptionText">
            {{(movieToRender.description).trim()}}
          </p> 
        </div>
        <div v-if="duration" :class="styles.durationLabel">
            <div :class="styles.durationTextWrapper">
              <span 
                :class="styles.durationText" 
                v-for="item of duration" 
                :key="item">{{ item.replace('/"|.|./g', '') }}</span>
              <span :class="styles.film"></span>
            </div>
          </div>
      </article>
    </li>
  </template>
</template>

<style module>
</style>

<style scoped lang="scss">
.active {
  &:hover {
    -webkit-transform: translateY(-8px);
    -moz-transform: translateY(-8px);
    transform: translateY(-8px);
    -webkit-box-shadow: 5px 8px 7px 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 5px 8px 7px 5px rgba(0, 0, 0, 0.3);
    box-shadow: 5px 8px 7px 5px rgba(0, 0, 0, 0.3);
  }
}
</style>