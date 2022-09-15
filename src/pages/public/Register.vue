<template>
  <div>
    <loading :active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
    <div class="register">    
      <FormLoginRegister @submitForm="register($event)" :typeForm="typeForm" />
    </div>
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'
import FormLoginRegister from '@/components/public/FormLoginRegister.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';


export default {
  name: 'Register',
  components: {
    FormLoginRegister: FormLoginRegister,
    Loading: Loading,
  },

  data () {
    return {     
      typeForm: 'Register',
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
    async register (event) {         

      
      this.isLoading = true     

      await this.axios.post(`${this.baseUrl}api/register`, {
				name: event.name,
        surname: event.surname,
				email: event.email
				// password: event.password,
				// confirm_password: event.confirm_password
			})
      .then(response => {       
       
        if (response.status == 200) {

          /*
          let user = this.createObjectUser(response) // Mixin
          
          let token = response.data.token
       
          this.$store.dispatch({type: 'user/loginUser', user, token})
          localStorage.setItem('user', JSON.stringify(this.getUser))
          localStorage.setItem('token', JSON.stringify(this.getToken))
          localStorage.setItem('loggedIn', JSON.stringify(this.getLoggedIn))        
          */

          // alert('Cadastro Efetuado com Sucesso!')
          this.isLoading = false
          this.$swal("Cadastro Efetuado!", "Sua senha de acesso foi enviada para o seu email. Caso não tenha recebido em sua caixa de entrada, verifique na caixa de spam do seu email.", "success");

          // this.$router.push({ path: '/movies' })				
        } else {				
          this.isLoading = false
          this.$swal("Houve um erro...", "Tente novamente, por favor.", "error");
        }
       
			})
      .catch(error => {			
        this.isLoading = false	
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

    },
    verifyPasswordFields (fields) {     
        if ( fields.password != fields.confirm_password )
          return false

        return true        
    }
  }
}
</script>

<style scoped lang="sass">

.register
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