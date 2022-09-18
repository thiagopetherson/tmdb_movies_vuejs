<template>     
    <div class="form-container">    
        <div class="form-item">
            <form>     
                <h1>Editar Perfil</h1>  
                <p>
                    Os campos preenchidos aparecerão no seu perfil público.
                </p>
                <div> 
                    <!-- <button class="btn-change-image" @click="this.$router.push({ name: 'edit-profile-image' })">TROCAR IMAGEM</button>-->
                    <router-link class="btn-change-image" to="/edit-profile-image">Trocar Imagem</router-link>
                </div> 
                <div>  
                    <label>Nome:</label>
                    <input type="text" v-model="form.name" />
                </div> 
                <div> 
                    <label>Sobrenome:</label>
                    <input type="text" v-model="form.surname" required />
                </div> 
                <div> 
                    <label>Usuário:</label>
                    <input type="text" v-model="form.alias" required />
                </div> 
                <div> 
                    <label>Gênero:</label>
                    <select v-model="form.gender">
                        <option value=""></option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro Gênero">Outro Gênero</option>
                    </select>                   
                </div> 
                <div> 
                    <label>Data de Nascimento:</label>
                    <input type="text" placeholder="dd-mm-yyyy" v-maska="'##-##-####'" v-model="form.birth_date" />    
                </div> 
                <div> 
                    <label>Celular:</label>
                    <input type="text" placeholder="(##) #####-####" v-maska="'(##) #####-####'" v-model="form.telephone" />
                </div>
                <div> 
                    <label>Profissão:</label>
                    <input type="text" v-model="form.profession" />
                </div>
                <div> 
                    <label>Frase de Perfil: (Máx: 150 caracteres)</label>
                    <input type="text" v-model="form.profile_phrase" />
                </div> 
                <div> 
                    <label>Sobre você: (Máx: 2500 caracteres)</label>
                    <textarea rows="8" v-model="form.biography"></textarea>
                </div>   
                <div> 
                    <button class="btn-save" @click.prevent="salveProfile()">SAVE</button>
                </div>                
            </form>
        </div>
    </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'FormEditProfile',
  data () {
    return {
        form: {
            name: '',
            surname: '',
            alias: '',
            gender: '',
            birth_date: '',
            telephone: '',
            profession: '',
            profile_phrase: '', 
            biography: '',     
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
    async salveProfile () {
        
        let formData = new FormData()
        formData.append('name', this.form.name)           
        formData.append("surname", this.form.surname)
        formData.append('alias', this.form.alias)           
        formData.append("gender", this.form.gender)
        formData.append('birth_date',this.form.birth_date)           
        formData.append("telephone", this.form.telephone)
        formData.append("profession", this.form.profession)
        formData.append("profile_phrase", this.form.profile_phrase)
        formData.append('biography', this.form.biography)
       
        formData.append('_method', 'PUT')        
        
        let user = JSON.parse(localStorage.getItem('user'))
        let token = JSON.parse(localStorage.getItem('token'))
        
        await this.axios.post(`${this.baseUrl}api/users/${user.id}`, formData, {					
            headers: {
                "Authorization" : `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                'accept': 'application/json'
            }
        })
        .then(response => {		

            if (response.status == 200) {               

                let user = this.createObjectUser(response)

                this.$store.dispatch({type: 'user/loginUser', user, token})
                localStorage.setItem('user', JSON.stringify(this.getUser))
                localStorage.setItem('token', JSON.stringify(this.getToken))                       

                this.completeFieldsForm()
                this.$swal("Dados atualizados com sucesso!", "", "success")	
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
    completeFieldsForm () {
        this.form.name = this.getUser.name
        this.form.surname = this.getUser.surname
        this.form.alias = this.getUser.alias
        this.form.gender = this.getUser.gender ? this.getUser.gender : ''
        this.form.birth_date = this.getUser.birth_date ? this.getUser.birth_date : ''
        this.form.telephone = this.getUser.telephone ? this.getUser.telephone : ''
        this.form.profession = this.getUser.profession ? this.getUser.profession : ''
        this.form.profile_phrase = this.getUser.profile_phrase ? this.getUser.profile_phrase : ''
        this.form.biography = this.getUser.biography ? this.getUser.biography : ''
    }
  },
  mounted () {
    this.completeFieldsForm()
  }
}
</script>

<style scoped lang="sass">
.form-container
    background-color: rgba(0, 0, 0, 0.75)
    display: flex
    flex-direction: row
    height: 100%
    width: 100%   
    justify-content: center
    align-items: center

    .form-item
        display: flex
        flex-direction: row
        align-items: center
        height: 100%

        form
            h1
                margin-bottom: 10px

            p
                margin-bottom: 20px
            
            .link
                margin-top: 1rem

            div                

                label
                    display: block   
                    text-align: left         
                input
                    width: 500px
                    padding: 11px
                    font-size: 14px
                    display: block
                    background-color: rgba(112,128,144, 0.1)   
                    border: 1px solid #DBDBDB  
                    margin: 5px auto

                select
                    width: 500px
                    padding: 9px
                    font-size: 14px
                    display: block
                    background-color: rgba(112,128,144, 0.1)   
                    border: 1px solid #DBDBDB  
                    margin: 5px auto
                    text-transform: uppercase
                
                    option
                        background-color: rgba(0, 0, 0, 1)
                        text-transform: uppercase
                
                    option:not(:checked)
                        background-color: rgba(0, 0, 0, 1)                


                textarea  
                    width: 500px
                    padding: 12px
                    font-size: 14px  
                    display: block            
                    background-color: rgba(112,128,144, 0.1)   
                    border: 1px solid #DBDBDB  
                    margin: 5px auto

                .btn-save
                    margin-top: 15px
                    display: block
                    width: 100%
                    background-color: #f7d354
                    border: 2px solid #f7d354
                    border-radius: 4px
                    color: #000
                    padding: 0.8rem 0.5rem
                    font-weight: bold

                    &:hover
                        background-color: transparent
                        color: #f7d354

                .btn-change-image
                    width: 30%
                    background-color: #f7d354
                    border: 2px solid #f7d354
                    border-radius: 4px
                    color: #000
                    padding: 0.5rem 0.5rem
                    font-weight: bold

                    &:hover
                        background-color: transparent
                        color: #f7d354   

</style>