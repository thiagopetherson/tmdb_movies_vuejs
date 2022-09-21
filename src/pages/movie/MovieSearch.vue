<template>
  <div>
    <Menu @procurar="getMovies" />
    <h1>{{ title }}<span>{{ this.getBusca }}</span></h1>
    <div class="movie-search">    
      <MovieCards v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
    <div class="div-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from '@/components/layouts/Menu.vue'
import Footer from '@/components/layouts/Footer.vue'
import MovieCards from '@/pages/movie/MovieCards.vue'

export default {
  name: 'MovieSearch',
  components: {
    Menu: Menu,
    Footer: Footer,
    MovieCards: MovieCards,
  },
  data () {
    return {
      title: 'Resultado da busca para: ',
      movies: null,     
    }
  },
  computed: mapGetters('movies', {
    getBusca: 'getBusca'
  }),
  methods: {
    getMovies () {      
      this.axios.get(`https://api.themoviedb.org/3/search/movie/?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&query=${this.getBusca}&region=BR&language=pt-BR`)        
      .then(response => {          
        this.movies = response.data.results
        
        this.axios.get(`https://api.themoviedb.org/3/search/movie/?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&query=${this.getBusca}&region=BR&language=pt-BR&page=2`)        
        .then(response => {  
          if (response.data.results) {        
            for (let i = 0; i < response.data.results.length; i++) {
              this.movies.push(response.data.results[i])
            }
          }
          
          this.axios.get(`https://api.themoviedb.org/3/search/movie/?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&query=${this.getBusca}&region=BR&language=pt-BR&page=3`)        
          .then(response => {  
            if (response.data.results) {        
              for (let i = 0; i < response.data.results.length; i++) {
                this.movies.push(response.data.results[i])
              }   
            }       
          })
        })
      })
    }
  },
  mounted () {
    this.getMovies()
  }
}
</script>

<style scoped lang="sass">

h1
  margin: 20px 0 5px 0  
  font-size: 2rem

  span
    color: #f7d354

.movie-search 
  width: 80%
  margin: 0px auto
  display: flex
  flex-wrap: wrap
  justify-content: space-around

.div-footer
  margin-top: 5rem
  position: relative

</style>