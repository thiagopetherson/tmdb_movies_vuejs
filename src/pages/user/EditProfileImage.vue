<template>
  <div>
    <Menu />    
    <div class="edit-profile-image">    
        <FormEditProfileImage />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import FormEditProfileImage from '@/components/user/FormEditProfileImage.vue'


export default {
  name: 'EditProfileImage',
  components: {
    Menu: Menu,
    FormEditProfileImage: FormEditProfileImage,
  },
 
}
</script>

<style scoped lang="sass">

.edit-profile-image    
    height: 84vh
    display: flex
    flex-direction: column
    justify-content: center     
        
</style>