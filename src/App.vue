<template>
  <div id="main">
    <!-- <link
      v-if="isDevMode"
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
      integrity="sha512-wnea99uKIC3TJF7v4eKk4Y+lMz2Mklv18+r4na2Gn1abDRPPOeef95xTzdwGD9e6zXJBteMIhZ1+68QC5byJZw=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    /> -->

    <div v-if="appLoading" class="appLoading">
      <LogoIcon class="appLoading-logo" />
    </div>
    <component v-else :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMainStore } from "@/stores/main";

import DefaultLayout from "./layouts/DefaultLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

import LogoIcon from "./components/icons/LogoIcon.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
    AuthLayout,
    LogoIcon,
  },
  data: () => ({}),
  computed: {
    ...mapState(useMainStore, ["appLoading"]),
    isDevMode() {
      return import.meta.env.DEV;
    },
    layout() {
      return this.$route.meta.layout || this.$route.meta.requiresAuth
        ? "DefaultLayout"
        : "AuthLayout";
    },
  },
};
</script>

<style lang="scss" scoped>

#main {
  height: 1px;
  min-height: 100vh;

  .appLoading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(svg.appLoading-logo) {
      width: 7rem;
      height: 7rem;

      path {
        fill: var(--c_primary);
      }
    }
  }
}
</style>