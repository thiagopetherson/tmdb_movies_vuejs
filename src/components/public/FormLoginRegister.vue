<template>     
    <div class="form-container">    
        <div class="form-item">
            <form>     
                <h1>{{ typeForm == "Register" ? 'Registre-se' : 'Login' }}</h1>  
                <div v-if="typeForm == 'Register'">  
                    <label>Nome:</label>
                    <input type="text" v-model="form.name" />
                </div> 
                <div v-if="typeForm == 'Register'"> 
                    <label>Sobrenome:</label>
                    <input type="text" v-model="form.surname" />
                </div> 
                <div> 
                    <label>Email:</label>
                    <input type="email" v-model="form.email" />
                </div> 
                
                <div v-if="typeForm == 'Login'"> 
                    <label>Senha:</label>
                    <input type="password" v-model="form.password" />
                </div> 
                <!--
                <div v-if="typeForm == 'Register'"> 
                    <label>Repita a Senha:</label>
                    <input type="password" v-model="form.confirm_password" />    
                </div>
                --> 
                <div> 
                    <button @click.prevent="action()">{{ typeForm == "Register" ? "REGISTRAR" : "ENTRAR" }}</button>
                </div>
                <div class="link" v-if="typeForm == 'Login'">
                    Ainda não tem cadastro ? <router-link to="/register">Cadastre-se</router-link>
                </div>
                <div class="link" v-else>
                    Já possui cadastro ? <router-link to="/">Logar</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
  name: 'FormLoginRegister',
  props: ['typeForm'],
  data () {
    return {
        form: {
            name: '',
            surname: '',
            email: '',
            // password: '',
            // confirm_password: '',
        }
    }
  },
  methods: {
    action (){
        this.$emit('submitForm', this.form)
        this.resetFormFields()
    },
    resetFormFields () {
        this.form.name = ""
        this.form.surname = ""
        this.form.email = ""
        // this.form.password = ""
        // this.form.confirm_password = ""
    }
  },
  mounted () {
    this.resetFormFields()
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

    .form-item
        display: flex
        flex-direction: row
        align-items: center
        height: 100%

        form
            div
                label
                    display: block   
                    text-align: left         
                input
                    width: 300px
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
                
        form 
            h1
                margin-bottom: 50px
            
            .link
                margin-top: 1rem

</style>