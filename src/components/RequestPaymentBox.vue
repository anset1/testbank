<template>
  <div class="payment-box">
    <div class="payment-box__title">{{ title }}</div>
    <div class="payment-box__list">
      <div class="payment-item" v-for="item of innerData" :key="item.key">
        <ToggleComponent
          v-model="item.checked"
          @update:modelValue="$emit('update:modelValue', innerData)"
        />
        <div class="payment-item__label" :class="{ active: item.checked }">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleComponent from "../components/common/ToggleComponent.vue";
export default {
  name: "RequestPaymentBox",
  components: {
    ToggleComponent,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.innerData = this.modelValue;
  },
  data: () => {
    return {
      innerData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.payment-box {
  &__title {
    color: #fff;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }
  &__list {
    margin-top: 12px;
    .payment-item {
      display: flex;
      color: #fff;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      padding: 15px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      z-index: 100;
      &:last-child {
        border-bottom: none;
      }
      &__label {
        margin-left: 10px;
        opacity: 0.5;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
      }
      &__label.active {
        font-weight: 600;
        opacity: 1;
      }
    }
  }
}
</style>
