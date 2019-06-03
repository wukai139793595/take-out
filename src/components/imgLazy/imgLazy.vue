<template>
  <div class="img-lazy">
    <img :src="imgSrc" alt="" v-if="isLoad" />
    <img :src="errorSrc" alt="" v-if="!isLoad && isError" />
    <div class="instead" v-if="!isLoad && !isError">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "img-lazy",
  props: {
    imgSrc: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      isLoad: false,
      isError: false,
      errorSrc: "./static/images/error.jpg"
    };
  },
  created() {
    var self = this;
    var oImg = new Image();
    oImg.onload = function(e) {
      setTimeout(() => {
        self.isLoad = true;
      }, 2000);
    };
    oImg.onerror = function(e) {
      self.isError = true;
    };
    oImg.src = this.imgSrc;
  }
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
  .instead {
    width: 100%;
    height: 100%;
    background-color: #e4e4e4;
    position: relative;
    .circle {
      position: absolute;
      left: calc(50% - 10px);
      top: calc(50% - 10px);
      width: 20px;
      height: 20px;
      border-top: 2px solid #aaa;
      border-left: 2px solid #aaa;
      border-bottom: 2px solid #aaa;
      border-radius: 50%;
      transform: rotate(0);
      animation: run 1.5s linear infinite;
    }
    @keyframes run {
      from {
        transform: rotate(0);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>