<template>
  <div class="home">
    <header-top :title="address">
      <a href="" slot="left" class="header-search">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <router-link to="/login" slot="right" class="header-login">
        登录|注册
      </router-link>
    </header-top>
    <div class="w-swiper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in newArr"
            :key="index"
          >
            <ul class="food-wrap">
              <li class="link_to_food" v-for="ele in item" :key="ele.id">
                <img :src="imgBaseUrl + ele.image_url" alt="" />
                <span class="food-name">{{ ele.title }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
    <div class="shop-wrap">
      <div class="shop-header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="near-shop">附近商家</span>
      </div>
      <ul class="shop-box">
        <shop-list
          v-for="(item, index) in shopList"
          :key="index"
          :shopInfo="item"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import headerTop from "@/components/headerTop/headerTop.vue";
import shopList from "@/components/shopList/shopList.vue";
import { getCategory, getShops } from "@/api/index.js";
import { cutArr } from "@/util/index.js";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  data() {
    return {
      title: "昌平区北七家修正大厦(北清路北)",
      imgBaseUrl: "https://fuss10.elemecdn.com",
      newArr: [],
      shopList: []
    };
  },
  computed: {
    address: function() {
      return this.$store.state.position.local.address || "";
    }
  },
  components: {
    headerTop,
    shopList
  },
  created() {
    getCategory().then(res => {
      cutArr(res, 8, this.newArr);
      this.$nextTick(() => {
        var mySwiper = new Swiper(".swiper-container", {
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          },

          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          },

          // 如果需要滚动条
          scrollbar: {
            el: ".swiper-scrollbar"
          }
        });
      });
    });
    getShops().then(res => {
      this.shopList = res;
    });
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/default.scss";
.home {
  width: 100%;
  box-sizing: border-box;
  padding-top: 45px;
  .w-swiper {
    margin-top: 15px;
    .swiper-container {
      width: 100%;
      height: 200px;
      .food-wrap {
        flex-wrap: wrap;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        height: 200px;
        .link_to_food {
          width: 25%;
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
          }
        }
      }
      .swiper-button-prev {
        width: 30px;
        height: 20px;
      }
      .swiper-button-next {
        width: 30px;
        height: 20px;
      }
    }
  }
  .shop-wrap {
    width: 100%;
    padding-bottom: 50px;
    margin-top: 10px;
    @include top-border-1px(#e4e4e4);
    .shop-header {
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      padding-left: 10px;
      padding-top: 10px;
      .near-shop {
        margin-left: 10px;
      }
    }
    .shop-box {
      width: 100%;
    }
  }
}
</style>