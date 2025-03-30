<script setup>
import { RouterView } from 'vue-router';
import styles from "./MovieLibrary.module.scss";
import { useMovieStore } from '../store';

const movieStore = useMovieStore();

const handleSort = (arg) => {
	if(arg === 'year') {
    movieStore.cancelSortByName();
    movieStore.setSortByYear();
	} else if (arg === 'name') {
    movieStore.cancelSortByYear();
    movieStore.setSortByName();
	}
}

function clearMoviesList() {
  movieStore.clearStore()
}
</script>

<template>
  <header class="header">
    <div class="logo">#MOVIENOW</div>
  </header>
  <div class="wrapper">
    <main class="main">
      <nav :class="styles.nav">
        <template v-if="$route.path === '/'">
          <h1 :class="styles.navHeader">Фильмы</h1>
          <div :class="styles.sortTab">
            <input type="checkbox" 
              @click="handleSort('name')" 
              id="nameInpt" 
              :class="styles.checkInpt">
            <label for="nameInpt" :class="[styles.inputLabel, { active: movieStore.showSortByName }]">
              Отсортировать по названию</label>
            <input type="checkbox" 
              @click="handleSort('year')" 
              id="yearInpt" 
              :class="styles.checkInpt">
            <label for="yearInpt" :class="[styles.inputLabel, { active: movieStore.showSortByYear }]">
              Отсортировать по году</label>
          </div>
        </template>
        <template v-else>
          <div :class="styles.sortTab">
            <RouterLink :to="{ path: '/' }" :class="styles.return" @click="clearMoviesList()">
              <span :class="styles.arrow"></span>
              Назад к списку
            </RouterLink>
          </div>
        </template>
      </nav>

      <RouterView />

    </main>
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100px;
  background: #FA2828;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 0px 8px 7px 0px #00000047;
  -moz-box-shadow: 0px 8px 7px 0px #00000047;
  box-shadow: 0px 8px 7px 0px #00000047;
}
.logo {
  font-family: Roboto;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  letter-spacing: 10px;
  text-align: center;
  text-transform: uppercase;
  padding-top: 15px;
  color: #000;
}
.wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.main {
  margin-right: 7px;
  position: relative;
  height: calc(100vh - 100px);
  width: 100%;
  @media screen and (min-width:1400px) {
    width: 1400px;
  }
  @media screen and (max-width:1400px) {
    margin: 0 5px;
  }
}

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

<style module>
</style>