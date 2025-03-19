<script setup>
import styles from './AllMovies.module.scss'
console.log('hello')
</script>
<template>
    <div :class="styles.container">Movies</div>
    <p :class="$style.red">
    Текст
  </p>
</template>
<style module lang="scss">
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>