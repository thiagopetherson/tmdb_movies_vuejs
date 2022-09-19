import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2' // Importando a biblioteca sweet alert
import 'sweetalert2/dist/sweetalert2.min.css' // CSS do Sweet Alert
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import mitt from 'mitt' // Importando o Mitt
import Maska from 'maska'

const emitter = mitt() // Criando a instância do pacote mitt

import "./assets/css/main.css";

const app = createApp(App)

// let url = 'http://127.0.0.1:8000/' // Dev
let url = 'https://top-movies-tmdb-backend.herokuapp.com/' // Prod
let baseUrl = url
app.config.globalProperties.baseUrl = baseUrl // Variável global


app.config.globalProperties.emitter = emitter // Configurando a instância do emitter (mitt) para ser usado de forma global

app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.use(Maska)
app.mount('#app')
