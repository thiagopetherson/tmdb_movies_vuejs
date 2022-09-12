<template>
    <div>
        <Menu />
        <UserCard :users="users" @search-users="searchUsers($event)"/>
    </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import UserCard from '@/components/user/UserCard.vue'

export default {
  name: 'Users',
  components: {
    Menu: Menu,
    UserCard: UserCard,
  },
  data () {
    return {      
      searchParam: "",
      users: null,
    }
  },
  methods: {
    getUsers (param) {
      let token = JSON.parse(localStorage.getItem('token')) 

      let formData = new FormData()
      formData.append('text', param)

      this.axios.post('http://127.0.0.1:8000/api/users-list-search', formData, { 
        headers: {
          "Authorization" : `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "accept": "application/json"
        } 
      })
      .then(response => {
          if (response.status == 200) {
            this.users = response.data.users
            console.log(this.users)
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
    },
    searchUsers(event) {     
      this.getUsers(event.text)
    }
  },
  mounted() {
    this.getUsers(this.searchParam)
  }
}
</script>

<style scoped lang="sass">
     
</style>
