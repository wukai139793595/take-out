<template>
  <div id="app">
    <router-view />
    <tab-bar v-show="$route.meta.showBar" />
  </div>
</template>

<script>
import tabBar from "@/components/tabBar/tabBar.vue";
import { reqPosition } from "@/api/index.js";
export default {
  name: "App",
  components: {
    tabBar
  },
  created() {
    // this.$store.dispatch("user/receiveUserInfo");
    // this.$store.dispatch("position/posChange");
    // reqPosition({
    //   latitude: this.$store.state.position.pos.latitude,
    //   longtitude: this.$store.state.position.pos.longtitude
    // }).then(res => {
    //   // console.log(res);
    //   this.$store.dispatch("position/localChange", res.data);
    // });
  }
};
</script>

<style lang='scss'>
@import "@/assets/style/init.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
