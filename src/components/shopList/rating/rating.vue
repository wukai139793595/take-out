<template>
  <div class="rating">
    <div class="rating-box" v-for="item in 5" :key="item">
      <img v-if="score >= item" src="@/assets/images/star48_on@2x.png" alt="" />
      <img
        v-if="score < item && score > item - 1"
        src="@/assets/images/star48_half@2x.png"
        alt=""
      />
      <img
        v-if="score <= item - 1"
        src="@/assets/images/star48_off@2x.png"
        alt=""
      />
    </div>
    <div class="score">
      {{ score }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      default: 3.2
    }
  }
};
</script>

<style lang="scss" scoped>
.rating {
  display: inline-block;
  .rating-box {
    display: inline-block;

    img {
      width: 15px;
      height: 15px;
    }
  }
  .score {
    display: inline-block;
    color: #ff6000;
    font-size: 10px;
    position: relative;
    top: 2px;
  }
}
</style>