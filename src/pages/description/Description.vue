<template>
    <div>
        <Menu />
        <div class="description-container">            
            <div class="description">
                <h1>O que é o TMDB</h1>
                <p>
                    The Movie Database (O Banco de Dados de Filmes), mais conhecido pela sigla TMDb, é uma base de dados grátis e de código aberto, 
                    sobre filmes e seriados (streaming, televisivas, cinematográficas), criado por Travis Bell em 2008. Atualizado constantemente 
                    através do apoio da comunidade. Inicialmente, era apenas uma base de dados sobre filmes, mas em 2013 foi adicionada a seção de séries.
                </p>
            </div>
            
            <div class="history">
                <h1>História</h1>
                <p>
                    Originalmente, começou como um projeto paralelo para ajudar os utilizadores de fan art de alta resolução para o Kodi 
                    (anteriormente XBMC), partilhando ficheiros compactados em formato zip. Devido à dificuldade de partilhar desta forma, 
                    Bell criou uma base de dados de código aberto para que os utilizadores individuais pudessem adicionar e contribuir com 
                    conteúdo por conta própria. O site tem, desde então, adquirido maior uso por ser um dos principais fornecedores de dados 
                    para uma série de outros serviços, incluindo Plex, Letterboxd, SeriesGuide, Cinematics: The Movie Guide, entre muitos outros.
                </p>
            </div>

            <div class="data">
                <h1>Dados</h1>
                <p>
                    Desde 2008, todos os dados e imagens foram contribuídos pelos utilizadores, com o site processando normalmente mais de 12 mil 
                    edições ao dia; e essas contribuições são controladas por um grupo de moderadores voluntários. A partir de outubro de 2016, 
                    o site contém cerca de 300 mil filmes; e continua a crescer.
                </p>
            </div>

            <div class="data">
                <h1>Idiomas</h1>
                <p>
                    Os dados do TMDb podem ser traduzidos para qualquer idioma, uma vez que os utilizadores optam por contribuir com isso. 
                    Os idiomas do site disponíveis são inglês, alemão, francês, grego, espanhol, português, romeno, chinês, entre outros.
                </p>
            </div>

            <div class="api">
                <h1>API</h1>
                <p>
                    As entidades não comerciais ganham acesso livre à Application Programming Interface (API) do TMDb, permitindo o acesso a 
                    todos os dados em todos os idiomas suportados. Os utilizadores do TMDb são conhecidos por contribuir Software Development Kits (SDKs) 
                    de desenvolvimento de software, o que facilita a integração com o TMDb.
                </p>
            </div>

            <div class="comparation">
                <h1>Comparações</h1>
                <p>
                    Ao contrário do site comercial similar IMDb (propriedade da empresa norte-americana Amazon.com), que cobra grandes taxas anuais 
                    para que os clientes usem os seus dado, o TMDb possui código aberto, o que significa que muitos sites de cinema e TV podem 
                    aceder e usar os seus dados, incluindo utilizadores individuais de software de gerenciamento de mídia, como Plex, Kodi e outros.
                    <br><br> 
                    O TMDb ganhou grande interesse quando, no final de fevereiro de 2017, o IMDb deu cerca de duas semanas de antecedência para a 
                    remoção completa da funcionalidade de discussões do seu site, incluindo todos os dados históricos de postagens. 
                    Após a remoção, um grande número de utilizadores de mensagens encontrou o TMDb, enquanto o programador chefe Bell imediatamente 
                    incorporou a funcionalidade de discussões no site para cada campo (filme, série de TV / episódio, empresa, pessoa) para ajudar 
                    rapidamente os utilizadores a continuar a conversar sobre filmes e assuntos relacionados à televisão.
                </p>
            </div>

            <div class="top-movies">
                <h1>O que é o Top Movies</h1>
                <p>
                    O Top Movies é uma plataforma desenvolvida por um amante de cinema. A plataforma usa dados da API do TMDB para gerar informações.
                    Além disso, a plataforma do Top Movies armazena dados próprios em seus bancos de dados, como: Avaliações de filmes pelos seus usuários, 
                    Cálculo de média das notas, Customização dos perfis dos usuários pelos próprios, entre outras coisas...
                    <br><br>
                    A intenção da plataforma é fazer a conexão dos seus usuários com o TMDB, sem deixar de ter suas características próprias e proporcionar 
                    uma interação agradável para o usuário.
                </p>
            </div>

            <div class="links">
                <h1>Link</h1>
                <a class="link-tmdb" href="https://www.themoviedb.org/?language=pt-BR" target="_blank">Ir Para o Site Oficial do TMDB</a>
            </div>           
        </div>

        <div class="div-footer">
            <Footer />
        </div>
    </div>
</template>

<script>
import Menu from '@/components/layouts/Menu.vue'
import Footer from '@/components/layouts/Footer.vue'


export default {
  name: 'Description',
  components: {
    Menu: Menu,
    Footer: Footer,
  },
}
</script>

<style scoped lang="sass">     
.description-container
  width: 100%
  display: flex
  flex-direction: column
  align-items: center

  div
    width: 50%

    h1
      margin: 1.4rem 0 1.4rem 0

    p
      text-align: justify

    .link-tmdb
      padding: 10px
      background-color: #F7D354
      border: 2px solid #F7D354       
      color: #000
      font-weight: bold
      padding: .5rem      
      align-items: center
      cursor: pointer

      &:hover
          background-color: transparent
          color: #F7D354 

.div-footer
  margin-top: 6rem
  position: relative

</style>