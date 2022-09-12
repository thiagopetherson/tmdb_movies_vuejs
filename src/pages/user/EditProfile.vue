<template>
  <div>
    <Menu />    
    <div class="edit-profile">    
        <FormEditProfile />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import FormEditProfile from '@/components/user/FormEditProfile.vue'


export default {
  name: 'EditProfile',
  components: {
    Menu: Menu,
    FormEditProfile: FormEditProfile,
  },
 
}
</script>

<style scoped lang="sass">
     
        
</style>
