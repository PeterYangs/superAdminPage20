import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            count: 1,
            rules: [],
            total:0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        updateRules(state, data) {

            state.rules = data
        },
        setTotal(state, data){

            state.total=data
        }
    }
})

export default store