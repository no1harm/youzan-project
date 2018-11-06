import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin'
import Velocity from 'velocity-animate'

new Vue({
    el:'.container',
    data:{
        lists:null,
        total:0,
        editingShop:null,
        editingShopIndex:-1,
        removeData:null
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
        allRemoveSelected:{
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good=>{
                        good.removeChecked = newVal
                    })
                }
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
        },
        removeLists(){
            if(this.editingShop){
                let arr = []
                this.editingShop.goodsList.forEach(good =>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
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
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good =>{
                        good.checked = true
                        good.removeChecked = false
                    })
                })
                this.lists = list
            })
        },
        selectGood(shop,good){
            let attr = this.editingShop?'removeChecked':'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good => {
                return good[attr]
            })
        },
        selectShop(shop){
            let attr = this.editingShop?'removeChecked':'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good => {
                good[attr] = shop[attr]
            })
        },
        selectAll(){
            let attr = this.editingShop?'allRemoveSelected':'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop,shopIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing?'完成':'编辑'
            this.lists.forEach((item,i) =>{
                if(shopIndex !== i){
                    item.editing = false
                    item.editingMsg = shop.editing?'':'编辑'
                }
            })
            this.editingShop = shop.editing?shop:null
            this.editingShopIndex = shop.editing?shopIndex:-1
        },
        reduce(good){
            if(good.number === 1) return
            axios.post(url.cartReduce,{
                id:good.id,
                number:1
            }).then(res=>{
                good.number--
            })
        },
        add(good){
            axios.post(url.cartAdd,{
                id:good.id,
                number:1
            }).then(res=>{
                good.number++
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            this.removeData = {shop,shopIndex,good,goodIndex}
            axios.post(url.cartRemove,{
                id:good.id
            }).then(res=>{
                shop.goodsList.splice(goodIndex,1)
                if(!shop.goodsList.length){
                    this.lists.splice(shopIndex,1)
                    this.removeShop()
                }
            })
        },
        removeList(){
            let ids = []
            this.removeLists.forEach(good=>{
                ids.push(good.id)
            })
            axios.post(url.cartMremove,{
                ids
            }).then(res=>{
                let arr = []
                this.editingShop.goodsList.forEach(good =>{
                    let index = this.removeLists.findIndex(item =>{
                        return item.id === good.id
                    })
                    if(index === -1){
                        arr.push(good)
                    }
                    if(arr.length){
                        this.editingShop.goodsList = arr
                    }else{
                        this.lists.splice(this.editingShopIndex,1)
                        this.removeShop()
                    }
                })
            })
        },
        removeShop(){
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop => {
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        start(e,good){
            // 拿到初始值的坐标
            good.startX = e.changedTouches[0].clientX
        },
        end(e,shopIndex,good,goodIndex){
            // 拿到结束值的坐标
            let endX = e.changedTouches[0].clientX
            let left = '0'
            if(good.startX - endX > 100){
                left = '-60px'
            }
            if(endX - good.startX > 100){
                left = '0px'
            }
            Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`],
                {left})           
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

