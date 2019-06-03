<template>
  <div class="shop">
    <shop-head :shopInfo="shopInfo"></shop-head>
    <ul class="link-wrap">
      <router-link replace tag="li" to="/shop/goods">点餐</router-link>
      <router-link replace tag="li" to="/shop/ratings">评价</router-link>
      <router-link replace tag="li" to="/shop/info">商家</router-link>
    </ul>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { reqShopInfo } from "@/api/index.js";
import shopHead from "./shopHead/shopHead";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      shopInfo: state => state.shop.shopInfo
    })
  },
  created() {
    this.$store.dispatch("shop/receiveShopInfo", { shopId: 1 });
  },
  components: {
    shopHead
  }
};
</script>

<style lang="scss" scoped>
.shop {
  .link-wrap {
    height: 40px;
    line-height: 40px;
    background: #fff;
    position: relative;
    border: none;
    li {
      float: left;
      width: 33.33333%;
      text-align: center;
      font-size: 14px;
      color: #4d555d;
      position: relative;
    }
    .router-link-active {
      color: #02a774;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 6px;
        width: 35px;
        height: 2px;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background: #02a774;
      }
    }
  }
}
</style>