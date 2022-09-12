<template>
  <div>
    <Menu />
    <div class="selection"> 
        <select v-model="genreSelected" @change="changeSelect">
            <option value="">GÊNERO</option>
            <option v-for="genre in genres" :value="genre.id" :key="genre.id">{{ genre.name }}</option>          
        </select>                    
    </div>

    <h1>{{ title }}</h1>

    <div class="movies">
      <MovieCards v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>

  </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import MovieCards from '@/pages/movie/MovieCards.vue'

export default {
  name: 'Movies',
  components: {
    Menu: Menu,
    MovieCards: MovieCards,
  },
  data () {
    return {
      title: 'Melhores Filmes',
      genreSelected: '',
      genres: [],
      movies: [],
    }
  },
  methods: {
    getMovies () {
      this.axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&language=pt-BR`)        
      .then(response => {   
        this.movies = response.data.results
      })  
    },
    getMoviesForGenre () {
      this.axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&with_genres=${this.genreSelected}&sort_by=vote_average.desc&vote_count.gte=10&language=pt-BR`)        
      .then(response => {          
        this.movies = response.data.results
      })  
    },
    getGenres () {
      this.axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&language=pt-BR`)        
      .then(response => {
        this.genres = response.data.genres
      })  
    },
    changeSelect () {
      if (this.genreSelected === "") this.getMovies()
      else this.getMoviesForGenre()
    }
  },
  mounted () {
    this.getGenres()
    this.getMovies()
  }
}
</script>

<style scoped lang="sass">

.selection
  margin-top: 10px

  select
    width: 500px
    padding: 9px
    font-size: 14px
    display: block
    background-color: rgba(112,128,144, 0.1)   
    border: 1px solid #f7d354
    margin: 5px auto
    text-transform: uppercase

    option
      background-color: rgba(0, 0, 0, 1)
      text-transform: uppercase

    option:not(:checked)
      background-color: rgba(0, 0, 0, 1)  

h1
  margin: 10px 0 0 0
  color: #f7d354
  font-size: 2rem

.movies 
  width: 80%
  margin: 0px auto
  display: flex
  flex-wrap: wrap
  justify-content: space-around

</style>
