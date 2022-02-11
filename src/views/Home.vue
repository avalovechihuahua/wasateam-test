<template>
  <main>
    <section class="container">
      <router-link class="button" to="/theme-setting" :style="buttonStyleObj"
        >切換主題頁面</router-link
      >
      <h1>你最喜歡以下哪種寵物？</h1>
      <div class="wrapper">
        <div class="inputs">
          <div class="input-control">
            <label for="inputType">輸入類型: </label>
            <select name="type" id="inputType" v-model="selectType">
              <option value="text">text</option>
              <option value="radio">radio</option>
              <option value="select">select</option>
            </select>
          </div>
          <SelectInput
            input-name="pet"
            :type="selectType"
            :contents="selectInputContents"
            :defaultOpt="selectInputDefault"
            @update-selected-opt="updateSelectedPet"
          />
        </div>
        <div class="pictures">
          <div
            class="img-wrapper"
            v-for="(pic, index) in petPictures"
            :key="index"
          >
            <img :src="pic" alt="" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import petQuery from "@/requests/petQuery.js";
import theme from "@/data/themes";
import SelectInput from "@/components/SelectInput.vue";

export default {
  name: "Home",
  metaInfo() {
    return {
      title: "山葵組設計線上測試 | 首頁",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "選擇你喜歡的動物吧！並且看看他們可愛的樣子~",
        },
      ],
    };
  },
  components: {
    SelectInput,
  },
  data() {
    return {
      selectType: "text",
      selectedPet: null,
      pets: null,
    };
  },
  computed: {
    selectInputContents() {
      return this.pets ? this.pets : [];
    },
    selectInputDefault() {
      return this.pets ? this.pets[0].name : "";
    },
    petPictures() {
      if (!this.pets) return;
      return this.pets.find((el) => el.name === this.selectedPet).imgList;
    },
    themeID() {
      return this.$store.getters.themeID;
    },
    buttonStyleObj() {
      return theme.colors[this.themeID].button;
    },
  },
  methods: {
    updateSelectedPet(val) {
      this.selectedPet = val;
    },
  },
  async beforeMount() {
    this.pets = await petQuery();
    this.selectedPet = this.pets[0].name;
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 50px;
  height: 80px;
}

.input-control {
  margin: 0 40px 20px 0;

  label {
    margin-right: 5px;
  }
}

.pictures {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-wrapper {
  position: relative;
  width: 33.33333%;
  padding-bottom: 35%;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    z-index: 2;
    outline: white solid 15px;
    outline-offset: 20px;

    img {
      transform: translate(-50%, -50%) scale(1.1);
    }

    &::before {
      opacity: 0;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.45;
    transition: opacity 200ms ease;
    z-index: 1;
  }

  & img {
    display: block;
    width: 100%;
    position: absolute;
    transform-origin: center;
    top: 50%;
    left: 50%;
    transition: transform 200ms ease;
    transform: translate(-50%, -50%);
  }
}
</style>
