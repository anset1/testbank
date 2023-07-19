<template>
  <div class="slct">
    <div class="slct-input">
      <div v-if="chosenValues.length" class="slct-chosen">
        <div
          v-for="(item, index) in chosen" :key="index"
          class="slct-chosen-item"
        >
          <span class="slct-chosen-item__name">{{ item[name_key] }}</span>
          <span class="slct-chosen-item__btn-del" @click="select(item)"><XIcon/></span>
        </div>
      </div>
      <div class="slct-placeholder" @click="showList = !showList">
        {{ chosenValues.length ? '' : placeholder }}
      </div>
      <ArrowToDown class="slct-arrow"/>
    </div>
    <div v-show="showList" class="slct-list">
      <perfect-scrollbar>
        <div
          v-for="(item, index) in list" :key="index"
          class="slct-option"
          :class="{ '-chosen': isChosenItem(item) }"
          :data-arr="chosenValues.toString()"
          @click="select(item)"
        >
          <div class="slct-option__name">{{ item[name_key] }}</div>
          <div class="slct-option__checkbox">
            <DoneIcon/>
          </div>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import ArrowToDown from '@/components/icons/ArrowToDown.vue'
import XIcon from '@/components/icons/XIcon.vue'
import DoneIcon from '@/components/icons/DoneIcon.vue'

export default {
  name: 'Select Multiple',
  components: {
    ArrowToDown,
    XIcon,
    DoneIcon,
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
    chosen: {},
    chosenValues: [],
  }),
  computed: {},
  methods: {
    isChosenItem(item) {
      return this.chosen.hasOwnProperty(item[this.value_key])
    },
    select(item) {
      if (this.isChosenItem(item)) {
        delete this.chosen[item[this.value_key]]
      } else {
        this.chosen[item[this.value_key]] = item
      }

      this.chosenValues = Object.keys(this.chosen);
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
    padding: 6px 25px 6px 8px;
    border: 1px solid #E5E5E5;
    border-radius: var(--border_radius);
    background-color: var(--c_white);
    // cursor: pointer;
    z-index: 1;
  }

  &-arrow {
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    margin-left: 4px;
    pointer-events: none;
  }

  &-chosen,
  &-placeholder {
    width: calc(100% - 12px - 4px);
    line-height: 1.1;
  }

  &-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 12px 50px 12px 25px;
    border-radius: var(--border_radius);
    cursor: pointer;
  }

  &-chosen {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;

    &-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: var(--border_radius);
      background-color: #CFEBFF;
      z-index: 1;

      &__btn-del {
        width: 12px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
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
    --checkbox_size: 24px;

    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 19px 8px 25px;
    cursor: pointer;

    &:hover {
      background-color: #CFEBFF;
    }

    &:last-child {
      border-radius: 0 0 var(--border_radius) var(--border_radius);
    }

    &__name {
      width: calc(100% - var(--checkbox_size));
    }

    &__checkbox {
      width: var(--checkbox_size);
      height: var(--checkbox_size);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: 2px solid #BDBCDB;

      svg {
        display: none;
      }
    }

    &.-chosen {
      background-color: #CFEBFF;
      .slct-option__checkbox {
        background: #1C31F0;
        border: 2px solid #1C31F0;

        :deep(svg) {
          display: block;
          width: 65%;
          height: 65%;

          path {
            stroke: var(--c_white);
          }
        }
      }
    }
  }
}
</style>
