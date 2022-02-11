<template>
  <main>
    <section class="container">
      <router-link class="theme-button" to="/theme-setting"
        >切換主題</router-link
      >
      <h1>你最喜歡以下哪種寵物？</h1>
      <div class="wrapper">
        <div class="inputs">
          <div class="input-control">
            <label for="inputType">輸入類型: </label>
            <select name="type" id="inputType" v-model="selected">
              <option value="text">text</option>
              <option value="radio">radio</option>
              <option value="select">select</option>
            </select>
          </div>
          <AnswerInput
            :type="selected"
            @updateSelectedPet="updateSelectedPet"
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
import AnswerInput from "@/components/AnswerInput.vue";

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
    AnswerInput,
  },
  data() {
    return {
      selected: "text",
      petPictures: [],
      selectedPet: null,
      pets: null,
    };
  },
  computed: {
    inputType() {
      let type;
      switch (this.selected) {
        case "text":
          type = 0;
          break;
        case "radio":
          type = 1;
          break;
        case "select":
          type = 2;
          break;
        default:
          console.error("沒有該輸入類型!");
          break;
      }
      return type;
    },
  },
  methods: {
    updateSelectedPet(val) {
      this.selectedPet = val;
      this.petPictures = this.pets.find(
        (el) => el.name === this.selectedPet
      ).imgList;
    },
  },

  async beforeMount() {
    this.pets = await petQuery();
  },
};
</script>

<style lang="scss" scoped>
.theme-button {
  display: block;
  position: absolute;
  right: 100px;
  top: 100px;
  font-size: 20px;
  padding: 10px 10px;
  background: black;
  color: white;
  border-radius: 5px;
}

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
