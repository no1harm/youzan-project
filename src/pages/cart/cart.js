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
        lists:null,
        total:0
    },
    computed:{
        allSelected:{
            get(){
                if(this.lists && this.lists.length){
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
                return true
            },
            set(newVal){
                this.lists.forEach(shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach(good =>{
                        good.checked = newVal
                    })
                })
            }
        },
        selectLists(){
            if(this.lists && this.lists.length){
                let arr = []
                let total = 0
                this.lists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good)
                            total += good.price*good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            axios.get(url.cartList).then(res=>{
                let list = res.data.cartList
                list.forEach(shop =>{
                    shop.checked = true
                    shop.goodsList.forEach(good =>{
                        good.checked = true
                    })
                })
                this.lists = list
            })
        },
        selectGood(shop,good){
            good.checked = !good.checked
            shop.checked = shop.goodsList.every(good => {
                return good.checked
            })
        },
        selectShop(shop){
            shop.checked = !shop.checked
            shop.goodsList.forEach(good => {
                good.checked = shop.checked
            })
        },
        selectAll(){
            this.allSelected = !this.allSelected
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

