import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

let app = new Vue({
    el:'#app',
    data:{
        lists:null
    },
    created() {
        axios.post(url.hotLists,{
            pageNum:1,
            pageSize:6
        }).then(res=>{
            this.lists = res.data.lists
            console.log(this.lists)
        })
    },
})