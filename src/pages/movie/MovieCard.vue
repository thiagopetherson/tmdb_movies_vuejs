<template> 
  <div class="movie-card-container">
    <div class="movie-card"> 
        <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title">
        <img v-else src="../../assets/images/not-found-image.png" alt="image not found">
        <h2 class="h2-title">{{ movie.title }}</h2>
        <p class="tagline">{{ movie.tagline }}</p>
        <p>TMDB <i class="fa-solid fa-star icon-color"></i> {{ movie.vote_average }}</p>
        <p>Top Movies <i class="fa-solid fa-star icon-color"></i> {{ usersAverage }}</p>         
        <a :href="`https://www.youtube.com/results?search_query=${movie.title} Trailer`" target="_blank" class="btn-trailer">
          <i class="fa-brands fa-youtube"></i> Trailer
        </a>     
    </div>
    <div class="movie-details">   
        <div class="movie-details-item">   
          <MovieDetails :movie="movie" />
        </div>
    </div>
    <div class="movie-ratings">   
        <div class="movie-ratings-item">   
          <MovieRating :movie="movie" />
        </div>
    </div>
    <div class="movie-ratings-list">   
        <div class="movie-ratings-list-item">   
          <MovieRatingList v-for="(rating, index) in ratings" :key="index" :rating="rating" />
        </div>
    </div>
  </div>
</template>

<script>
import MovieDetails from '@/pages/movie/MovieDetails.vue'
import MovieRating from '@/pages/movie/MovieRating.vue'
import MovieRatingList from '@/pages/movie/MovieRatingList.vue'

export default {
  name: 'MovieCard',
  components: {
    MovieDetails: MovieDetails,
    MovieRating: MovieRating,
    MovieRatingList: MovieRatingList
  },
  props: {
    movie: {
      type: Object,
      default: null
    },
  },
  data () {
    return {
      usersAverage: 0,
      ratings: [],     
    }
  },
  methods: {
    async getAverageUsers () {

      let formData = new FormData()
      formData.append("movie_id", this.movie.id)    

      let token = JSON.parse(localStorage.getItem('token'))

      await this.axios.post(`${this.baseUrl}api/ratings-average-users`, formData, {
        headers: {
          "Authorization" : `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        }
      })        
      .then(response => {          
        if(response.status == 200) {
           this.usersAverage = response.data.average
        } 
      })
      .catch((error) => { 
        console.log(error)

        if (error.response.data.errors) {
            Object.keys(error.response.data.errors).forEach(key => {
                console.log(key, error.response.data.errors[key])
                this.$swal("Oops...", error.response.data.errors[key][0], "error")
            });
        }
        if (error.response.data.erro) {
            this.$swal("Oops...", error.response.data.erro, "error")
        }					
      })

    },
    async getMovieRatings () {

        let token = JSON.parse(localStorage.getItem('token'))
        
        await this.axios.get(`${this.baseUrl}api/ratings-by-movie/${this.movie.id}`,{					
            headers: {
                "Authorization" : `Bearer ${token}`,
                'accept': 'application/json'
            }
        })
        .then(response => {          
          this.ratings = response.data.ratings            
        })
        .catch((error) => {           
          console.log(error)

          if (error.response.data.errors) {
              Object.keys(error.response.data.errors).forEach(key => {
                  console.log(key, error.response.data.errors[key])
                  this.$swal("Oops...", error.response.data.errors[key][0], "error")
              });
          }
          if (error.response.data.erro) {
              this.$swal("Oops...", error.response.data.erro, "error")
          }					
        })
    }
  },
  mounted () {
    this.emitter.on('reloadRatings', () => {
      this.getAverageUsers()
      this.getMovieRatings()
    })
    this.getAverageUsers()
    this.getMovieRatings()
  }
}
</script>

<style scoped lang="sass">
.movie-card-container
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

  .movie-card
    width: 30%
    display: flex
    flex-direction: column
    padding: 1.0rem  
    background-color: #111
    margin-top: 1rem
    margin-bottom: 1rem 

    img
      max-width: 100%
      margin-bottom: 1rem

    .h2-title
      color: #f7d354
      margin-bottom: 1rem

    p
      font-size: 1.3rem
      margin-bottom: 1rem
      font-weight: bold

      .icon-color
        font-size: 1.3rem
        color: #f7d354
        font-weight: bold
    
    .tagline
      text-align: center
      font-size: 1rem      
      font-style: italic

    .router-link
      background-color: #f7d354
      border: 2px solid #f7d354
      color: #000
      padding: 1rem 0.5rem
      text-align: center
      font-weight: bold

      &:hover
        background-color: transparent
        color: #f7d354  

    .btn-trailer
      background-color: #c4302b 
      border-radius: 4px
      color: #fff
      padding: 1rem 0.5rem
      text-align: center
      font-weight: bold
      width: 35%
      align-self: center

      &:hover
        background-color: transparent
        border: 1px solid #c4302b 
        color: #fff 

  .movie-details
    width: 40%
    display: flex
    flex-direction: row
    justify-content: center
    
    .movie-details-item
      width: 100%

  .movie-ratings
    width: 40%
    display: flex
    flex-direction: row
    justify-content: center
    
    .movie-ratings-item
      width: 100%
  
  .movie-ratings-list
    width: 40%
    margin-top: 2vh
    display: flex
    flex-direction: row
    justify-content: center

    .movie-ratings-list-item
      width: 100%

</style>
