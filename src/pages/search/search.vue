<template>
  <div class="search">
    <header-top title="搜索" />
    <form class="search_form">
      <input
        type="search"
        placeholder="请输入商家名称"
        class="search_input"
        v-model="keyword"
      />
      <input
        type="submit"
        class="search_submit"
        @click.prevent="submit($event)"
      />
    </form>
    <div class="scroll-container" ref="scrollContainer">
      <!-- v-if="resultArr.length" -->

      <ul class="content">
        <div class="pulldown-wrapper">
          <div v-show="beforePullDown">
            <span>Pull Down and refresh</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>Loading...</span>
            </div>
            <div v-show="!isPullingDown"><span>Refresh success</span></div>
          </div>
        </div>
        <li v-for="(item, index) in resultArr" :key="index">
          <section class="item_left">
            <!-- <img :src="baseImgSrc + item.image_path" class="restaurant_img" /> -->
            <img-lazy
              :imgSrc="baseImgSrc + item.image_path"
              class="restaurant_img"
            ></img-lazy>
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{ item.name }}</span>
              </p>
              <p>月售{{ item.recent_order_num }}单</p>
              <p>
                {{ item.float_minimum_order_amount }} 元起送 / 距离{{
                  item.distance
                }}
              </p>
            </div>
          </section>
        </li>
        <div class="pullup-wrapper">
          <div v-if="noMore">
            <span class="pullup-txt">没有更多了</span>
          </div>
          <div v-if="!isPullUpLoad && !noMore" class="before-trigger">
            <span class="pullup-txt">Pull up and load more</span>
          </div>
          <div v-if="isPullUpLoad && !noMore" class="after-trigger">
            <span class="pullup-txt">Loading...</span>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
const TIME_BOUNCE = 800;
const TIME_STOP = 600;
const THRESHOLD = 70;
const STOP = 56;
import headerTop from "@/components/headerTop/headerTop.vue";
import imgLazy from "@/components/imgLazy/imgLazy.vue";
import { reqSearchShop } from "@/api/index.js";
export default {
  data() {
    return {
      keyword: "",
      baseImgSrc: "http://cangdu.org:8001/img/",
      resultArr: [],
      locked: false,
      downText: "下拉刷新",
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      noMore: false,
      count: 0
    };
  },
  components: {
    headerTop,
    imgLazy
  },
  created() {},
  methods: {
    submit() {
      let { keyword } = this;
      if (keyword === "") {
        this.$messageAlert("请输入关键字", "提示");
        return;
      }
      this.getData(keyword, this.callback);
    },
    async getData(key, cb) {
      this.resultArr = await reqSearchShop({
        keyword: key,
        geohash: "40.10038,116.36867"
      });
      cb &&
        this.$nextTick(() => {
          cb();
          this.count++;
        });
    },
    callback() {
      let self = this;
      if (!this.scroll) {
        this.scroll = new this.$BScroll(this.$refs.scrollContainer, {
          scrollY: true,
          // bounceTime: TIME_BOUNCE,
          pullUpLoad: {
            threshold: THRESHOLD
          },
          pullDownRefresh: {
            threshold: THRESHOLD,
            stop: STOP
          },
          probeType: 2
        });
        this.scroll.on("pullingDown", () => {
          this.beforePullDown = false;
          this.isPullingDown = true;
          this.resultArr = [];
          this.noMore = false;
          this.count = 0;
          this.getData(this.keyword);
          setTimeout(() => {
            this.isPullingDown = false;
          }, 1000);
          setTimeout(() => {
            this.beforePullDown = true;
            this.scroll.finishPullDown();
          }, 2000);
        });
        this.scroll.on("pullingUp", () => {
          if (this.locked) {
          } else {
            if (!this.noMore) {
              this.locked = true;
              this.isPullUpLoad = true;
              reqSearchShop({
                keyword: this.keyword,
                geohash: "40.10038,116.36867"
              }).then(res => {
                this.count++;
                this.resultArr.push(...res);
                this.resultArr = JSON.parse(JSON.stringify(this.resultArr));
                if (this.count > 1) {
                  this.noMore = true;
                }
                this.$nextTick(() => {
                  this.isPullUpLoad = false;
                  self.locked = false;
                  this.scroll.finishPullUp();
                });
              });
            }
          }
        });
      } else {
        this.scroll.refresh();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 100%;
  height: 100%;
  .search_form {
    margin-top: 45px;
    background-color: #fff;
    padding: 12px 8px;
    .search_input {
      float: left;
      width: 79%;
      border: 4px solid #f2f2f2;
      font-size: 14px;
      color: #333;
      background-color: #f2f2f2;
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;
    }
    .search_submit {
      float: right;
      width: 18%;
      border: 4px solid #02a774;
      font-size: 16px;
      color: #fff;
      background-color: #02a774;
      height: 35px;
      padding: 0 4px;
      border-radius: 2px;
      font-weight: bold;
      outline: none;
    }
  }
  .scroll-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 90px;
    overflow: hidden;
    .content {
      .pulldown-wrapper {
        position: absolute;
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        transform: translateY(-100%) translateZ(0);
        text-align: center;
        color: #999;
      }
      .pullup-wrapper {
        padding: 20px;
        text-align: center;
        color: #999;
      }
      li {
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 10px;
        border-bottom: 1px solid #e4e4e4;
        .item_left {
          margin-right: 10px;
          .restaurant_img {
            width: 50px;
            height: 50px;
            display: block;
          }
          img {
            width: 50px;
            height: 50px;
            display: block;
          }
        }
        .item_right {
          font-size: 12px;
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          .item_right_text {
            p {
              line-height: 12px;
              margin-bottom: 6px;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>