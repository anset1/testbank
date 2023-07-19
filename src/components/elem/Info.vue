<template>
  <div class="btn info" :class="`info_${pos}`">
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" @click="show = !show">
      <path d="M7.5 0C3.3578 0 0 3.35792 0 7.5C0 11.6423 3.3578 15 7.5 15C11.6422 15 15 11.6423 15 7.5C15 3.35792 11.6422 0 7.5 0ZM7.5 3.75C8.01779 3.75 8.4375 4.16977 8.4375 4.6875C8.4375 5.20547 8.01779 5.625 7.5 5.625C6.98221 5.625 6.5625 5.20547 6.5625 4.6875C6.5625 4.16977 6.98221 3.75 7.5 3.75ZM8.90625 11.25H6.09375C5.83488 11.25 5.625 11.0404 5.625 10.7812C5.625 10.5224 5.83488 10.3125 6.09375 10.3125H6.5625V7.5H6.09375C5.83488 7.5 5.625 7.29035 5.625 7.03125C5.625 6.77238 5.83488 6.5625 6.09375 6.5625H7.96875C8.22762 6.5625 8.4375 6.77238 8.4375 7.03125V10.3125H8.90625C9.16512 10.3125 9.375 10.5224 9.375 10.7812C9.375 11.0404 9.16512 11.25 8.90625 11.25Z" fill="white"/>
    </svg>
    <div v-show="show" class="spiner"><ArrowFlat /></div>
    <div v-show="show" v-html="txt" class="msg"></div>
  </div>
</template>

<script>
import ArrowFlat from '@/components/img/ArrowFlat.vue'

export default {
  components: {
    ArrowFlat
  },
  props: {
    pos: {
      type: String,
      default: 'tr'
    },
    txt: String
  },
  data: () => ({
    show: false
  })
}
</script>

<style lang="scss" scoped>
.info {
  position: absolute;
  top: 0;
  left: 100%;
  transform: translate(-10%, -75%);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  z-index: 99;

  > svg {
    position: relative;
    z-index: 9;
  }

  .spiner {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    transform-origin: right;

    svg {
      width: 10px;
      height: 10px;
      position: absolute;
      bottom: 100%;
      left: 100%;
      transform: rotate(-90deg) translateY(-50%);
    }
  }

  .msg {
    position: absolute;
    width: 20rem;
    padding: .25rem .75rem;
    color: white;
    font-size: 8px;
    background: linear-gradient(-5deg, #13B497 -100%, #05737A 100%);
    box-shadow: 0px 12px 23px rgba(62, 73, 84, 0.04);
    border-radius: 14px;

    $border: 2px;
    &::before {
      content: '';
      position: absolute;
      top: -$border;
      left: -$border;
      width: calc(100% + #{$border} * 2);
      height: calc(100% + #{$border} * 2);
      background: linear-gradient(113.24deg, #13B497 16%, #05737A 106.71%);
      border-radius: 14px;
      z-index: -1;
    }
  }

  $my: calc(100% + 0.5rem);
  &_tr {
    .spiner {
      transform: rotate(45deg);
    }

    .msg {
      bottom: $my;
      left: 100%;
    }
  }

  &_tl {
    .spiner {
      transform: rotate(-45deg);
    }

    .msg {
      bottom: $my;
      right: 100%;
    }
  }

  &_br {
    .spiner {
      transform: rotate(135deg);
    }

    .msg {
      top: $my;
      left: 100%;
    }
  }

  &_bl {
    .spiner {
      transform: rotate(-135deg);
    }

    .msg {
      top: $my;
      right: 100%;
    }
  }
}
</style>