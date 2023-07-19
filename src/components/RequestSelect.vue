<template>
  <div class="request-item">
    <div class="request-item__text">
      {{ title }}
    </div>
    <div ref="input">
      <Dropdown
        v-model="value"
        class="request-select"
        :class="{ 'request-select-top': panelPositionTop }"
        :panelClass="panelClasses"
        :options="options"
        :optionLabel="optionLabel"
        @show="checkPanelPosition"
        @update:modelValue="$emit('update:modelValue', value)"
      >
        <template #header>
          <div ref="panel"></div>
        </template>
        <template #dropdownicon>
          <i class="pi pi-angle-down" style="color: color: #565660;"></i>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
export default {
  name: "RequestInput",
  components: {
    Dropdown,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    optionLabel: {
      type: String,
      default: "name",
    },
  },
  emits: ["update:modelValue"],
  mounted() {
    this.value = { ...this.modelValue };
  },
  data: () => {
    return {
      value: {},
      panelPositionTop: false,
    };
  },
  computed: {
    panelClasses() {
      const classes = ["request-select-panel"];
      if (this.panelPositionTop) classes.push("request-select-top");
      return classes;
    },
  },
  methods: {
    updateValue() {
      this.$emit("modelValue", this.value);
    },
    checkPanelPosition() {
      const inputY = this.$refs.input?.getBoundingClientRect().y;
      const panelY = this.$refs.panel?.getBoundingClientRect().y;
      this.panelPositionTop = panelY < inputY;
    },
  },
};
</script>

<style lang="scss" scoped>
.request-item {
  padding: 20px 15px;
  color: #fff;
  width: 270px;
  height: 195px;
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
::v-deep(.p-dropdown.request-select) {
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 23px;
  width: 100%;
  background-origin: padding-box;
  position: relative;
  .p-inputtext {
    text-align: center;
  }
}

::v-deep(.p-dropdown.request-select .p-dropdown-label) {
  height: 44px;
  display: flex;
  align-items: center;
}
::v-deep(.p-dropdown.request-select.p-overlay-open) {
  border-radius: 23px 23px 0 0;
  outline: none;
}
::v-deep(.p-dropdown.request-select.request-select-top.p-overlay-open) {
  border-radius: 0 0 23px 23px;
}
</style>

<style lang="scss">
.request-select-panel {
  border-radius: 0 0 23px 23px;
  overflow: hidden;
  transform-origin: center bottom;
  .p-dropdown-items {
    padding: 0;
    .p-dropdown-item {
      padding: 11px 72px;
      color: #000;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      background: #fff;
      box-shadow: 0px 8px 9px 0px rgba(0, 0, 0, 0.1) inset;
    }
  }
  &.request-select-top {
    border-radius: 23px 23px 0 0;
    overflow: hidden;
  }
  &.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
    color: #000;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    background: #fff;
    box-shadow: 0px 8px 9px 0px rgba(0, 0, 0, 0.1) inset;
  }
}
</style>
