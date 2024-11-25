<template>
  <div class="tv-shows">
    <h1 class="title">TV Shows</h1>
    <input
      type="text"
      v-model="query"
      @keyup="debouncedGetTVShows"
      placeholder="Search for TV shows..."
      class="search-input"
    />
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="tv-show-list" v-if="!loading && !error">
      <div v-for="show in tvShows" :key="show.id" class="tv-show-item">
        <img
          :src="'http://image.tmdb.org/t/p/w500/' + show.poster_path"
          alt="TV Show Poster"
          class="tv-show-poster"
        />
        <h2 class="tv-show-title">{{ show.name }}</h2>
        <p class="release-date">{{ show.first_air_date }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { debounce } from 'lodash';

export default {
  name: 'TVShows',
  data() {
    return {
      query: '',
      tvShows: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    getTVShows() {
      if (this.query.length > 2) {
        this.loading = true;
        this.error = null;
        axios
          .get(`https://api.themoviedb.org/3/search/tv?api_key=YOUR_API_KEY&query=${this.query}`)
          .then(response => {
            this.tvShows = response.data.results;
          })
          .catch(error => {
            this.error = "Error fetching TV shows. Please try again.";
            console.error("Error fetching TV shows:", error);
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.tvShows = [];
      }
    },
    debouncedGetTVShows: debounce(function() {
      this.getTVShows();
    }, 300),
  },
};
</script>

<style scoped>
.tv-shows {
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

.tv-show-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center items on smaller screens */
}

.tv-show-item {
  margin: 10px;
  width: 150px; /* Fixed width for larger screens */
  text-align: center;
  flex: 1 1 150px; /* Allow items to shrink and grow */
}

.tv-show-poster {
  width: 100%;
  max-width: 100%; /* Prevent overflow */
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px;
}

.tv-show-title {
  font-size: 16px;
  margin: 5px 0;
}

.release-date {
  font-size: 14px;
  color: #666;
}

/* Responsive styles */
@media (max-width: 600px) {
  .tv-show-item {
    width: 100%; /* Full width on smaller screens */
    max-width: 90%; /* Limit max width */
  }

  .tv-show-title {
    font-size: 14px; /* Smaller font size */
  }

  .release-date {
    font-size: 12px; /* Smaller font size */
  }
}
</style>