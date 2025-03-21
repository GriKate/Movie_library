<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { RouterLink, useRoute } from 'vue-router';

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

</script>

<template>
    <li>
        <RouterLink :to="createRouteString(movieToRender.id)">{{movieToRender.title}}</RouterLink>
        <p>
            <template v-if="movieToRender.year && movieToRender.genres">
                <span>{{movieToRender.year + ', '}}</span>
                <span>{{createString(movieToRender.genres)}}</span>
            </template>
            <template v-else>
                <span v-if="movieToRender.year">{{movieToRender.year}}</span>
                <span v-if="movieToRender.genres">{{createString(movieToRender.genres)}}</span>
            </template>
        </p>
        <p v-if="movieToRender.directors">
            <span>РЕЖИССЁР: </span>
            <span>{{createString(movieToRender.directors)}}</span>
        </p>
        <p v-if="movieToRender.actors">
            <span>АКТЁРЫ: </span>
            <span>{{createString(movieToRender.actors, false)}}</span>
        </p>
        <p v-if="movieToRender.description">{{(movieToRender.description).trim()}}</p> 
    </li>
</template>