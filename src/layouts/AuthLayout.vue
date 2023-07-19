<template>
  <div class="auth-layout">
    <div class="content">
      <div class="header">
        <RouterLink to="/" class="header-logo"></RouterLink>
      </div>
      <slot/>
    </div>
    <div class="info">
      <div class="slider">
        <div class="slider-btns">
          <div class="btn slider-btn"></div>
          <div class="btn slider-btn"></div>
          <div class="btn slider-btn"></div>
        </div>
        <div class="slider-list">
          <div class="slider-item">
            <div class="slider-item-bg -ellipses"><Ellipses/></div>
            <div class="slider-item-bg -card-john"></div>
            <div class="slider-item-bg -card-entr"></div>
            <div class="slider-item-bg -card-chip"></div>
            <div class="slider-item-text">
              <div class="slider-item-text__value">99%</div>
              <div class="slider-item-text__desc">
                of clients are satisfied ☺️ with our bank according to the survey
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <header class="header">
      <div class="container header-row">
        <div class="header-logo">
          <RouterLink to="/">EntrBank</RouterLink>
        </div>
        <div class="header-nav">
          <div class="header-nav-item">
            <a href="#">Pricing</a>
          </div>
          <div v-if="!user" class="header-nav-item">
            <RouterLink to="/login">Log in</RouterLink>
            <span class="header-nav-item-separ"> / </span>
            <RouterLink to="/signup">Sign up</RouterLink>
          </div>
          <div v-if="user" class="header-nav-item">
            <RouterLink to="/">Profile</RouterLink>
          </div>
          <div v-if="user" class="header-nav-item">
            <a href="#">My Companies</a>
          </div>
          <div v-if="user" class="header-nav-item">
            <a href="#" class="header-nav-item__logout" @click.prevent="logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
    <slot/> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '@/stores/main'

import Ellipses from '@/components/icons/Ellipses.vue'

export default {
	name: 'AuthLayout',
  components: {
    Ellipses,
  },
	data: () => ({
    title: '',
    metaData: []
  }),
	created() {
		this.getMetaTags()
	},
  computed: {
    ...mapState(useMainStore, ['user']),
  },
	methods: {
    ...mapActions(useMainStore, ['logout']),
		async getMetaTags () {
			await axios.get(import.meta.env.VITE_APP_BACKEND_API_URL + 'meta/users-cabinet')
        .then(({ data }) => {
          for (let i=0; i < data.length; i++) {
            if (data[i].name == 'title') {
              this.title = data[i].value
            } else {
              if (data[i].value) {
                if (data[i].property) {
                  this.metaData.push({
                    name: data[i].name,
                    content: data[i].value,
                    property: data[i].property,
                  })
                } else {
                  this.metaData.push({
                    name: data[i].name,
                    content: data[i].value,
                  })
                }
              }
            }
          }
        })
        .catch((errors) => {
          console.dir(errors)
        })
		}
	},
	metaInfo() {
    return {
      title: `${this.title}`,
      meta: this.metaData
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-layout {
  width: 100%;
  min-height: 100vh;
  display: flex;

  .content,
  .info {
    width: 50%;
  }

  .content {
    .header {
      width: 100%;
      height: 7rem;
      padding: 3rem 4rem 1rem;

      &-logo {
        width: 10rem;
        height: 3rem;
        display: flex;
        background-image: url('/img/logo-long.png');
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }

  .info {
    background: linear-gradient(135.32deg, #1C31F0 0%, #141F81 33.17%, #0B0B0B 75.14%);

    .slider {
      position: relative;
      width: 100%;
      height: 100%;

      &-btns {
        position: absolute;
        top: 4.5vh;
        left: 3.5vw;
        display: flex;
        align-items: center;
        gap: .5rem;
        z-index: 9;
      }

      &-btn {
        width: 40px;
        height: 2px;
        background-color: var(--c_white);
      }

      &-list,
      &-item {
        width: 100%;
        height: 100%;
      }

      &-item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 1.5rem 3.5vw;
        overflow: hidden;

        &-bg {
          position: absolute;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;

          &.-ellipses {
            width: 37vw;
            height: 65vh;
            bottom: -5rem;
            right: 0;

            svg {
              width: 100%;
              height: 100%;
            }
          }

          &.-card-john {
            width: 400px;
            height: 250px;
            top: calc(50% - 275px);
            right: -6.5rem;
            transform: translateY(-50%) rotate(21deg);
            background-image: url('/img/card-john.png');
          }

          &.-card-entr {
            width: 395px;
            height: 250px;
            top: calc(50% + 275px);
            right: -7.5rem;
            transform: translateY(-50%) rotate(14.5deg);
            background-image: url('/img/card-entr.png');
          }

          &.-card-chip {
            width: 430px;
            height: 270px;
            top: 50%;
            right: -6.5rem;
            transform: translateY(-50%) rotate(-16.5deg);
            background-image: url('/img/card-chip.png');
          }
        }

        &-text {
          position: relative;

          &__value {
            font-weight: 700;
            font-size: 96px;
            line-height: 100%;
            text-transform: capitalize;
            color: var(--c_white);
          }

          &__desc {
            width: 265px;
            font-style: normal;
            font-weight: 700;
            font-size: 20px;
            line-height: 22px;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }

  // padding-top: var(--header_height);
  // .header {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: var(--header_height);
  //   min-height: var(--header_height);
  //   max-height: var(--header_height);

  //   &-row {
  //     display: flex;
  //     padding: .75rem 1rem;
  //   }

  //   &-logo {
  //     font-weight: 900;
  //     font-size: 36px;
  //     line-height: 140%;
  //     letter-spacing: 0.02em;
  //   }

  //   &-nav {
  //     flex-grow: 1;
  //     display: flex;
  //     align-items: center;
  //     justify-content: flex-end;

  //     &-item {
  //       padding: 0 .75rem;
  //       border-right: 1px solid var(--c_black);

  //       &:last-child {
  //         border-right: none;
  //       }

  //       &-separ {
  //         padding: 0 .25rem;
  //       }

  //       &__logout {
  //         color: var(--c_danger);
  //         font-weight: 700;
  //       }
  //     }
  //   }
  // }
}
</style>
