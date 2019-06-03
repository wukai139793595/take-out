<template>
  <div class="header-top">
    <slot name="left" />
    <span class="title">{{ title }}</span>
    <slot name="right" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "",
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/default.scss";
.header-top {
  background-color: $primary-color;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;
  color: #fff;
  .title {
    display: inline-block;
    max-width: 50%;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    @extend %ellipse;
  }
  .header-search {
    float: left;
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
    color: #fff;
    .iconfont {
      font-size: 20px;
    }
  }
  .header-login {
    float: right;
    height: 45px;
    line-height: 45px;
    padding-right: 10px;
    color: #fff;
    font-size: 14px;
  }
  @include clear-float;
}
</style>