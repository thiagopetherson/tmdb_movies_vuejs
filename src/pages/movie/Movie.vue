<template>
  <div>
    <Menu />
    <!--<h1>{{ title }}</h1>-->
    <div class="movies">    
      <MovieCard :movie="movie" />
    </div>
    <div class="div-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import Footer from '@/components/layouts/Footer.vue'
import MovieCard from '@/pages/movie/MovieCard.vue'

export default {
  name: 'Movie',
  components: {
    Menu: Menu,
    Footer: Footer,
    MovieCard: MovieCard,
  },
  props: ['id'],
  data () {
    return {
      title: 'Filme',
      movie: null,
    }
  },
  methods: {
    async getMovies () {
      await this.axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&language=pt-BR`)        
        .then(response => {          
          this.movie = response.data         
        })  
    }
  },
  created () {    
    this.getMovies()    
  }
}
</script>

<style scoped lang="sass">

h1
  margin: 20px 0 5px 0
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