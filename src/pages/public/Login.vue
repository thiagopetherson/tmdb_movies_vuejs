<template>
  <div>    
     <loading :active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />   
    <div class="login">       
        <FormLoginRegister @submitForm="login($event)" :typeForm="typeForm" />              
    </div>
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'
import FormLoginRegister from '@/components/public/FormLoginRegister.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'Login',
  components: {
    FormLoginRegister: FormLoginRegister,
    Loading: Loading,
  },
  data () {
    return {      
      typeForm: 'Login',
      isLoading: false,
      fullPage: true
    }
  },
  mixins: [globalMixins],
  computed: { 
    getUser () {
        return this.$store.getters['user/getUser']
    },
    getToken () {
        return this.$store.getters['user/getToken']
    },
    getLoggedIn () {
        return this.$store.getters['user/getLoggedIn']
    }
  },
  methods: {
    async login (event) {	     

      if ( !this.verifyEmptyFields(event) ) {
        alert('Existem campos em branco')
        return false
      } 		      
     
      this.isLoading = true

			// Método do login
			await this.axios.post(`${this.baseUrl}api/login`, {
				email: event.email,
				password: event.password
			})
			.then(response => {       

        if (response.status == 200) {

          let user = this.createObjectUser(response)
          
          let token = response.data.token
       
          this.$store.dispatch({type: 'user/loginUser', user, token})
          localStorage.setItem('user', JSON.stringify(this.getUser))
          localStorage.setItem('token', JSON.stringify(this.getToken))
          localStorage.setItem('loggedIn', JSON.stringify(this.getLoggedIn))  

          this.isLoading = false
          this.$swal("Bem vindo!", 'Login efetuado com sucesso.', "success");  
          this.$router.push({ path: '/movies' })				
        } else {			
          this.isLoading = false	
          alert("Algum erro aconteceu!") 			
        }
        
					
			})
			.catch(error => {

        this.isLoading = false

				console.log(error.response)

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
		},
    verifyEmptyFields (fields) {       
        if ( fields.email === "" || fields.password === "" )
          return false    
          
        return true
    }
  }
}
</script>

<style scoped lang="sass">

.login    
    background-image: url('../../assets/images/cover.jpg')
    background-repeat: no-repeat
    background-position: center
    background-size: cover 
    height: 100vh
    display: flex
    flex-direction: row
    justify-content: center 
    align-items: center

</style>