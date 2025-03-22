<script setup>
import { RouterView } from 'vue-router'
// import styles from "./App.module.scss"
</script>

<template>
  <header class="header">
    <div class="logo">#MOVIENOW</div>
  </header>
  <div class="wrapper">
    <main class="main">
      <!-- <nav class="nav"></nav> -->
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  background: #FA2828;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 100%;
  @media screen and (min-width:1400px) {
    width: 1400px;
  }
  @media screen and (max-width:1400px) {
    margin: 0 5px;
  }
}
/* .nav {
    width: 100%;
    height: 124px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    border-bottom: 1px solid grey;
    margin-bottom: 32px;
} */
</style>
