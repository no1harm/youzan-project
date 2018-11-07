<template>
    <div class="container " style="min-height: 597px;">
      <div class="block-list address-list section section-first js-no-webview-block">
        <a class="block-item js-address-item address-item address-item-default" 
            @click="toEdit"
            v-for="list in lists"
            :class="{'address-item-default':list.isDefault}"
            :key="list.id"
            >
          <div class="address-title">{{list.name}} {{list.tel}}</div>
          <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
          <a class="address-edit">修改</a>
        </a>
      </div>
      <div v-if="lists&&!lists.length">
        没有地址，请添加
      </div>
      <div class="block stick-bottom-row center">
        <router-link to='/address/form' class="btn btn-blue js-no-webview-block js-add-address-btn" href="https://pfmarket.youzan.com/user/address/form?m_alias=3nu78u467kddj&amp;from=">
              新增地址
          </router-link>
      </div>
    </div>
</template>

<script>
import Address from 'js/addressService.js'
export default {
    name: 'All',
    data() {
      return {
        lists:null
      }
    },
    created() {
        Address.list().then(res=>{
          console.log(res)
          this.lists = res.data.lists
        })
    },
    methods:{
        toEdit(){
            this.$router.push({path:'/address/form'})
        }
    },
    components: {

    }
}
</script>

<style>
@import './address_base.css';
@import './address.css';
</style>
