<template>
  <div class="footer-container">        
    <div class="contact">
        <p class="p-1">Desenvolvido por Thiago Petherson</p>   
        <p class="p-2">thiagopetherson@outlook.com</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Footer',  
}
</script>

<style scoped lang="sass">

.footer-container
  position: absolute
  bottom: 0
  left: 0
  margin-top: 2rem
  width: 100%
  height: 7vh 
  background: #121212
  color: #f7d354  
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center

  .p-1
    font-weight: bold
        
</style>