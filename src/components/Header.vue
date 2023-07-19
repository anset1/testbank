<template>
  <div class="header">
    <div class="container">
      <div class="row header-wrapper">
        <div class="search">
          <SearchIcon class="search__icon"/>
          <input type="text" class="search__input" placeholder="Search Anything">
        </div>
        <div v-if="user" class="info">
          <div class="balance">
            <EthIcon class="balance__icon"/>
            <span class="balance__value">4,35 ETH</span>
          </div>
          <router-link :to="{ name: 'Profile' }">
            <div class="user">
              <div class="user__avatar" :style="userAvatar">{{ user.name ? user.name[0] : '' }}</div>
              <div class="user__inner">
                <div class="user__name">Hello, {{ user.name }}</div>
                <div class="user__nick">@urrizall</div>
              </div>
            </div>
          </router-link>
          <div class="notification">
            <BellIcon class="notification__icon"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useMainStore } from '@/stores/main'

import SearchIcon from '@/components/icons/SearchIcon.vue'
import EthIcon from '@/components/icons/EthIcon.vue'
import BellIcon from '@/components/icons/BellIcon.vue'

export default {
  name: 'Header',
  components: {
    SearchIcon,
    EthIcon,
    BellIcon,
  },
  computed: {
    ...mapState(useMainStore, ['user']),
    userAvatar() {
      return this?.user?.logo ? `background-image: url('${this.user.logo}')` : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: var(--cabinet_header_height);

  & > .container {
    height: 100%;
  }

  &-wrapper {
    --row_height: 56px;

    height: 100%;
    align-items: center;
    border-bottom: 1px solid #DBE1E8;

    .search {
      flex-grow: 1;
      position: relative;
      width: 100%;
      height: var(--row_height);
      padding-right: 3vw;

      &__icon {
        position: absolute;
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
        width: 24px;
        height: 24px;
        pointer-events: none;

        svg {
          width: 100%;
          height: 100%;
        }
      }

      &__input {
        width: 100%;
        min-width: 100%;
        height: 100%;
        padding: .5rem .75rem .5rem 56px;
        color: var(--c_white);
        border-radius: 10rem;
        background-color: var(--c_main-dark-bg);

        &::placeholder {
          color: #696969;
        }
      }
    }

    .info {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      height: var(--row_height);

      .balance {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 160px;
        height: 100%;
        padding: .5rem 1rem;
        font-size: 18px;
        font-weight: bold;
        color: var(--c_white-soft);
        background-color: var(--c_primary);
        border-radius: 10rem;

        &__icon {
          width: 24px;
          height: 24px;
          margin-right: .5rem;

          svg {
            width: 100%;
            height: 100%;
          }
        }
      }

      .user {
        display: flex;
        align-items: center;
        height: 100%;
        color: var(--c_primary-dark);

        &__avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: var(--row_height);
          min-width: var(--row_height);
          font-size: 20px;
          text-transform: uppercase;
          border-radius: 10rem;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          background-color: #EDEDED;
        }

        &__inner {
          margin-left: .75rem;
        }

        &__name {
          font-weight: 700;
          white-space: nowrap;
        }

        &__nick {
          font-size: 14px;
          color: var(--c_grey);
        }
      }

      .notification {
        min-height: var(--row_height);
        min-width: var(--row_height);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--c_main-dark-bg);
        border-radius: 15px;

        &__icon {
          width: 24px;
          height: 24px;

          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
