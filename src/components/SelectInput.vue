<template>
  <div>
    <div v-if="type === 'text'">
      <div class="input-controls">
        <label for="textInput">答案：</label>
        <input
          id="textInput"
          type="text"
          :placeholder="textInputPlaceholder"
          v-model.trim="selected"
          @input="updateSelectedOpt"
        />
      </div>
    </div>
    <div v-else-if="type === 'radio'">
      <div class="radio-wrapper">
        <div
          class="input-controls input-controls--radio"
          v-for="content in contents"
          :key="content.id"
        >
          <label :for="content.type">{{ `${content.name}: ` }}</label>
          <input
            type="radio"
            :name="inputName"
            :id="content.type"
            :value="content.name"
            v-model="selected"
            @change="updateSelectedOpt"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="input-controls">
        <label for="selectInput">答案：</label>
        <select
          id="selectInput"
          :name="inputName"
          v-model="selected"
          @change="updateSelectedOpt"
        >
          <option
            :value="content.name"
            v-for="content in contents"
            :key="content.id"
          >
            {{ content.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectInput",
  props: {
    type: {
      type: String,
      required: true,
    },
    contents: {
      type: Array,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  watch: {
    contents(val) {
      if (val.length !== 0) {
        this.selected = this.contents[0].name;
      }
    },
  },
  computed: {
    textInputPlaceholder() {
      if (!this.contents) return;
      let str = "請輸入";
      let counter = 0;
      for (const el of this.contents) {
        counter++;
        counter === this.contents.length
          ? (str += `${el.name}`)
          : (str += `${el.name}或`);
      }

      return str;
    },
  },
  methods: {
    updateSelectedOpt() {
      // 擋掉使用者在 text input 時輸入非正確類型的資料
      if (this.type === "text") {
        const enableEmit = this.contents.some(
          (content) => content.name === this.selected
        );
        if (!enableEmit) return;
      }

      this.$emit("update-selected-opt", this.selected);
    },
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
