import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const key = 'user'

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
        $_setStorage(state, value) {
            state.user = value
            localStorage.setItem(key, JSON.stringify(value))
        },
        $_removeStorage(state) {
            state.user = {}
            localStorage.removeItem(key)
        },
        $_getStorage(state) {
            if(!state.user) {
                state.user = JSON.parse(localStorage.getItem(key))
            }
        }
  },
  actions: {
  }
})
