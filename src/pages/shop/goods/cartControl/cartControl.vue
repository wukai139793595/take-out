<template>
  <div>
    <transition name="food">
      <div
        class="iconfont icon-remove_circle_outline"
        @click="removeFood($event)"
        v-if="food.count"
      ></div>
    </transition>
    <div class="number" v-if="food.count">{{ food.count }}</div>
    <div class="iconfont icon-add_circle" @click.stop="addFood($event)"></div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
export default {
  props: ["food"],
  computed: {
    ...mapState({
      selectList: state => state.shop.selectList
    })
  },
  methods: {
    addFood() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
        this.selectList.push(this.food);
        let temp = [...this.selectList];
        this.$store.commit("shop/changeSelectList", temp);
        console.log(this.food);
      } else {
        this.food.count++;
      }
    },
    removeFood() {
      if (this.food.count) {
        this.food.count--;
        if (this.food.count === 0) {
          this.selectList.splice(this.selectList.indexOf(this.food), 1);
          this.$store.commit("shop/changeSelectList", this.selectList);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  .icon-remove_circle_outline {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #02a774;
  }
  .number {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: #93999f;
  }
  .icon-add_circle {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #02a774;
  }
  .food-leave-active,
  .food-enter-active {
    transition: all 0.5s;
  }
  .food-enter,
  .food-leave-to {
    transform: translateX(20px) rotate(180deg);
    opacity: 0;
  }
}
</style>