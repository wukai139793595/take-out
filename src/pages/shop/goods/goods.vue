<template>
  <div class="goods">
    <section class="menu-wrapper">
      <ul class="content">
        <li
          :class="{ current: index === currentIndex }"
          v-for="(item, index) in goodsArr"
          :key="index"
          @click="selectType($event, index)"
        >
          <span class="text bottom-border-1px">
            <img :src="item.icon" class="icon" v-if="item.icon" />
            {{ item.name }}
          </span>
        </li>
      </ul>
    </section>
    <section class="foods-wrapper">
      <ul class="content">
        <li
          class="food-list-hook"
          v-for="(item1, index1) in goodsArr"
          :key="index1"
        >
          <h1 ref="foodItem">{{ item1.name }}</h1>
          <ul>
            <li
              class="food-item"
              @click="foodShow($event, ele)"
              v-for="(ele, ind) in item1.foods"
              :key="ind"
            >
              <div class="icon">
                <img width="57" height="57" v-mylazy="ele.icon" />
              </div>
              <div class="content-food">
                <h2 class="name">{{ ele.name }}</h2>
                <p class="desc">{{ ele.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ ele.sellCount }}份</span>
                  <span>好评率100%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ ele.price }}</span>
                  <!---->
                </div>
                <cart-control class="cart-control" :food="ele" />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section>
      <food-show :food="selectFood" ref="foodShow" />
    </section>
    <section>
      <shop-cart class="cart-wrap" />
    </section>
  </div>
</template>

<script>
import cartControl from "./cartControl/cartControl.vue";
import shopCart from "./shopCart/shopCart.vue";
import foodShow from "./foodShow/foodShow.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      menuScroll: null,
      foodScroll: null,
      heightArr: [],
      currentIndex: 0,
      selectFood: {}
    };
  },
  computed: {
    ...mapState({
      goodsArr: state => state.shop.shopGoods
    })
  },
  created() {
    this.initData();
  },
  components: {
    cartControl,
    shopCart,
    foodShow
  },
  methods: {
    initData() {
      var self = this;
      this.$store.commit("shop/changeSelectList", []);
      this.$store.dispatch("shop/receiveShopGoods", {
        shopId: 1,
        callback: self.callback.bind(self)
      });
    },
    foodShow(event, food) {
      this.selectFood = food;
      console.log(this.selectFood);
      this.$refs.foodShow.toggleShow();
    },
    callback() {
      this.$nextTick(() => {
        this.$refs.foodItem.forEach((item, index) => {
          this.heightArr.push(item.offsetTop);
        });
        this.menuScroll = new this.$BScroll(".menu-wrapper", {
          scrollY: true,
          click: true
        });
        this.foodScroll = new this.$BScroll(".foods-wrapper", {
          scrollY: true,
          probeType: 2,
          click: true
        });
        this.foodScroll.on("scroll", pos => {
          let { heightArr } = this;
          let len = heightArr.length;
          let y = -pos.y;
          let j = 0;
          for (let i = 0; i < len; i++) {
            if (y >= heightArr[i] && y < heightArr[i + 1]) {
              this.currentIndex = i;
              break;
            }
          }
        });
        this.foodScroll.on("scrollEnd", pos => {
          let { heightArr } = this;
          let len = heightArr.length;
          let y = -pos.y;
          let j = 0;
          for (let i = 0; i < len; i++) {
            if (y >= heightArr[i] && y < heightArr[i + 1]) {
              this.currentIndex = i;
              break;
            }
          }
        });
      });
    },

    selectType(event, index) {
      let y = -this.heightArr[index];
      this.currentIndex = index;

      this.foodScroll.scrollTo(0, y, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;
  .menu-wrapper {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 80px;
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .content {
      li {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        span {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          position: relative;
          border: none;
          font-size: 12px;
          img {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
          }
        }
      }
      .current {
        position: relative;
        margin-top: -1px;
        background: #fff;
        color: #02a774;
        font-weight: 700;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    .content {
      .food-list-hook {
        h1 {
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          color: #93999f;
          background: #f3f5f7;
        }
        ul {
          li {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            position: relative;
            border: none;
            .icon {
              flex: 0 0 57px;
              margin-right: 10px;
              img {
              }
            }
            .content-food {
              text-align: left;
              flex: 1;
              position: relative;
              h2 {
                margin: 2px 0 8px 0;
                height: 14px;
                line-height: 14px;
                font-size: 14px;
                color: #07111b;
              }
              p {
                line-height: 12px;
                margin-bottom: 8px;
                font-size: 10px;
                color: #93999f;
              }
              .extra {
                line-height: 10px;
                font-size: 10px;
                color: #93999f;
                span {
                  margin-right: 12px;
                }
              }
              .price {
                font-weight: 700;
                line-height: 24px;
                span {
                  margin-right: 8px;
                  font-size: 14px;
                  color: #f01414;
                }
              }
              .cart-control {
                position: absolute;
                right: 0px;
                bottom: -5px;
              }
            }
          }
        }
      }
    }
  }
  .cart-wrap {
    position: fixed;
    bottom: 0px;
    left: 0px;
    height: 48px;
    width: 100%;
  }
}
</style>