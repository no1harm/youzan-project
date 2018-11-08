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
        },
        add(state,instance){
            state.lists.push(instance)
        },
        remove(state,id){
            let lists = state.lists
            let index = lists.findIndex(item =>{
                return item.id === id
            })
            lists.splice(index,1)
            state.lists = lists
        },
        update(state,instance){
            // 通过 instance 的 id 找到
            let lists = JSON.parse(JSON.stringify(state.lists))
            let index = lists.findIndex(item =>{
                return item.id === instance.id
            })
            lists[index] = instance
            state.lists = lists
        },
        setDefault(state,id){
            let lists = JSON.parse(JSON.stringify(state.lists))
            lists.forEach(item=>{
                if(item.id===id){
                    item.isDefault = true
                }
            })
            state.lists = lists
        }  
    },
    actions:{
        getLists({commit}){
            Address.list().then(res=>{
                // this.lists = res.data.lists
                store.commit('init',res.data.lists)
              })
        },
        addAction({commit},instance){
            Address.add(instance).then(res=>{
                store.commit('add',instance)
            })
        },
        removeAction({commit},id){
            Address.remove(id).then(res=>{
                store.commit('remove',id)
            })
        },
        updateAction({commit},instance){
            Address.update(instance).then(res=>{
                store.commit('update',instance)
            })
        },
        setDefaultAction({commit},id){
            Address.setDefault(this.id).then(res=>{
                store.commit('setDefault',id)
            })
        }
    }
})

export default store