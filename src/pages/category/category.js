import 'css/common.css'
import './category.css'
import url from 'js/api.js'

import Vue from 'vue'
import axios from 'axios'
import Foot from 'components/Foot.vue'

new Vue({
    el:'#app',
    data:{
        topLists:null,
        topIndex:0,
        subData:null,
        rankData:null
    },
    components:{
        Foot,
    },
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
        }
    },
    filters:{
        number(price){
            return price = price.toFixed(2)
        }
    }
})