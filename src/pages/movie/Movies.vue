<template>
  <div>
    <Menu />
    <div class="selection"> 
        <select v-model="genreSelected" @change="changeSelect">
            <option value="most popular">MAIS POPULARES</option>            
            <option value="best evaluated">MAIS BEM AVALIADOS</option>
            <option value="at the movies">NOS CINEMAS</option>
            <option v-for="genre in genres" :value="genre.id" :key="genre.id">{{ genre.name }}</option>          
        </select>                    
    </div>

    <h1>{{ title }}</h1>

    <div class="movies">
      <MovieCards v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
    <div class="div-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import Footer from '@/components/layouts/Footer.vue'
import MovieCards from '@/pages/movie/MovieCards.vue'

export default {
  name: 'Movies',
  components: {
    Menu: Menu,
    Footer: Footer,
    MovieCards: MovieCards,
  },
  data () {
    return {
      title: 'Melhores Filmes',
      genreSelected: 'most popular',
      genres: [],
      movies: [],
    }
  },
  methods: {
    async getMovies ($param) {
      await this.axios.get(`https://api.themoviedb.org/3/movie/${$param}?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&region=BR&language=pt-BR`)        
      .then(response => {   
        this.movies = response.data.results

        this.axios.get(`https://api.themoviedb.org/3/movie/${$param}?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&region=BR&language=pt-BR&page=2`)        
        .then(response => {   
          for (let i = 0; i < response.data.results.length; i++) {
            this.movies.push(response.data.results[i])
          }

          this.axios.get(`https://api.themoviedb.org/3/movie/${$param}?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&region=BR&language=pt-BR&page=3`)        
          .then(response => {   
            for (let i = 0; i < response.data.results.length; i++) {
              this.movies.push(response.data.results[i])
            }
          })
        }) 
      })  
    },
    getMoviesForGenre () {
      this.axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&with_genres=${this.genreSelected}&sort_by=vote_average.desc&vote_count.gte=10&region=BR&language=pt-BR`)        
      .then(response => {          
        this.movies = response.data.results

        this.axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&with_genres=${this.genreSelected}&sort_by=vote_average.desc&vote_count.gte=10&region=BR&language=pt-BR&page=2`)        
        .then(response => {          
          for (let i = 0; i < response.data.results.length; i++) {
            this.movies.push(response.data.results[i])
          }

          this.axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&with_genres=${this.genreSelected}&sort_by=vote_average.desc&vote_count.gte=10&region=BR&language=pt-BR&page=3`)        
          .then(response => {          
            for (let i = 0; i < response.data.results.length; i++) {
              this.movies.push(response.data.results[i])
            }
          })
        }) 
      })  
    },
    getGenres () {
      this.axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&region=BR&language=pt-BR`)        
      .then(response => {
        this.genres = response.data.genres
      })  
    },
    changeSelect () {
      if (this.genreSelected === "most popular") this.getMovies("popular")
      else if (this.genreSelected === "best evaluated") this.getMovies("top_rated")
      else if (this.genreSelected === "at the movies") this.getMovies("upcoming")
      else this.getMoviesForGenre()
    }
  },
  mounted () {
    this.getGenres()
    this.getMovies('popular')
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

.div-footer
  margin-top: 5rem
  position: relative

</style>
