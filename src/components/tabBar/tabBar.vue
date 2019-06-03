<template>
  <div class="tab-bar">
    <router-link
      :to="item.url"
      replace
      v-for="(item, index) in barList"
      :key="index"
      :class="{ choose: $route.path == item.url }"
    >
      <span class="icon-wrap">
        <i :class="item.iconCla"></i>
      </span>
      <span class="text">{{ item.text }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barList: [
        {
          url: "/",
          iconCla: "iconfont icon-waimai",
          text: "外卖"
        },
        {
          url: "/search",
          iconCla: "iconfont icon-search",
          text: "搜索"
        },
        {
          url: "/order",
          iconCla: "iconfont icon-dingdan",
          text: "订单"
        },
        {
          url: "/profile",
          iconCla: "iconfont icon-geren",
          text: "我的"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/default.scss";
.tab-bar {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  background-color: #fff;
  border-top: 1px solid #eee;
  .choose {
    color: $primary-color;
  }
  a {
    color: #666;
    text-decoration: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>