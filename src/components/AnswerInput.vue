<template>
  <div>
    <div v-if="type === 'text'">
      <div class="input-controls">
        <label for="text">答案：</label>
        <input
          type="text"
          :placeholder="textInputPlaceholder"
          v-model="selectedPet"
          @input="updateSelectedPet"
        />
      </div>
    </div>
    <div v-else-if="type === 'radio'">
      <div class="radio-wrapper">
        <div
          class="input-controls input-controls--radio"
          v-for="pet in pets"
          :key="pet.id"
        >
          <label :for="pet.type">{{ `${pet.name}: ` }}</label>
          <input
            type="radio"
            name="pet"
            :id="pet.type"
            :value="pet.name"
            v-model="selectedPet"
            @change="updateSelectedPet"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="input-controls">
        <label for="pet">答案：</label>
        <select
          name="pet"
          id="selectPet"
          v-model="selectedPet"
          @change="updateSelectedPet"
        >
          <option :value="pet.name" v-for="pet in pets" :key="pet.id">
            {{ pet.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import petQuery from "@/requests/petQuery.js";
export default {
  name: "AnswerInput",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pets: null,
      selectedPet: null,
    };
  },
  computed: {
    textInputPlaceholder() {
      if (!this.pets) return;
      let str = "請輸入";
      let counter = 0;
      for (const el of this.pets) {
        counter++;
        counter === this.pets.length
          ? (str += `${el.name}`)
          : (str += `${el.name}或`);
      }

      return str;
    },
  },
  methods: {
    updateSelectedPet() {
      let flag = false;
      const parsePet = JSON.parse(JSON.stringify(this.pets));
      for (let pet of parsePet) {
        if (!flag) {
          flag = pet.name === this.selectedPet ? true : false;
        }
      }
      if (!flag) return;
      this.$emit("updateSelectedPet", this.selectedPet);
    },
  },
  async beforeMount() {
    this.pets = await petQuery();
    // 預設第一個選項為初始值
    this.selectedPet = this.pets[0].name;
    this.$emit("setPets", this.pets);
    this.updateSelectedPet();
  },
};
</script>

<style lang="scss" scoped>
.input-controls {
  &--radio:not(:last-child) {
    margin-right: 10px;
  }
}

.radio-wrapper {
  display: flex;
  align-items: center;
  justify-items: center;
}
</style>
