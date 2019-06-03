<template>
  <div class="shop-list">
    <a href="javascript:void(0)" @click="$router.push('/shop')">
      <div class="img-box">
        <!-- <img v-lazy="shopInfo.image_path" alt="" /> -->
        <!-- <img-lazy class="lazy-wrap" :imgSrc="shopInfo.image_path" /> -->
        <img v-mylazy="shopInfo.image_path" alt="" />
      </div>
      <div class="shop-info">
        <section class="shop-name">
          <h4>{{ shopInfo.name }}</h4>
          <ul>
            <li v-for="item in shopInfo.supports" :key="item.id">
              {{ item.icon_name }}
            </li>
          </ul>
        </section>
        <section class="shop-rating">
          <rating />
          <span class="count">月售{{ shopInfo.recent_order_num }}单</span>
          <span class="delivery">硅谷专送</span>
        </section>
        <section class="shop-distance">
          <span>¥{{ shopInfo.float_minimum_order_amount }}起送</span>
          <span>/</span>
          <span>配送费约¥{{ shopInfo.float_delivery_fee }}</span>
        </section>
      </div>
    </a>
  </div>
</template>

<script>
import Rating from "@/components/shopList/rating/rating.vue";
// import imgLazy from "@/components/imgLazy/imgLazy.vue";
export default {
  props: {
    shopInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    Rating
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/default.scss";
.shop-list {
  width: 100%;
  a {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 8px;
    .img-box {
      box-sizing: border-box;
      width: 23%;
      height: 75px;
      padding-right: 10px;
      .lazy-wrap {
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .shop-info {
      flex: 1;
      text-align: left;
      .shop-name {
        h4 {
          float: left;
          width: 200px;
          color: #333;
          font-size: 16px;
          line-height: 16px;
          font-weight: 700;
          @extend %ellipse;
          &::before {
            content: "\54C1\724C";
            display: inline-block;
            font-size: 11px;
            line-height: 11px;
            color: #333;
            background-color: #ffd930;
            padding: 2px 2px;
            border-radius: 2px;
            margin-right: 5px;
          }
        }
        ul {
          float: right;
          li {
            padding: 0 3px;
            display: inline-block;
          }
        }
        @include clear-float;
      }
      .shop-rating {
        margin-top: 18px;
        margin-bottom: 8px;
        span {
          position: relative;
          top: 2px;
        }
        .count {
          vertical-align: middle;
          font-size: 10px;
          color: #666;
        }
        .delivery {
          float: right;
          color: #02a774;
          border: 1px solid #02a774;
          font-size: 10px;
          padding: 0 1px;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>