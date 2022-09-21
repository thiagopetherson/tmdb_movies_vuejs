<template>
  <div>
    <Menu />    
    <div class="edit-profile">    
        <FormEditProfile />
    </div>
    <div class="div-footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import Footer from '@/components/layouts/Footer.vue'
import FormEditProfile from '@/components/user/FormEditProfile.vue'


export default {
  name: 'EditProfile',
  components: {
    Menu: Menu,
    Footer: Footer,
    FormEditProfile: FormEditProfile,
  },
 
}
</script>

<style scoped lang="sass">
    
.div-footer
  margin-top: 5rem
  position: relative
        
</style>
