<template>
  <div>
    <Menu />    
    <div v-if="id == getUser.id" class="user-edit">
      <div class="user-edit-button">
        <button class="btn-edit" @click="this.$router.push({ name: 'edit-profile' })">EDITAR PERFIL</button>
      </div>
    </div>

    <div class="user-profile">  
      <div class="user-profile-item">   
        <h1>{{ user.alias }}</h1>
        <h3>Membro Desde {{ brazilianDate(user.created_at) }}</h3>

        <h4 v-if="user.profile_phrase" class="h4-profile-phrase">{{ user.profile_phrase }}</h4>
        <h4 v-else class="h4-profile-phrase">{{ user.profile_phrase }}O usuário prefere deixar um ar misterioso</h4>

        <img v-if="user.avatar" class="image" :src="`http://127.0.0.1:8000/storage/${user.avatar}?data=${randomNumber(1, 1000)}`" />
        <img v-if="!user.avatar && user.gender == ''" src="../../assets/images/default-user-no-gender.gif" class="image" />
        <img v-else-if="!user.avatar && user.gender == 'Masculino'" src="../../assets/images/default-user-m.jpg" class="image" />
        <img v-else-if="!user.avatar && user.gender == 'Feminino'" src="../../assets/images/default-user-f.jpg" class="image" />
        <img v-else-if="!user.avatar && user.gender == 'Outro Gênero'" src="../../assets/images/default-user-other-gender.jpg" class="image" /> 

        <h2 class="field-title">Nome</h2>    
        <p>{{ user.name + ' ' + user.surname }}</p>

        <h2 class="field-title">Gênero</h2>    
        <h3 v-if="user.gender">{{ user.gender }}</h3>
        <p v-else>Informação não informada pelo usuário</p>

        <h2 class="field-title">Data de Nascimento</h2>    
        <h3 v-if="user.birth_date">{{ user.birth_date }}</h3>
        <p v-else>Informação não informada pelo usuário</p>

        <h2 class="field-title">Telefone</h2>    
        <h3 v-if="user.telephone">{{ user.telephone }}</h3>
        <p v-else>Informação não informada pelo usuário</p>

        <h2 class="field-title">Profissão</h2>    
        <h3 v-if="user.profession">{{ user.profession }}</h3>
        <p v-else>Informação não informada pelo usuário</p>

        <h2 class="field-title">Biografia</h2>    
        <p v-if="user.biography" class="p-biography">{{ user.biography }}</p>
        <p v-else class="p-biography">O usuário não definiu um texto para biografia</p>
      </div>
    </div>
    <div class="div-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'
import Menu from '@/components/layouts/Menu.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  name: 'UserProfile',
  props: ['id'],
  components: {
    Menu: Menu,
    Footer: Footer,
  },
  data () {
    return {
      user: {
        name: '',
        surname: '',
        gender: '',
        alias: '',
        birth_date: '',
        telephone: '',
        profession: '',
        profile_phrase: '',
        biography:'',
        created_at: '',
      },     
    }
  },
  mixins: [globalMixins],
  computed: {
    getUser () {
        return this.$store.getters['user/getUser']
    }
  },
  methods: {
    getUserData () {

        let token = JSON.parse(localStorage.getItem('token'))
        
        this.axios.get(`${this.baseUrl}api/users/${this.id}`,{					
            headers: {
                "Authorization" : `Bearer ${token}`,              
                'accept': 'application/json'
            }
        })
        .then(response => {       
          let user = this.createObjectUser(response)
          this.user = {...user} 
          console.log(this.user)   
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
    this.getUserData()
  }
}
</script>

<style scoped lang="sass">

.user-edit
  margin-top: 0.5rem
  width: 100%
  display: flex
  flex-direction: row
  justify-content: center

  .user-edit-button
    width: 40%
    display: flex
    flex-direction: row
    justify-content: flex-end

  .btn-edit
    padding: .5rem
    background-color: #F7D354
    border: 2px solid #F7D354
    border-radius: 4px
    color: #000  
    cursor: pointer

    &:hover
        background-color: transparent
        color: #F7D354

.user-profile
  width: 100%
  display: flex
  flex-direction: row
  justify-content: center

  .user-profile-item
    width: 40%
    display: flex  
    flex-direction: column  
    align-items: center

    .h4-profile-phrase
      margin-top: 5px
      margin-bottom: 5px
      color: #f7d354

    .image
      width: 250px

    .field-title
      margin-top: 1rem
      color: #f7d354
    
    .p-biography
      margin-top: 5px
      text-align: justify

.div-footer
  margin-top: 5rem
  position: relative
        
</style>
