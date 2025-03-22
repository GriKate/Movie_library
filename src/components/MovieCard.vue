<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { RouterLink, useRoute } from 'vue-router';
import styles from './MovieCard.module.scss';

const route = useRoute();

// для рендеринга внутри AllMovies
const props = defineProps({
    movie: Object
})

const movieToRender = ref({});

async function fetchData() {
    const reqString = `https://mashroom-movies-api.netlify.app/api/movie/${route.params.id}`;
    const response = await axios.get(reqString);
    movieToRender.value = response.data.data;
    // console.log(movieToRender)
} 

onMounted(async () => {
    // console.log(route.params.id)
    route.params.id ? await fetchData() : movieToRender.value = props.movie;
    // console.log(movieToRender)
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

const createImageString = (id) => {
    return `/src/assets/img/${id}.jpg`
}
</script>

<template>
    <li :class="styles.movieItem">
      <article :class="styles.article">
        <div :class="styles.imageWrapper">
          <img :src="createImageString(movieToRender.id)" :class="styles.movieImage" :alt="movieToRender.title" >
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
        <span v-if="movieToRender.collapse">{{ movieToRender.collapse.duration }}</span>
      </article>
    </li>
</template>

<style module>
</style>