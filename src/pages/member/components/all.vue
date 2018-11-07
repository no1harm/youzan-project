<template>
    <div class="container " style="min-height: 597px;">
      <div class="block-list address-list section section-first js-no-webview-block">
        <a class="block-item js-address-item address-item " href="https://pfmarket.youzan.com/user/address/form?m_alias=3nu78u467kddj&amp;id=69150287&amp;from=">
          <div class="address-title">tony 13112345678</div>
          <p>广东省珠海市香洲区南方软件园</p>
        </a>
        <a class="block-item js-address-item address-item address-item-default" @click="toEdit">
          <div class="address-title">tony 13112345678</div>
          <p>北京市北京市东城区天安门</p>
          <a class="address-edit">修改</a>
        </a>
      </div>
      <div class="block stick-bottom-row center">
        <router-link to='/address/form' class="btn btn-blue js-no-webview-block js-add-address-btn" href="https://pfmarket.youzan.com/user/address/form?m_alias=3nu78u467kddj&amp;from=">
              新增地址
          </router-link>
      </div>
    </div>
</template>

<script>
export default {
    name: 'All',
    data() {
      return {

      }
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

<style scoped>
@import './address_base.css';
@import './address.css';
</style>
