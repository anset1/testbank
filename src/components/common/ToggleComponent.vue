<template>
  <div
    class="toggle-content"
    :class="{ 'toggle-active': value }"
    @click="switchValue"
  >
    <div class="toggle-content__icon"></div>
    <div class="toggle-content__text">{{ toggleText }}</div>
  </div>
</template>

<script>
export default {
  name: "ToggleComponent",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    this.value = this.modelValue;
  },
  computed: {
    toggleText() {
      return this.value ? "Yes" : "No";
    },
  },
  data: () => {
    return {
      value: false,
    };
  },
  methods: {
    switchValue() {
      this.value = !this.value;
      this.$emit("update:modelValue", this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.toggle-content {
  display: flex;
  align-items: center;
  padding: 4px;
  position: relative;
  width: 66px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 14px;
  background: linear-gradient(120deg, #1c31f0 0%, #0b1999 100%);
  filter: drop-shadow(0px 4px 54px #1c31f0);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 62px;
    height: 24px;
    border-radius: 12px;
    transform: translate(1px, 1px);
    background-image: url("@/assets/rectangle.svg");
  }
  &__icon {
    position: relative;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: linear-gradient(
      105deg,
      rgba(0, 0, 0, 1),
      rgba(227, 227, 227, 1)
    );
    filter: drop-shadow(3px 0px 13px rgba(0, 0, 0, 0.41));
    &::before {
      content: "";
      position: absolute;
      top: 1px;
      left: 1px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(
        52.11% 52.11% at 48.92% 47.9%,
        rgba(0, 0, 0, 1),
        rgba(36, 36, 36, 1)
      );
    }
  }
  &__text {
    margin-left: 5px;
    color: #fff;
    font-size: 11.744px;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
  }
}
.toggle-content.toggle-active {
  background: linear-gradient(120deg, #c64eff 0%, #931cf0 45%, #1c31f0 77.08%);
  filter: drop-shadow(0px 4px 74px #861cf0);
  .toggle-content__icon {
    background: linear-gradient(
      105deg,
      rgba(175, 63, 236, 1),
      rgba(255, 255, 255, 1)
    );
    &::before {
      background: radial-gradient(
        52.11% 52.11% at 48.92% 47.9%,
        #fff 0%,
        #ececec 100%
      );
    }
  }
}
</style>
