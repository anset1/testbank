<template>
  <div class="tmblr" :class="{ 'tmblr-active': active }">
    <div
      class="btn btn-tmblr"
      :class="active ? 'btn-tmblr-r' : 'btn-tmblr-l'"
      @click="changeState"
    >
      <Close v-show="!active" class="img img_close" />
      <Check v-show="active" class="img img_check" />
    </div>
    <div class="txt">{{ text }}</div>
  </div>
</template>

<script>
import Close from '@/components/img/Close.vue'
import Check from '@/components/img/Check.vue'

export default {
  components: {
    Close,
    Check,
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    text: String
  },
  methods: {
    changeState() {
      this.$emit('changeState')
    }
  }
}
</script>

<style lang="scss" scoped>
.tmblr {
  display: flex;
  align-items: center;

  .txt {
    color: rgba(255, 255, 255, 0.5);
  }

  .btn {
    &-tmblr {
      position: relative;
      width: 2rem;
      height: .5rem;
      background-color: rgba(255, 255, 255, 0.12);
      border-radius: 2rem;
      margin: auto .75rem auto .25rem;

      &-l::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-25%, -50%);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #ffffff;
      }

      &-r::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(25%, -50%);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #ffffff;
      }

      :deep(svg.img) {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;

        &_close {
          left: 0;
          width: 8px;
          height: 8px;

          path {
            fill:#a1a1a1;
          }
        }

        &_check {
          right: -1px;

          path {
            fill: #ffffff;
          }
        }
      }
    }
  }

  &-active {
    .txt {
      color: #62CDAC;
    }

    .btn-tmblr-r::before {
      background-color:  #62CDAC;
    }
  }
}
</style>
