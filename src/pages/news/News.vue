<template>
  <div class="news">
    <Menu />
    <div class="last-reviews">
        <h2>Últimas Avaliações</h2>
        <NewsDetails v-for="(r, index) in ratings" :key="index" :rating="r" />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import NewsDetails from '@/components/news/NewsDetails.vue'
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'News',
  components: {
    NewsDetails: NewsDetails,
    Menu: Menu,
  },
  data () {
    return {      
      ratings: [],
    }
  },
  mixins: [globalMixins],
  methods: {
    getRatings () {
        
      let token = JSON.parse(localStorage.getItem('token')) 

	this.axios.get(`${this.baseUrl}api/ratings-last-ratings`,{ headers: {"Authorization" : `Bearer ${token}`} })
	.then(response => {
        if (response.status == 200) {           
            this.ratings = response.data.ratings
        }

        console.log(this.ratings)
      })
      .catch(error => {   
        console.log(error)

        if (error.response.data.errors) {
            Object.keys(error.response.data.errors).forEach(key => {
                console.log(key, error.response.data.errors[key]);
                this.$swal("Falha...", error.response.data.errors[key][0], "error");
            });
		}

        if (error.response.data.erro) {
            this.$swal("Falha...", error.response.data.erro, "error");
        }
	})
    }
  },
  created () {
    this.getRatings()
  }
}
</script>

<style scoped lang="sass">      
.news
  width: 100%

  .last-reviews
    display: flex
    flex-direction: column
    width: 20%
    margin-top: 20px

    h2
      font-weight: bold
      margin-bottom: 10px

</style>