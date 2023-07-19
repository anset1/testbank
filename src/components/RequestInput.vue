<template>
  <div class="request-item">
    <div class="request-item__text">
      {{ title }}
    </div>
    <div>
      <InputText
        :type="type"
        v-model="value"
        @input="updateValue"
        size="small"
        class="request-input"
      />
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
export default {
  name: "RequestInput",
  components: {
    InputText,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      required: true,
    },
  },
  emits: ["update:modelValue"],
  mounted() {
    if (this.type === "number") {
      this.value = 0;
    }
  },
  data: () => {
    return {
      value: "",
    };
  },
  methods: {
    updateValue() {
      if (this.type === "number") {
        this.$emit("update:modelValue", Number(this.value));
      } else {
        this.$emit("update:modelValue", this.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.request-item {
  padding: 20px 15px;
  color: #fff;
  width: 270px;
  height: 155px;
  background: linear-gradient(
    123deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.04) 100%
  );
  box-shadow: 0px 1.1966018676757812px 29.91504669189453px 0px
    rgba(69, 42, 124, 0.1);
  backdrop-filter: blur(35px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 27px;
  &__text {
    color: #fff;
    height: 56px;
    margin-bottom: 16px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
  }
}
::v-deep(.p-inputtext.request-input) {
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 23px;
  width: 100%;
}
</style>
