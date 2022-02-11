<template>
  <main>
    <section class="container">
      <router-link class="button" to="/" :style="buttonStyleObj"
        >首頁</router-link
      >
      <h1>切換你喜歡的主題吧！</h1>
      <div class="wrapper">
        <div
          class="input-controls"
          v-for="(theme, index) in themes"
          :key="theme.id"
        >
          <label :for="`themeId_${theme.id}`">{{ `主題${++index}` }}</label>
          <input
            type="radio"
            name="theme"
            :id="`themeId_${theme.id}`"
            :checked="themeID === theme.id"
            @change="setTheme(theme.id)"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import themeColors from "@/data/themeColors";
export default {
  name: "ThemeSetting",
  metaInfo() {
    return {
      title: "山葵組設計線上測試 | 主題",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "切換你喜歡的主題吧！",
        },
      ],
    };
  },
  computed: {
    themes() {
      return themeColors;
    },
    themeLength() {
      return themeColors.length;
    },
    themeID() {
      return this.$store.getters.themeID;
    },
    buttonStyleObj() {
      return themeColors[this.themeID].button;
    },
  },
  methods: {
    setTheme(id) {
      this.$store.commit("setThemeID", id);
      console.log(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-controls {
  display: inline-block;
  margin-right: 15px;

  label:not(:last-child) {
    margin-right: 5px;
  }
}
</style>
