import {createStore} from 'vuex'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            count: 1,
            rules: []
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        updateRules(state, data) {

            state.rules = data
        }
    }
})

export default store