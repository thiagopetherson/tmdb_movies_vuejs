<template>   
    <div class="rating">        
        <h2>Sua Avaliação</h2>
        <form>
            <div class="stars">
                <input type="radio" id="star_empty" v-model="form.rating" value="" checked>

                <label for="star_one"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_one" v-model="form.rating" value="1">

                <label for="star_two"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_two" v-model="form.rating" value="2">

                <label for="star_three"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_three" v-model="form.rating" value="3">

                <label for="star_four"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_four" v-model="form.rating" value="4">

                <label for="star_five"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_five" v-model="form.rating" value="5">

                <label for="star_six"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_six" v-model="form.rating" value="6">

                <label for="star_seven"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_seven" v-model="form.rating" value="7">

                <label for="star_eight"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_eight" v-model="form.rating" value="8">

                <label for="star_nine"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_nine" v-model="form.rating" value="9">

                <label for="star_teen"><i class="fa fa-lg"></i></label>
                <input type="radio" id="star_teen" v-model="form.rating" value="10">

                <textarea rows="10" v-model="form.review"></textarea>
                <button @click.prevent="saveRating()">SALVAR</button>
            </div>           
        </form>        
    </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'MovieRating',
  props: {
    movie: {
      type: Object,
      default: null
    },
  },
  data () {
    return {
      form: {
        rating: '',
        review: ''
      }
    }
  },
  mixins: [globalMixins],
  computed: { 
    getUser () {
        return this.$store.getters['user/getUser']
    },
    getToken () {
        return this.$store.getters['user/getToken']
    }
  },
  methods: {
    saveRating() {

        if (this.form.review == "" || parseInt(this.form.rating) > 10 || parseInt(this.form.rating) < 1) {
          this.$swal("Sua avaliação não foi enviada.", 'Você deve atribuir uma nota e o campo de crítica não pode estar em branco.', "error")
          return false
        }

        let formData = new FormData()
        formData.append('rating', this.form.rating)           
        formData.append("review", this.form.review)
        formData.append("movie_id", this.movie.id)
        formData.append("user_id", this.getUser.id)               
       
        let token = JSON.parse(localStorage.getItem('token'))
        
        this.axios.post(`${this.baseUrl}api/ratings`, formData, {					
            headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json'
            }
        })
        .then(response => {		

            if (response.status == 200) {                 

                let user = this.createObjectUser(response)
                this.$store.dispatch("user/setUser", user)
                localStorage.setItem('user', JSON.stringify(this.getUser))

                this.emitter.emit('reloadRatings') // Executando um evento de outro componente
                this.$swal("Your review was successful!", "", "success")                
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
    completeFieldsForm() {

      let formData = new FormData()
      formData.append("movie_id", this.movie.id)
      formData.append("user_id", this.getUser.id)

      let token = JSON.parse(localStorage.getItem('token'))

      this.axios.post(`${this.baseUrl}api/rating-by-user`, formData, {
        headers: {
          "Authorization" : `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'accept': 'application/json'
        }
      })        
      .then(response => {          
        if(response.data.rating[0]) {
            this.form.rating = response.data.rating[0].rating
            this.form.review = response.data.rating[0].review
        } else {
            this.form.rating = ""
            this.form.review = ""
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
  },
  mounted () {
    this.emitter.on('clearReviewFields', () => {
      this.completeFieldsForm()
    })

    this.emitter.emit('reloadRatings') // Executando um evento de outro componente

    this.completeFieldsForm()
  }
}
</script>

<style scoped lang="sass">

.rating    
  width: 100%

  h2
    color: #f7d354
    margin: 2vh 2vh 2vh 2vh

  form     

    .stars   
      width: 100%

      input[type=radio]
        display: none

      label 
        display: inline

        .fa
          margin: 0.5vh

        .fa:before
          content: '\f005'
          color: #FC0

      input[type=radio]:checked ~ label i.fa:before
        color: #CCC

      textarea
        width: 100%
        margin-top: 2vh         
        padding: 12px
        font-size: 14px  
        display: block            
        background-color: rgba(112,128,144, 0.1)   
        border: 1px solid #DBDBDB            

      button          
        margin-top: 15px       
        width: 20%
        background-color: #f7d354
        border: 2px solid #f7d354
        border-radius: 4px
        color: #000
        padding: 1rem 0.5rem
        text-align: center
        font-weight: bold

        &:hover
          background-color: transparent
          color: #f7d354

</style>