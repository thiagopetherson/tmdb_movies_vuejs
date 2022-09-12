import { createRouter, createWebHistory } from 'vue-router' // createWebHashHistory (was)
/* import Menu from '@/components/layouts/Menu.vue' */
const Login = () => import('@/pages/public/Login.vue')
const Register = () => import('@/pages/public/Register.vue')
const EditProfile = () => import('@/pages/user/EditProfile.vue')
const EditProfileImage = () => import('@/pages/user/EditProfileImage.vue')
const UserProfile = () => import('@/pages/user/UserProfile.vue')
const Users = () => import('@/pages/user/Users.vue')
const Movies = () => import('@/pages/movie/Movies.vue')
const Movie = () => import('@/pages/movie/Movie.vue')
const MovieSearch = () => import('@/pages/movie/MovieSearch.vue')

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditProfile,
  },
  {
    path: '/edit-profile-image',
    name: 'edit-profile-image',
    component: EditProfileImage,
  },
  {
    path: '/user-profile/:id',
    name: 'user-profile',
    component: UserProfile,
    props: true,
  },
  {
    path: '/list-users',
    name: 'list-users',
    component: Users
  },
  {
    path: '/movies',
    name: 'movies',
    component: Movies,
  },
  {
    path: '/movie/:id',
    name: 'movie',
    props: true,
    component: Movie,
  },
  {
    path: '/search',
    name: 'search',
    props: true,
    component: MovieSearch,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Usamos esse BeforeEach para verificar se precisamos estar autenticados para acessar a rota

router.beforeEach((to, from, next) => {    
  /* 
      Abaixo Verificamos se a rota precisa de autenticação e se o usuário está logado. 
      Então fazemos o redirecionamento de acordo com a condição
  */    
 
  //let userStateLoggedIn = store.getters.user.loggedIn   
 
  let user = JSON.parse(localStorage.getItem('user'))   
     
  if ( (to.name !== 'login' && to.name !== 'register') && (user == null) ) {        
      next({ name: 'login' }) 
  } else {        
      next() 
  } 
     
});


export default router
