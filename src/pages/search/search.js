import 'css/common.css'
import './search.css'

import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin'
import Velocity from 'velocity-animate'

let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    data:{
        searchList:null,
        keyword,
        id,
        toShow:true
    },
    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            axios.get(url.searchList,{keyword,id}).then(res=>{
                this.searchList = res.data.lists
            })
        },
        move(){
            if(document.documentElement.scrollTop > 100){
                console.log(1)
                this.toShow = true
            }else{
                console.log(2)
                this.toShow = false
            }
        },
        toTop(){
            Velocity(document.body,'scroll',{duration:500})
        }
    },
    mixins:[mixin]
})