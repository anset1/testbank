<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <LogoIcon />
    </div>
    <div class="sidebar-main">
      <div class="sidebar-links">
        <RouterLink
          v-for="(link, index) in links"
          :key="index"
          :to="{ name: link.routeName }"
          class="sidebar-link"
          :class="{ '-active': link.routeName == $route.name }"
        >
          <div class="sidebar-link__icon">
            <component :is="link.icon"></component>
          </div>
          <div class="sidebar-link__tooltip">{{ link.title }}</div>
        </RouterLink>
      </div>
    </div>
    <div class="sidebar-footer">
      <div class="sidebar-links">
        <div class="sidebar-link" @click.prevent="logout">
          <div class="sidebar-link__icon">
            <LogoutIcon />
          </div>
          <div class="sidebar-link__tooltip">Logout</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useMainStore } from '@/stores/main'

import LogoIcon from '@/components/icons/LogoIcon.vue'
import BuildingIcon from '@/components/icons/BuildingIcon.vue'
import BriefcaseIcon from '@/components/icons/BriefcaseIcon.vue'
import TrendUpIcon from '@/components/icons/TrendUpIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import WalletIcon from '@/components/icons/WalletIcon.vue'
import SettingIcon from '@/components/icons/SettingIcon.vue'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'

export default {
  name: 'Sidebar',
  components: {
    LogoIcon,
    BuildingIcon,
    BriefcaseIcon,
    TrendUpIcon,
    HeartIcon,
    WalletIcon,
    SettingIcon,
    LogoutIcon,
  },
  data: () => ({
    links: [
      { routeName: "MyCompanies", title: "Banks", icon: "BuildingIcon" },
      { routeName: "BusinessRequestPage", title: "Business Request", icon: "BriefcaseIcon" },
      { routeName: "Proposals", title: "Proposals", icon: "TrendUpIcon" },
      { routeName: "BuySellNetLicense", title: "Buy & Sell Net License", icon: "HeartIcon" },
      { routeName: "Subscriptions", title: "Subscriptions", icon: "WalletIcon" },
      { routeName: "CabinetPage2", title: "Page 6", icon: "SettingIcon" },
    ],
  }),
  methods: {
    ...mapActions(useMainStore, ['logout']),
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sb_width);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #1C31F0 0%, #141F81 10.94%, #0B0B0B 65.1%);
  z-index: 99;

  &-header {
    position: relative;
    padding: 2rem .5rem;
    margin-bottom: 2rem;

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 28px;
      height: 1px;
      background-color: rgba(173, 184, 197, 0.5);
    }
  }

  &-main {
    flex-grow: 1;
    width: 100%;
  }

  &-links {
    width: 100%;
  }

  &-link {
    position: relative;
    width: 100%;
    padding: 1.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &__icon {
      width: 1.5rem;
      height: 1.5rem;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__tooltip {
      position: absolute;
      top: 50%;
      left: calc(100% + 1rem);
      transform: translateY(-50%);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 10px 12px;
      color: #fff;
      white-space: nowrap;
      background-color: #000;
      box-shadow: 0px 5px 10px -3.88666px rgba(0, 0, 0, 0.25);
      border-radius: 4px;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -4px;
        transform: translateY(-50%) rotate(45deg);
        width: 20px;
        height: 20px;
        background-color: inherit;
        z-index: -1;
      }
    }

    &:hover {
      .sidebar-link__tooltip {
        display: flex;
      }
    }

    &.-active {
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 2px;
        height: 26px;
        background-color: #fff;
      }
    }
  }

  &-footer {
    width: 100%;
  }
}
</style>
