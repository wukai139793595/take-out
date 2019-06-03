<template>
  <div class="shop-head">
    <nav :style="`background-image:url(${shopInfo.bgImg});`">
      <div @click="$router.back()" class="back">
        <i class="iconfont icon-arrow_left"></i>
      </div>
    </nav>
    <section class="name-wrap">
      <img :src="shopInfo.avatar" alt="" />
      <div class="name-content">
        <span class="content-tag"><span>品牌</span></span>
        <span class="shop-name">{{ shopInfo.name }}</span>
        <i class="content-icon"></i>
      </div>
      <div class="delivery">
        <span>{{ shopInfo.score }}</span>
        <span>月售{{ shopInfo.sellCount }}单</span>
        <span>{{ shopInfo.description }}</span>
        <span>约{{ shopInfo.deliveryTime }}分钟</span>
        <span>距离{{ shopInfo.distance }}</span>
      </div>
    </section>
    <section class="discount" v-if="shopInfo.supports">
      <span class="discounts-left">
        <span class="type">
          <span>首单</span>
        </span>
        <span class="activity-content ellipsis">{{
          shopInfo.supports[0].content
        }}</span>
      </span>
      <span class="discounts-right">{{ shopInfo.supports.length }}优惠</span>
    </section>
  </div>
</template>

<script>
export default {
  props: ["shopInfo"]
};
</script>

<style lang="scss" scoped>
.shop-head {
  nav {
    background-size: cover;
    background-repeat: no-repeat;
    height: 40px;
    padding: 5px 10px;
    position: relative;
    .back {
      position: absolute;
      top: 10px;
      left: 0;
      color: #7e8c8d;
      text-decoration: none;
      display: inline;
      i {
        display: block;
        padding: 5px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .name-wrap {
    padding: 30px 20px 5px 20px;
    position: relative;
    display: flex;
    background: #fff;
    text-align: center;
    flex-direction: column;
    img {
      box-shadow: 0 0 0.4vw 0 rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
      left: 50%;
      width: 66px;
      height: 66px;
      border-radius: 2px;
      margin-left: -33px;
      margin-top: -40px;
    }
    .name-content {
      flex: 1;
      width: 100%;
      .content-tag {
        display: inline-block;
        border-radius: 2px;
        background-image: linear-gradient(90deg, #fff100, #ffe339);
        width: 36px;
        height: 18px;
        margin-right: 10px;
        color: #6a3709;
        font-style: normal;
        font-weight: 700;
        position: relative;
        span {
          position: absolute;
          left: 0;
          top: 0;
          right: -100%;
          bottom: -100%;
          font-size: 24px;
          font-weight: 600;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;

          color: #6a3709;
        }
      }
      .shop-name {
        font-weight: 700;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 20px;
        color: #333;
      }
      .content-icon {
        width: 20px;
        position: relative;
        height: 16px;
        &::after {
          content: "";
          border-style: solid;
          border-width: 6px 0 6px 7px;
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.67);
          position: absolute;
          left: 8px;
          top: 3px;
        }
      }
    }
    .delivery {
      white-space: nowrap;
      height: 12px;
      margin-top: 8px;
      font-size: 11px;
      color: #333;
      span {
        margin-right: 4px;
      }
    }
  }
  .discount {
    display: flex;
    background: #fff;
    border-radius: 1px;
    border: 1px solid #eee;
    padding: 5px 7px;
    font-size: 11px;
    color: #666;
    margin: 0 30px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .discounts-left {
      display: flex;
      flex: 1;
      overflow: hidden;
      .type {
        display: inline-block;
        border-radius: 1px;
        width: 36px;
        height: 18px;
        margin-right: 5px;
        color: #fff;
        font-style: normal;
        font-weight: 700;
        position: relative;
        background-color: #70bc46;
        span {
          position: absolute;
          left: 0;
          top: 0;
          right: -100%;
          bottom: -100%;
          font-size: 18px;
          font-weight: 600;
          -webkit-transform: scale(0.5);
          transform: scale(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }
      }
      .activity-content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .discounts-right {
      width: 50px;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      position: relative;
      padding-right: 10px;
      text-align: right;
      &::after {
        content: "";
        display: block;
        border-style: solid;
        border-width: 4px 4px 0;
        border-color: rgba(0, 0, 0, 0.57) transparent transparent;
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 0;
      }
    }
  }
}
</style>