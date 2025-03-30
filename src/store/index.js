import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movieStore', {
    state: () => ({ 
        movies: [],
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
        this.showSortByName = false;
        this.showSortByYear = false;
      }
    },
})