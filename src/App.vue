<template>
  <div id="app" :style="layoutStyleObj">
    <router-view />
  </div>
</template>

<script>
import themeColors from "@/data/themeColors";
export default {
  name: "App",
  computed: {
    themeID() {
      return this.$store.getters.themeID;
    },
    layoutStyleObj() {
      return themeColors[this.themeID].layout;
    },
  },
  beforeMount() {
    this.$store.commit("setThemeID", 0);
  },
};
</script>

<style lang="scss">
@import "@/assets/style/main.scss";

#app {
  width: 100%;
  height: 100vh;
  background-size: 10px 10px;
  background-image: linear-gradient(to left, #e4e4e4 1px, transparent 1px),
    linear-gradient(to bottom, #e4e4e4 1px, transparent 1px);
}
</style>
