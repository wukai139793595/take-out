<template>
  <div class="food-show" v-if="isShow" @click="toggleShow">
    <div class="food-content" @click="stopClick">
      <div class="image-header">
        <!-- <img v-mylazy="food.image" alt="" /> -->
        <img-lazy :imgSrc="food.image" class="img-lazy"></img-lazy>
        <div class="icon-wrap" @click="toggleShow">
          <i class="iconfont icon-arrow_left"></i>
        </div>
        <span>{{ food.info }}</span>
      </div>
      <div class="food-info">
        <p class="food-name">{{ food.name }}</p>
        <p class="detail">
          <span class="sell-count">月售{{ food.sellCount }}份</span>
          <span class="rating">好评率{{ food.rating }}%</span>
        </p>
        <div class="sell-money">
          <span class="money">{{ food.price }}￥</span>
          <span class="control-wrap">
            <cart-control :food="food" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartControl from "../cartControl/cartControl.vue";
import imgLazy from "@/components/imgLazy/imgLazy.vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  components: {
    cartControl
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
    },
    stopClick(event) {
      event.stopPropagation();
    }
  }
};
</script>

<style lang="scss" scoped>
.food-show {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: rgba(111, 111, 111, 0.5);
  .food-content {
    width: 80%;
    height: 65%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    .image-header {
      width: 100%;
      height: 72%;
      position: relative;
      .img-lazy {
        width: 100%;
        height: 100%;
      }
      // img {
      //   width: 100%;
      //   height: 100%;
      // }
      .icon-wrap {
        position: absolute;
        top: 10px;
        left: 0;
        i {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
      span {
        font-size: 10px;
        color: #ddd;
        letter-spacing: 0;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 10px 10px;
        text-align: left;
      }
    }
    .food-info {
      width: 100%;
      height: 28%;
      position: relative;
      padding: 18px;
      box-sizing: border-box;
      background-color: #fff;
      text-align: left;
      .food-name {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: #07111b;
      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        height: 10px;
        font-size: 0;
        .sell-count {
          margin-right: 12px;
          font-size: 10px;
          color: #93999f;
        }
        .rating {
          font-size: 10px;
          color: #93999f;
        }
      }
      .sell-money {
        font-weight: 700;
        line-height: 24px;
        position: relative;
        .money {
          margin-right: 8px;
          font-size: 14px;
          color: #f01414;
        }
        .control-wrap {
          position: absolute;
          right: -6px;
          top: -5px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>