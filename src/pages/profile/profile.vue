<template>
  <div class="profile">
    <header-top title="我的"></header-top>
    <section class="userinfo">
      <a href="javascript:void(0)">
        <div class="img-wrap">
          <i class="iconfont icon-person"></i>
        </div>
        <div class="account-wrap">
          <div class="account-box" v-if="userInfo.name">
            {{ userInfo.name }}
          </div>
          <div class="phone-box">
            <i class="iconfont icon-shouji icon-mobile"></i>
            <span>{{
              userInfo.phone ? userInfo.phone : "暂无绑定手机号"
            }}</span>
          </div>
        </div>
        <div class="direct-left">
          <i class="iconfont icon-jiantou1"></i>
        </div>
      </a>
    </section>
    <section class="profile-data">
      <ul>
        <a href="javascript:void(0)" class="data-link">
          <div class="data-link-top">
            <span>0.00</span>
            元
          </div>
          <div class="data-link-bottom">我的余额</div>
        </a>
        <a href="javascript:void(0)" class="data-link"
          ><div class="data-link-top">
            <span class="red">0</span>
            个
          </div>
          <div class="data-link-bottom">我的优惠</div></a
        >
        <a href="javascript:void(0)" class="data-link">
          <div class="data-link-top">
            <span class="green">0</span>
            分
          </div>
          <div class="data-link-bottom">我的积分</div>
        </a>
      </ul>
    </section>
    <section class="profile_my_order">
      <a
        href="javascript:void(0)"
        v-for="(item, index) in orderArr"
        :key="index"
      >
        <span><i :class="item.icon"></i></span>
        <div class="my_order_div">
          <span>{{ item.title }}</span>
          <span class="my_order_icon"
            ><i class="iconfont icon-jiantou1"></i
          ></span>
        </div>
      </a>
    </section>
    <section class="profile_my_order">
      <a href="javascript:" class="my_order">
        <span>
          <i class="iconfont icon-fuwu"></i>
        </span>
        <div class="my_order_div">
          <span>服务中心</span>
          <span class="my_order_icon"
            ><i class="iconfont icon-jiantou1"></i
          ></span></div
      ></a>
    </section>
    <section class="profile_my_order" v-if="userInfo._id">
      <button
        class="mint-button mint-button--danger mint-button--normal"
        style="width: 100%;"
        @click="logout($event)"
      >
        <label class="mint-button-text">退出登陆</label>
      </button>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import headerTop from "@/components/headerTop/headerTop.vue";
export default {
  data() {
    return {
      orderArr: [
        {
          icon: "iconfont icon-order-s",
          title: "我的订单"
        },
        {
          icon: "iconfont icon-jifen",
          title: "积分商城"
        },
        {
          icon: "iconfont icon-vip",
          title: "硅谷外卖会员卡"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  components: {
    headerTop
  },
  methods: {
    logout(event) {
      let self = this;
      function callback() {
        self.$router.push({ path: "/" });
      }
      this.$store.dispatch("user/receiveLogout", callback.bind(self));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/default.scss";
.profile {
  .userinfo {
    margin-top: 45.5px;
    a {
      display: block;
      position: relative;
      background: #02a774;
      padding: 20px 10px;
      color: #7e8c8d;
      text-decoration: none;
      @include clear-float;
      .img-wrap {
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: top;
        i {
          background: #e4e4e4;
          font-size: 62px;
        }
      }
      .account-wrap {
        float: left;
        margin-top: 8px;
        margin-left: 15px;
        .account-box {
          font-weight: 700;
          font-size: 18px;
          color: #fff;
          padding-bottom: 2px;
          text-align: left;
        }
        .phone-box {
          font-weight: 700;
          font-size: 18px;
          color: #fff;
          margin-left: -15px;
          i {
            font-size: 30px;
            vertical-align: middle;
          }
          span {
            font-size: 14px;
            color: #fff;
            margin-left: -15px;
          }
        }
      }
      .direct-left {
        width: 12px;
        height: 12px;
        position: absolute;
        right: 15px;
        top: 40%;
        i {
          color: #fff;
          font-size: 5px;
        }
      }
    }
  }
  .profile-data {
    position: relative;
    border: none;
    width: 100%;
    background: #fff;
    overflow: hidden;
    ul {
      .data-link {
        float: left;
        width: 33%;
        text-align: center;
        border-right: 1px solid #f1f1f1;
        .data-link-top {
          display: block;
          width: 100%;
          font-size: 14px;
          color: #333;
          padding: 15px 5px 10px;
          span {
            display: inline-block;
            font-size: 30px;
            color: #f90;
            font-weight: 700;
            line-height: 30px;
          }
          .red {
            color: #ff5f3e;
          }
          .green {
            color: #6ac20b;
          }
        }
        .data-link-bottom {
          display: inline-block;
          font-size: 14px;
          color: #666;
          font-weight: 400;
          padding-bottom: 10px;
        }
      }
    }
  }
  .profile_my_order {
    position: relative;
    margin-top: 10px;
    background: #fff;
    border-top: 1px solid #eee;
    a {
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-left: 15px;
      & > span {
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 20px;
        height: 20px;
        i {
          margin-left: -10px;
          font-size: 30px;
        }
        .icon-order-s {
          color: #02a774;
        }
        .icon-jifen {
          color: #ff5f3e;
        }
        .icon-vip {
          color: #f90;
        }
      }
      .my_order_div {
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: 18px 10px 18px 0;
        font-size: 16px;
        color: #333;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        span {
          display: block;
          color: #333;
        }
      }
    }
  }
  .profile_my_order {
    position: relative;
    margin-top: 10px;
    background: #fff;
    .my_order {
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-left: 15px;
      & > span {
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 20px;
        height: 20px;
        i {
          color: #02a774;
          margin-left: -10px;
          font-size: 30px;
        }
      }
      .my_order_div {
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: 18px 10px 18px 0;
        font-size: 16px;
        color: #333;
      }
    }
  }
  .profile_my_order {
    position: relative;
    margin-top: 10px;
    background: #fff;
    .mint-button {
      width: 100%;
      display: inline-block;
      padding: 0 12px;
      color: #fff;
      background-color: #ef4f4f;
      border-radius: 4px;
      border: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: inherit;
      display: block;
      font-size: 18px;
      height: 41px;
      outline: 0;
      overflow: hidden;
      position: relative;
      text-align: center;
      .mint-button-text {
        color: #fff;
      }
    }
  }
}
</style>