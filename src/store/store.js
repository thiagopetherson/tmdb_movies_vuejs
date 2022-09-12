import Vuex from 'vuex'

import user from './modules/user'
import movies from './modules/movies'

export default new Vuex.Store({
    modules: { user, movies }
})