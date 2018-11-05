import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import url from 'js/api.js'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin'
import Swipe from 'components/Swipe.vue'

let {id} = qs.parse(location.search.substr(1))

let detailTab = ['商品详情','本店成交']

new Vue({
    el:'#app',
    data:{
        details:null,
        detailTab,
        currentTab:0,
        dealList:null,
        bannerLists:null
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.get(url.details,{id}).then(res=>{
                this.details = res.data.data
                this.bannerLists = []
                this.details.imgs.forEach(item => {
                    this.bannerLists.push({
                        clickUrl:'',
                        img:item
                    })
                })
            })
        },
        changeTab(index){
            this.currentTab = index
            if(index === 1){
                this.getDeal()
            }
        },
        getDeal(){
            axios.get(url.deal,{id}).then(res=>{
                console.log(res)
                this.dealList = res.data.data.lists
            })
        }
    },
    mixins:[mixin]
})