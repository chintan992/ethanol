<template>
  <div class="movies">
    <h1 class="title">Movies</h1>
    <input type="text" v-model="query" @keyup="debouncedGetMovies" placeholder="Search for movies..." class="search-input" />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="movie-list" v-if="!loading && !error">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img :src="'http://image.tmdb.org/t/p/w500/' + movie.poster_path" alt="Movie Poster" class="movie-poster" />
        <h2 class="movie-title">{{ movie.title }}</h2>
        <p class="release-date">{{ movie.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

export default {
  name: 'Movies',
  data() {
    return {
      query: '',
      movies: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    getMovies() {
      if (this.query.length > 2) {
        this.loading = true;
        this.error = null;
        axios
          .get(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${this.query}`)
          .then(response => {
            this.movies = response.data.results;
          })
          .catch(error => {
            this.error = "Error fetching movies. Please try again.";
            console.error("Error fetching movies:", error);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.movies = [];
      }
    },
    debouncedGetMovies: debounce(function() {
      this.getMovies();
    }, 300),
  },
};
</script>

<style scoped>
.movies {
  padding: 20px;
  max-width: 100%;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.loading {
  font-size: 18px;
  color: #007bff;
}

.error {
  color: red;
  font-weight: bold;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center items on smaller screens */
}

.movie-item {
  margin: 10px;
  width: 150px; /* Fixed width for larger screens */
  text-align: center;
  flex: 1 1 150px; /* Allow items to shrink and grow */
}

.movie-poster {
  width: 100%;
  max-width: 100%; /* Prevent overflow */
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px;
}

.movie-title {
  font-size: 16px;
  margin: 5px 0;
}

.release-date {
  font-size: 14px;
  color: #666;
}

/* Responsive styles */
@media (max-width: 600px) {
  .movie-item {
    width: 100%; /* Full width on smaller screens */
    max-width: 90%; /* Limit max width */
  }

  .movie-title {
    font-size: 14px; /* Smaller font size */
  }

  .release-date {
    font-size: 12px; /* Smaller font size */
  }
}
</style>
