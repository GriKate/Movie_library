import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movieStore', {
    state: () => ({ 
        movies: [],
        sortedMovies: [],
        showSortByName: false,
        showSortByYear: false
    }),
    getters: {
      getMovies: (state) => state.movies,
    },
    actions: {
      setMovies(arr) {
        this.movies = arr;
      },
      setSortedMovies(arr) {
        this.sortedMovies = arr;
      },
      setSortByName() {
        this.showSortByName = !this.showSortByName;
      },
      setSortByYear() {
        this.showSortByYear = !this.showSortByYear;
      },
      cancelSortByName() {
        this.showSortByName = false;
      },
      cancelSortByYear() {
        this.showSortByYear = false;
      },
      clearStore() {
        this.movies = [];
        this.sortedMovies = [];
        this.showSortByName = false;
        this.showSortByYear = false;
      }
    },
})