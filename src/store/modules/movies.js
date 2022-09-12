export default {
    namespaced: true,
    state: {
        busca: '',        
    },
    getters: {
        getBusca(state) {
            return state.busca
        }
    },
    mutations: {       
        SET_BUSCA: (state, payload) => {
            state.busca = payload
        }       
    },
    actions: {        
        setBusca(context, payload) {
            context.commit('SET_BUSCA', payload.busca)
        }
    }
}