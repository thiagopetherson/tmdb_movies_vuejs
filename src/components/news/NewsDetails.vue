<template>
    <div class="news-container">        
        <div class="news-container-item-1">
            <div class="div-news-image">
                <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="movie-image" :alt="movie.title" />
                <img v-else src="../../assets/images/not-found-image.png" alt="image not found" class="movie-image">                
            </div>
            <div class="div-news-description">
                <p class="p-movie-name">{{ movie.title }}</p>
                <hr />
                <div class="image-username">
                    <img v-if="rating.user.user_profile.avatar" :src="`${this.baseUrl}storage/${rating.user.user_profile.avatar}?data=${randomNumber(1, 1000)}`" class="user-image" />   
                    <img v-if="!rating.user.user_profile.avatar && rating.user.user_profile.gender == ''" src="../../assets/images/default-user-no-gender.gif" class="user-image" />
                    <img v-else-if="!rating.user.user_profile.avatar && rating.user.user_profile.gender == 'Masculino'" src="../../assets/images/default-user-m.jpg" class="user-image" />
                    <img v-else-if="!rating.user.user_profile.avatar && rating.user.user_profile.gender == 'Feminino'" src="../../assets/images/default-user-f.jpg" class="user-image" />
                    <img v-else-if="!rating.user.user_profile.avatar && rating.user.user_profile.gender == 'Outro Gênero'" src="../../assets/images/default-user-other-gender.jpg" class="user-image" />               
                    <p class="p-user-name">{{ rating.user.user_profile.alias }}</p>
                </div>
                <router-link class="router-link" :to="`/movie/${rating.movie_id}`">Ver</router-link>
            </div>
        </div>         
    </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'NewsDetails',
  props: {
    rating: {
      type: Object,
      default: null
    },
  },
  data () {
    return {      
      news: '',
      movie: '',
    }
  },
  mixins: [globalMixins],
  methods: {
        getMovie () {
            this.axios.get(`https://api.themoviedb.org/3/movie/${this.rating.movie_id}?api_key=7c239e80ee7bf4bc9b4fcea4906f0e3f&language=pt-BR`)        
            .then(response => {             
                this.movie = response.data  
                console.log(this.movie)       
            })  
        }
  },
  mounted () {
    console.log(this.rating)
    this.getMovie()
  }
}
</script>

<style scoped lang="sass">      
.news-container
    display: flex
    flex-direction: row

    .news-container-item-1
        display: flex
        margin-top: 10px

        .div-news-image        
            display: flex
            flex-direction: column

            .movie-image
                width: 100px
        
        .div-news-description
            display: flex
            flex-direction: column
            position: relative

            .p-movie-name
                color: #f7d354
                font-weight: bold
                text-align: left
            
            hr
                height: 1px
                background-color: #f7d354
                border: none

            .image-username
                margin-top: 6px
                display: flex
                flex-direction: row

                .user-image                  
                    width: 30px    

                .p-user-name
                    font-weight: bold                   
            
            .router-link
                position: absolute
                background-color: #f7d354
                border: 2px solid #f7d354
                color: #000               
                text-align: center
                font-weight: bold
                width: 50px
                padding: 4px 4px
                bottom: 0

                &:hover
                    background-color: transparent
                    color: #f7d354

</style>