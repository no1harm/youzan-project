import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin'

new Vue({
    el:'.container',
    data:{
        lists:null
    },
    computed:{},
    created(){
        this.getList()
    },
    methods:{
        getList(){
            axios.get(url.cartList).then(res=>{
                this.lists = res.data.cartList
            })
        }
    },
    mixins:[mixin]
})




















// import Mock from 'mockjs'

// let Random = Mock.Random

// let data = Mock.mock({
//     'cartList|3':[{
//         'goodsList|1-5':[{
//             id:Random.int(10000,100000),
//             img:Mock.mock('@Img(90x90,@color)')
//         }]
//     }]
// })

// console.log(data)

