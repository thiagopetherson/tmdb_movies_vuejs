<template>     
    <div class="form-container">
        <div class="form-item">
            <img v-if="getUser.avatar" class="image" :src="`http://127.0.0.1:8000/storage/${getUser.avatar}?data=${randomNumber(1, 1000)}`" />
            <img v-else class="image" src="../../assets/images/default-user.png" />
        </div>
        <div class="form-item">
            <form @submit.prevent='saveImage'>     
                <h1>{{ title }}</h1>  
                <div>  
                    <label>Selecione sua imagem:</label>
                    <input type="file" class="btn-file" @change="setFile" accept=".jpg, .jpeg, .png, .JPG, .PNG"  />
                </div>                   
                <div> 
                    <button @click.prevent="saveImage()">SALVAR</button>
                </div>                
            </form>
        </div>
    </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'FormEditProfileImage',
  data () {
    return {
        title: 'Trocar Imagem de Perfil',
        form: {
            image: null,
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
    saveImage () {
        if (this.getUser.id) {

            let formData = new FormData()
            formData.append('id', this.getUser.id)           
            formData.append("avatar", this.form.image)

            let token = JSON.parse(localStorage.getItem('token'))

            this.axios.post('http://127.0.0.1:8000/api/user-profiles-change-image-profile', formData, {
                headers: {
                    "Authorization" : `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'                          
                }
            })
            .then(response => {          
                console.log (response)
                if (response.status == 200) {                   

                    let user = this.createObjectUser(response)

                    this.$store.dispatch("user/setUser", user)
                    localStorage.setItem('user', JSON.stringify(this.getUser))                                      

                    this.$swal("Imagem atualizada com sucesso!", "", "success")	             
                    this.form.image = null  
                    document.querySelector(".btn-file").value = ""
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
                
                this.form.image = null
                document.querySelector(".btn-file").value = "";
            })
        } else {
            this.$q.notify({
                type: 'negative',
                message: 'Não foi possível identificar o usuário ativo, faça logoff no sistema e entre novamente. Caso persistir entre em contato com o suporte.'
            })
        }
    },
    setFile(e) {                
        let files = e.target.files
        this.form.image = files[0]                
    }
  }
}
</script>

<style scoped lang="sass">

.form-container
    background-color: rgba(0, 0, 0, 0.75)   
    display: flex
    flex-direction: column
    width: 100%   
    align-items: center    

    .form-item
        display: flex
        flex-direction: row
        justify-content: center

        .image
            width: 300px
            height: 300px
            border-radius: 50%

        form
            div
                label
                    display: block   
                    text-align: left         
                input
                    width: 500px
                    padding: 12px
                    font-size: 14px
                    display: block
                    background-color: rgba(112,128,144, 0.1)   
                    border: 1px solid #DBDBDB  
                    margin: 5px auto

                button
                    margin-top: 15px
                    display: block
                    width: 100%
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