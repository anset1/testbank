<template>
  <div class="slct">
    <div class="slct-input" @click="showList = !showList">
      <div v-if="chosen && chosen[name_key]" class="slct-chosen">{{ chosen[name_key] }}</div>
      <div v-else class="slct-placeholder">{{ placeholder }}</div>
      <ArrowToDown class="slct-arrow"/>
    </div>
    <div v-show="showList" class="slct-list">
      <perfect-scrollbar>
        <div
          v-for="(item, index) in list" :key="index"
          class="slct-option"
          @click="select(item)"
        >
          <div class="slct-option__name">{{ item[name_key] }}</div>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import ArrowToDown from '@/components/icons/ArrowToDown.vue'

export default {
  name: 'Select',
  components: {
    ArrowToDown,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    value_key: {
      type: String,
      default: 'id',
      required: true,
    },
    name_key: {
      type: String,
      default: 'name',
      required: true,
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    showList: false,
    chosen: null,
  }),
  methods: {
    select(item) {
      this.chosen = item
      this.$emit('selected', this.chosen)
      this.showList = false
    }
  }
}
</script>

<style lang="scss" scoped>
.slct {
  --select_height: 46px;
  --border_radius: 24px;

  position: relative;

  &-input {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 100%;
    height: var(--select_height);
    padding: 12px 25px;
    border: 1px solid #E5E5E5;
    border-radius: var(--border_radius);
    background-color: var(--c_white);
    cursor: pointer;
    z-index: 1;
  }

  &-arrow {
    width: 12px;
    height: 12px;
    margin-left: 4px;
  }

  &-chosen,
  &-placeholder {
    width: calc(100% - 12px - 4px);
    line-height: 1.1;
  }

  &-placeholder {
    color: var(--c_secondary-dark-2);
  }

  &-list {
    height: 230px;
    margin-top: calc(var(--select_height) * -1);
    padding-top: var(--select_height);
    background-color: #EEF8FF;
    border-radius: var(--border_radius);
    overflow: hidden;

    .ps {
      height: 100%;
    }
  }

  &-option {
    padding: 8px 25px;
    cursor: pointer;

    &:hover {
      background-color: #CFEBFF;
    }

    &:last-child {
      border-radius: 0 0 var(--border_radius) var(--border_radius);
    }
  }
}
</style>
