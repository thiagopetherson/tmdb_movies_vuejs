<template>
    <div class="rating">
        <div class="image-username-date">
            <div class="rating-user-img">
                <router-link :to="`/user-profile/${rating.user.user_profile.id}`">
                  <img class="user-img" v-if="rating.user.user_profile.avatar" :src="`http://127.0.0.1:8000/storage/${rating.user.user_profile.avatar}?data=${randomNumber(1, 1000)}`" />
                  <img class="user-img" v-else src="../../assets/images/default-user-2.png" />
                </router-link>
                <span class="username-createdat">{{ rating.user.user_profile.alias }} - {{ brazilianDate(rating.created_at) }}</span>
            </div>           
        </div>
        <div class="rating-user-rating">
            <i class="fa fa-lg" v-for="r in parseInt(rating.rating)" :key="r"></i>
            <!--<span class="rating-number">{{ rating.rating }}</span>-->
        </div> 
        <div class="rating-user-review">
            <p>{{ rating.review }}</p>
        </div>  
        <div v-if="rating.user_id == getUser.id" class="rating-user-review-delete">
            <button class="btn-delete" @click="deleteRating(rating.id)">Delete</button>
        </div>      
    </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'MovieRatingList', 
  props: {
    rating: {     
      default: null
    },
  },
  mixins: [globalMixins],
  computed: { 
    getUser () {
        return this.$store.getters['user/getUser']
    }
  },
  methods: {
    deleteRating (id) {
      
      if(!confirm('Você está prestes a remover sua nota e crítica. Está é uma ação irreversível. Você quer mesmo fazer isso ?'))
        return false

      let token = JSON.parse(localStorage.getItem('token'))
      
      this.axios.delete('http://127.0.0.1:8000/api/ratings/'+id,{					
          headers: {
              "Authorization" : `Bearer ${token}`,              
              'accept': 'application/json'
          }
      })
      .then(response => {    

          if (response.status == 200) { 
              this.emitter.emit('reloadRatings') // Executando um evento de outro componente
              this.emitter.emit('clearReviewFields') // Executando um evento de outro componente
              this.$swal("Crítica removida com sucesso!", "", "success")	
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
                   
    }
  }
}
</script>

<style scoped lang="sass">

.rating
    width: 100%    
    display: flex
    flex-direction: column
    align-items: flex-start
    border: 1px solid rgba(128,128,128,0.2)
    padding: 10px
    margin-bottom: 10px

    .image-username-date
        width: 100%        
        display: flex
        
        .rating-user-img
            display: flex            

            .user-img
                width: 50px
                border-radius: 5%

            .username-createdat  
                margin-left: 10px
                font-size: 1rem
                font-weight: bold   

    .rating-user-rating
        display: inline
        margin-top: 2vh       

        .fa
          margin: 0.5vh  

        .fa:before
          content: '\f005'
          color: #FC0

        .rating-number   
            margin: 0.5vh    
            margin-left: 5px
            font-size: 1.2rem
            font-weight: bold

    .rating-user-review
        display: flex
        margin-top: 2vh

        p
            text-align: left

    .rating-user-review-delete
        width: 100%
        display: flex
        flex-direction: row
        justify-content: flex-end

        .btn-delete          
          margin-top: 15px
          background-color: #B22222
          border: 2px solid #B22222
          border-radius: 4px
          color: #FFF
          padding: 0.5rem 0.5rem
          cursor: pointer

          &:hover
            background-color: transparent
            color: #B22222

</style>