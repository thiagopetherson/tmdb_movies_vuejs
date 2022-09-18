<template>
  <div>
    <div class="details">
        <div class="info">
            <h3><i class="fa-solid fa-film icon-color"></i> Título Original:</h3>
            <p>{{ movie.original_title }}</p>
        </div>
        <div class="info">
            <h3><i class="fa-solid fa-film icon-color"></i> Gênero:</h3>
            <p><span v-for="(genre, index) in movie.genres" :key="index"><span class="span-genre-separator"> &#10022; </span>{{ genre.name }}</span></p>
        </div> 
        <div class="info">
            <h3><i class="fa-solid fa-calendar-days icon-color"></i> Data de Lançamento:</h3>
            <p>{{ brazilianDate(movie.release_date) }}</p>
        </div>   
        <div class="info">
            <h3><i class="fa-solid fa-folder icon-color"></i> Orçamento:</h3>
            <p>{{ formatCurrency(movie.budget) }}</p>
        </div>
        <div class="info">
            <h3><i class="fa-solid fa-dollar-sign icon-color"></i> Receita:</h3>
            <p>{{ formatCurrency(movie.revenue) }}</p>
        </div>
        <div class="info">
            <h3><i class="fa-solid fa-clock icon-color"></i> Duração:</h3>
            <p>{{ movie.runtime }} minutos</p>
        </div>
        <div class="info">
            <h3><i class="fa-solid fa-eye icon-color"></i> Popularidade no TMDB:</h3>
            <p>{{ movie.popularity.toFixed(1) }}%</p>
        </div>
        <div class="info description">
            <h3><i class="fa-solid fa-file-lines icon-color"></i> Descrição:</h3>
            <p>{{ movie.overview }}</p>
        </div>
    </div> 
  </div>
</template>

<script>
import globalMixins from '@/mixins/globalMixins'

export default {
  name: 'MovieDetails',
  props: {
    movie: {
      type: Object,
      default: null
    },
  },
  mixins: [globalMixins],
  methods: {
    formatCurrency (number) {
        return number.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
    }
  },
  mounted() {
    console.log(this.movie)
  }
}
</script>

<style scoped lang="sass">

.icon-color
  font-size: 1.3rem
  color: #f7d354
  font-weight: bold

.details
  .info 
    margin-bottom: 1.5rem

    h3
      margin-bottom: 1rem
      display: flex
      align-items: center
      gap: 0.5rem
    
    p 
      text-align: left

      span
        
        .span-genre-separator
          color: #f7d354

  .description 
    p 
      line-height: 1.4rem

</style>