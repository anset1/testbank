<template>
  <div class="checkBox" @click="$emit('changeState')">
    <div class="check"><Check v-show="state" /></div>
    <div class="label" v-html="label"></div>
  </div>
</template>

<script>
import Check from '@/components/img/Check.vue'

export default {
  components: {
    Check
  },
  props: {
    state: { type: Boolean, default: false },
    label: { type: String, default: '' },
  }
}
</script>

<style lang="scss" scoped>
.checkBox {
  display: flex;
  align-items: flex-start;

  .check {
    width: 1.25rem;
    min-width: 1.25rem;
    height: 1.25rem;
    min-height: 1.25rem;
    border: 1px solid #5E7084;
    border-radius: .25rem;
    margin: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    :deep(svg) {
      width: 13px;
      height: 13px;

      path {
        fill: #ffffff;
      }
    }
  }

  .label {
    padding: .25rem .5rem;
  }
}
</style>
