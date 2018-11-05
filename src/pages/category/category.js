import 'css/common.css'
import './category.css'
import url from 'js/api.js'

import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'

new Vue({
    el:'#app',
    data:{
        topLists:null,
        topIndex:0,
        subData:null,
        rankData:null
    },
    // components:{
    //     Foot,
    // },
    created(){
        this.getTopLists()
        this.getSublist(0,0)
    },
    methods:{
        getTopLists(){
            axios.get(url.topLists).then(res=>{
                this.topLists = res.data.lists
            }).catch(res=>{
                console.log(res)
            })
        },
        getSublist(id,index){
            this.topIndex = index
            if(index===0){
                this.getRank()
            }else{
                axios.get(url.subList,{id}).then(res=>{
                    this.subData = res.data.data
                }).catch(res=>{
                    console.log(res)
                })
            }           
        },
        getRank(){
            axios.get(url.rank).then(res=>{
                this.rankData = res.data.data
            }).catch(res=>{
                console.log(res)
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    mixins:[mixin]
})