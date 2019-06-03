<template>
  <div>
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ highlight: totalCount }">
            <i class="iconfont icon-shopping_cart" @click="toggleShow"></i>
          </div>
          <div class="num" v-if="totalCount">{{ totalCount }}</div>
        </div>
        <div class="price">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{ enough: totalPrice >= minPrice }">
          {{
            totalPrice > 0
              ? totalPrice >= minPrice
                ? "结算"
                : `还差${minPrice - totalPrice}元起送`
              : `￥${minPrice}元起送`
          }}
        </div>
      </div>
    </div>
    <transition name="cart">
      <div class="shopcart-list" v-show="isShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearCart">清空</span>
        </div>
        <div class="list-content">
          <ul class="content1">
            <li
              class="food"
              v-for="(item, index) in selectList"
              :key="index"
              style="pointer-events: auto;"
            >
              <span class="name">{{ item.name }}</span>
              <div class="price">
                <span>￥{{ item.price }}</span>
              </div>
              <cart-control :food="item" class="cart-wrap"></cart-control>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="isShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import cartControl from "../cartControl/cartControl.vue";
export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    cartControl
  },
  computed: {
    ...mapState({
      deliveryPrice: state => state.shop.shopInfo.deliveryPrice,
      minPrice: state => state.shop.shopInfo.minPrice,
      selectList: state => state.shop.selectList
    }),
    ...mapGetters("shop", ["totalPrice", "totalCount"])
  },
  methods: {
    toggleShow() {
      this.isShow = !this.isShow;
      if (this.isShow === true) {
        if (!this.scroll) {
          console.log(1111);
          this.$nextTick(() => {
            this.scroll = new this.$BScroll(".list-content", {
              click: true,
              scrollY: true,
              probeType: 2
            });
          });
        } else {
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
      }
    },
    clearCart() {
      this.$messageBox
        .confirm("确定要清空购物车", "notice")
        .then(res => {
          this.selectList.forEach((item, index) => {
            item.count = 0;
          });
          this.$store.commit("shop/changeSelectList", []);
        })
        .catch(err => {});
    }
  },
  watch: {
    selectList: {
      deep: true,
      handler(newValue, oldValue) {
        if (newValue.length === 0) {
          this.isShow = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  .content {
    position: relative;
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    z-index: 50;
    .content-left {
      flex: 1;
      text-align: left;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          i {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
          }
        }
        .highlight {
          background: #02a774;
          i {
            color: #fff;
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: #f01414;
          -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
        line-height: 24px;
        padding-right: 12px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        color: #fff;
      }
      .desc {
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 15px;
        margin-left: -45px;
        font-size: 10px;
      }
    }
    .content-right {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 105px;
      flex: 0 0 105px;
      width: 105px;
    }
    .pay {
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      background: #2b333b;
    }
    .enough {
      background: #00b43c;
      color: #fff;
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 49;
    width: 100%;
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: #07111b;
      }
      .empty {
        float: right;
        font-size: 12px;
        color: #00a0dc;
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      ul {
        .food {
          position: relative;
          padding: 12px 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          position: relative;
          border: none;
          text-align: left;
          .name {
            line-height: 24px;
            font-size: 14px;
            color: #07111b;
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: #f01414;
            span {
            }
          }
          .cart-wrap {
            position: absolute;
            right: 0;
            top: 7px;
          }
        }
      }
    }
  }
  .cart-enter-active,
  .cart-leave-active {
    transition: transform 0.5s;
  }
  .cart-enter,
  .cart-leave-to {
    transform: translateY(0);
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>