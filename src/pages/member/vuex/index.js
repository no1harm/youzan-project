import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        lists:null
    },
    mutations:{
        init(state,lists){
            state.lists = lists
        }
    },
    actions:{
        getLists({commit}){
            Address.list().then(res=>{
                // this.lists = res.data.lists
                store.commit('init',res.data.lists)
              })
        }
    }
})

export default store