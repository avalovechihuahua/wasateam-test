<template>
  <div id="app" :style="appStyleObj">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appStyleObj: {
        backgroundColor: "#9AEBA3",
        color: "#012030",
      },
    };
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
