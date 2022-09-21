<template>
  <div>
    <Menu />    
    <div class="edit-profile-image">    
        <FormEditProfileImage />
    </div>
    <div class="div-footer">
      <Footer />
    </div> 
  </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import Footer from '@/components/layouts/Footer.vue'
import FormEditProfileImage from '@/components/user/FormEditProfileImage.vue'


export default {
  name: 'EditProfileImage',
  components: {
    Menu: Menu,
    Footer: Footer,
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

.div-footer
  margin-top: 5rem
  position: relative
        
</style>