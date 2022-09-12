<template>
    <div>
        <div class="form-container">
            <div class="form-container-item">
                <input class="text-field" type="text" v-model="textField" placeholder="Procurar um usuário" />
                <button class="btn-search-users" @click="searchUsers">Procurar Usuários</button>
            </div>
        </div>

        <div class="users-container">   
            <div class="users-container-item" v-for="(user, index) in users" :key="index">
                <div class="div-img">
                    <img v-if="user.user_profile.avatar" :src="`http://127.0.0.1:8000/storage/${user.user_profile.avatar}?data=${randomNumber(1, 1000)}`" />
                    <img v-else src="../../assets/images/default-user-2.png" />           
                </div>
                <div class="div-description">
                    <h4>{{ user.user_profile.alias }}</h4>
                    <h5 class="h5-profile-phrase" v-if="user.user_profile.profile_phrase">{{ user.user_profile.profile_phrase }}</h5>
                    <h5 class="h5-profile-phrase" v-else>O usuário prefere manter um ar de mistério</h5>
                    <hr>
                    <h5 class="h5-profession" v-if="user.user_profile.profession">{{ user.user_profile.profession }}</h5>
                    <h5 class="h5-profession" v-else>Profissão não definida</h5>
                    <router-link :to="`/user-profile/${user.user_profile.id}`">
                        <button class="btn-view-profile">Ver Perfil</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'UserCard',
  data () {
    return {      
      textField: "",
    }
  },
  mixins: [globalMixins],
  props: ['users'],
  methods: {
    searchUsers () {
        this.$emit('searchUsers', { text: this.textField })
    }
  }
}
</script>

<style scoped lang="sass">
.form-container
    margin-top: 10px
    margin-bottom: 10px
    display: flex
    justify-content: center


    .form-container-item
        display: inline
        
        .text-field
            padding: 10px
            border: none
            color: black

        .btn-search-users
            padding: 10px
            background-color: #F7D354
            border: 2px solid #F7D354           
            color: #000
            padding: .5rem           
            cursor: pointer

            &:hover
                background-color: transparent
                color: #F7D354

.users-container
    width: 100vw
    display: flex
    flex-direction: row
    flex-wrap: wrap

    .users-container-item    
        width: 25%
        display: flex
        flex-direction: row
        text-align: left
        border: 1px solid rgba(255, 255, 255, 0.1)      
        
        .div-img 
            
            img
                width: 100px
                height: 100px
        
        .div-description
            width: 100%
            position: relative

            hr
                height: 1px
                background-color: #f7d354
                border: none

            h4
                color: #f7d354

            .h5-profession
                position: absolute
                right: 0

            .btn-view-profile
                position: absolute
                bottom: 0
                right: 0
                padding: 10px
                background-color: #F7D354
                border: 2px solid #F7D354
                border-radius: 4px
                color: #000
                padding: .3rem        
                display: flex
                align-items: center
                cursor: pointer

                &:hover
                    background-color: transparent
                    color: #F7D354              
</style>
