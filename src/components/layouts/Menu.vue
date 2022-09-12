<template>
  <div class="menu-container">
        <div class="header-item header-item-1">
            <i class="fa-solid fa-video"></i>&nbsp; <router-link to="/movies">Top Movies</router-link>
        </div>

        <div class="header-item header-item-2">
            <input class="campo-texto" type="text" placeholder="Procurar um filme" v-model="busca" />
            <input class="botao-busca" type="submit" value="Buscar" @click="procurar"/>
        </div>  

        <div class="header-item header-item-3">           
            <button class="btn-users" @click="this.$router.push({ name: 'list-users' })">Todos os Usuários</button>
        </div>      

        <div class="header-item header-item-4">   
            <span class="span-alias">{{ getUser.alias }}</span>
            <img v-if="getUser.avatar" :src="`http://127.0.0.1:8000/storage/${getUser.avatar}?data=${randomNumber(1, 1000)}`" class="profile-image" @click="this.$router.push({ name: 'user-profile', params: {id: getUser.id} })" />   
            <img v-else src="../../assets/images/default-user-2.png" class="profile-image" @click="this.$router.push({ name: 'user-profile', params: {id: getUser.id} })" />
        </div> 

        <div class="header-item header-item-5">           
            <button class="botao-sair" @click="logout">Sair</button>
        </div>      
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'Menu',
  data () {
    return {      
      busca: '',
    }
  },
  mixins: [globalMixins],
  computed: { 
    getUser () {
        return this.$store.getters['user/getUser']
    }
  },
  methods: {
    procurar() {
      if ( this.busca.trim() === "" ) return false  
      
      let busca = this.busca
      this.busca = ""
      
      if (this.$route.name === "search") {        
        this.$store.dispatch({ type: 'movies/setBusca', busca: busca })
        this.$emit('procurar')
      } else {
        this.$store.dispatch({ type: 'movies/setBusca', busca: busca })
        this.$router.push({ name: 'search' })
      }  
    },
    async logout () {

      let token = JSON.parse(localStorage.getItem('token')) 
           
      // Método do logout
			await this.axios.get('http://127.0.0.1:8000/api/logout',{ headers: {"Authorization" : `Bearer ${token}`} })
			.then(resp => {
        if (resp.status == 200) {           
          this.$store.dispatch("user/logoutUser")
          this.$router.push({ name: 'login' })          
        }
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

      this.$store.dispatch({ type: 'user/logoutUser'})
      this.$router.push({ name: 'login' })
    }
  },
  mounted () {
    let user = JSON.parse(localStorage.getItem('user'))    
    this.$store.dispatch("user/setUser", user)
  }
}
</script>

<style scoped lang="sass">

.menu-container
  width: 100%
  height: 6vh 
  background: #121212
  color: #f7d354
  display: flex
  flex-direction: row

  .header-item       
    height: 100%
    align-items: center

  .header-item-1    
    margin-left: 50px
    color: #f7d354
    font-weight: bold
    font-size: 1.4rem
    display: flex
    flex-direction: row    
    flex-grow: 1
    
    .fa-video
      color: #F7D354

  .header-item-2    
    color: black
    display: flex
    flex-direction: row     
    justify-content: center    
    margin-right: 15px

    .campo-texto
        padding: 10px
        border: none
        color: black

    .botao-busca
        padding: 10px
        background-color: #F7D354
        border: 2px solid #F7D354
        color: #000
        padding: .5rem        
        display: flex
        align-items: center
        cursor: pointer

        &:hover
            background-color: transparent
            color: #F7D354

  .header-item-3   
    color: black
    display: flex
    flex-direction: row    
    justify-content: center
    margin-right: 15px

    .btn-users
        padding: 10px
        background-color: #F7D354
        border: 2px solid #F7D354       
        color: #000
        padding: .5rem        
        display: flex
        align-items: center
        cursor: pointer

        &:hover
            background-color: transparent
            color: #F7D354

  .header-item-4   
    color: black
    display: flex
    flex-direction: row    
    justify-content: center    
    margin-right: 15px

    .span-alias
      color: #F7D354

    .profile-image
      cursor: pointer
      width: 35px
      border-radius: 50%

  .header-item-5   
    color: black
    display: flex
    flex-direction: row    
    justify-content: center    
    margin-right: 50px

    .botao-sair
        padding: 10px
        background-color: #F7D354
        border: 2px solid #F7D354       
        color: #000
        padding: .5rem        
        display: flex
        align-items: center
        cursor: pointer

        &:hover
            background-color: transparent
            color: #F7D354
      
        
</style>
