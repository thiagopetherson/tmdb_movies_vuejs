export default {
    namespaced: true,
    state: {
        user: {
            id: null,
            name: '',
            email: '',
            surname: '',
            alias: '',
            gender: '',
            birth_date: '',
            telephone: '',
            profession: '',
            profile_phrase: '',
            biography: '',
            avatar: '',
            active: 0,
            created_at: '',
        },        
        token: null,
        loggedIn: 0,
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getToken(state) {
            return state.token
        },
        getLoggedIn(state) {
            return state.loggedIn
        }
    },
    mutations: {       
        SET_USER: (state, payload) => {            
            state.user = { ...payload }            
        },
        SET_TOKEN: (state, payload) => {          
            state.token = payload            
        },
        SET_LOGGEDIN: (state, payload) => {           
            state.loggedIn = payload
        },
        LOGOUT_USER: (state) => {
            state.user.id = null      
            state.user.name = ''
            state.user.email = ''
            state.user.surname = ''
            state.user.alias = ''
            state.user.gender = ''
            state.user.birth_date = ''
            state.user.telephone = ''
            state.user.profession = ''
            state.user.profile_phrase = ''
            state.user.biography = ''
            state.user.avatar = ''
            state.user.active = 0
            state.user.created_at = ''
            state.token = null
            state.loggedIn = 0
            localStorage.clear()
        }
    },
    actions: {
        loginUser(context, payload) {          
            context.commit('SET_USER', payload.user)
            context.commit('SET_TOKEN', payload.token)
            context.commit('SET_LOGGEDIN', 1)
        },
        logoutUser(context) {          
            context.commit('LOGOUT_USER')           
        },
        setUser(context, payload) {          
            context.commit('SET_USER', payload)
        }
    }
}