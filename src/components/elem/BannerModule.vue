<template>
  <div class="banner banner_module">
    <span class="dots dots-top"><Dots/></span>
    <span class="dots dots-bottom"><Dots/></span>
    <div class="ttl" v-html="options.ttl"></div>
    <div class="desc" v-html="options.desc"></div>
    <div class="block_btn">
      <div class="btn">Check  <Arrow class="img"/></div>
    </div>
  </div>
</template>

<script>
import Dots from '@/components/img/Dots.vue'
import Arrow from '@/components/img/Arrow.vue'

export default {
  components: {
    Dots,
    Arrow,
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
.banner_module {
  width: 100%;
  height: 10rem;
  margin: 1.5rem 0;
  padding: 1.25rem 1.75rem;
  background: linear-gradient(113.24deg, #13B497 16.01%, #05737A 106.71%);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  .dots {
    position: absolute;

    &-top {
      top: 2px;
      left: 1.75rem;
      width: 2rem;
    }

    &-bottom {
      bottom: -12px;
      left: 25%;
      width: 2.5rem;
      transform: rotate(90deg);
      opacity: 0.5;
    }
  }

  .ttl {
    width: 35%;
    font-size: 2rem;
    font-weight: 800;
    padding: .25rem 2.5rem;
    border-right: 2px solid black;
  }

  .desc {
    width: 35%;
    font-size: 18px;
    padding: 0.25rem 1.5rem .25rem 3.5rem;

    @media (max-width: 1366px) {
      font-size: 16px;
    }
  }

  .block_btn {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;

    .btn {
      padding: 0.75rem 2rem;
      background: #272E35;
      border-radius: 6px;
      color: #62CDAC;
      display: flex;
      align-items: center;
      text-transform: uppercase;
      font-size: 1.25rem;
      font-weight: 900;

      :deep(svg) {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 1rem;

        path {
          fill: #ffffff;
        }
      }
    }
  }


}
</style>
