<template>
  <div class="page-myCompanies">
    <div class="container">
      <div class="row pills">
        <div
          v-for="(pill, index) in pills" :key="index"
          class="pills__item"
          :class="{ '-active': index == activePillsIndex }"
        >
          {{ pill }}
        </div>
      </div>
      <div class="row page-title">My Companies</div>
      <div class="row">
        <div class="company">
          <div
            v-for="(company, index) in myCompanies" :key="index"
            class="company-card"
          >
            <div
              class="company-card-img"
              :style="`background-image: url('/img/108b9a771fb62e9be1e5d64e7e779160.webp')`"
            >
              <div class="company-card-rate">
                <RateOutsideCircle class="company-card-rate__outside-circle"/>
                <div class="company-card-rate__inner">
                  <div class="company-card-rate__value">25%</div>
                  <div class="company-card-rate__title">Compliance rate</div>
                </div>
              </div>
            </div>
            <div class="company-card-name">{{ company.name }}</div>
            <div class="company-card-row">
              <div class="company-card-status -upload">
                <UploadIcon class="company-card-status__icon"/>
                <span class="company-card-status__name">Upload</span>
              </div>
              <div class="company-card-attached">
                <ClipIcon class="company-card-attached__icon"/>
                <span class="company-card-attached__name">10 files</span>
              </div>
            </div>
            <div class="company-card-btns">
              <router-link :to="{ name: 'CompanyProfile' }" class="company-card-btns__details">
                Details
              </router-link>
              <!-- <div class="company-card-btns__edit">Edit</div> -->
            </div>
          </div>
          <div class="company-card company-add">
            <div class="company-add__wrapper">
              <RouterLink :to="{ name: 'CompanyBrief' }" class="company-add__btn">
                <AddCompanyPlusIcon/>
              </RouterLink>
              <div class="company-add__title">Add Company</div>
            </div>
          </div>
          <div class="company-card company-add -incorporate">
            <div class="company-add__wrapper">
              <RouterLink :to="{ name: 'CompanyBrief' }" class="company-add__btn">
                <AddCompanyPlusIcon/>
              </RouterLink>
              <div class="company-add__title">Incorporate <br> New Company</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '@/stores/main'

import PlusIcon from '@/components/icons/PlusIcon.vue'
import AddCompanyPlusIcon from '@/components/icons/AddCompanyPlusIcon.vue'
import UploadIcon from '@/components/icons/UploadIcon.vue'
import CheckedIcon from '@/components/icons/CheckedIcon.vue'
import ClipIcon from '@/components/icons/ClipIcon.vue'
import RateOutsideCircle from '@/components/icons/RateOutsideCircle.vue'

export default {
  name: 'MyCompanies',
  components: {
    PlusIcon,
    AddCompanyPlusIcon,
    UploadIcon,
    CheckedIcon,
    ClipIcon,
    RateOutsideCircle,
  },
  data: () => ({
    pills: ['Pricing', 'My Companies', 'Banks', 'My Company', 'Your offer', 'Chats', 'Accounts', 'Partnership'],
    activePillsIndex: 3,
  }),
  computed: {
    ...mapState(useMainStore, ['myCompanies']),
  },
  async created() {
    await this.setMyCompanies()
  },
  methods: {
    ...mapActions(useMainStore, ['setMyCompanies']),
  }
}
</script>

<style lang="scss" scoped>
.page {
  &-myCompanies {
    .pills {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: .75rem;
      margin-bottom: 1.75rem;
      cursor: pointer;

      &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        color: var(--c_black);
        font-size: 18px;
        text-align: center;
        background-color: #CFEBFF;
        border-radius: 10rem;
        white-space: nowrap;

        &.-active {
          color: var(--c_white-soft);
          background-color: var(--c_primary);
          font-weight: 600;
        }
      }
    }

    .company {
      --gap: 16px;

      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: var(--gap);
      padding-bottom: 1rem;

      &-card {
        width: calc(((100% - (var(--gap) * 3)) / 4));
        min-height: 400px;
        display: flex;
        flex-direction: column;
        padding: 20px;

        border-radius: 30px;
        background: linear-gradient(180deg, rgba(70, 85, 243, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(255, 255, 255, 0.35);
        box-shadow:
          0px 35px 70px 0px rgba(0, 0, 0, 0.10),
          3.5px 3.5px 23px 0px rgba(255, 255, 255, 0.05) inset,
          0px 3.5px 2px 0px rgba(255, 255, 255, 0.05) inset,
          0px -3.5px 2px 0px rgba(0, 0, 0, 0.10) inset;
        backdrop-filter: blur(8.818060874938965px);

        // background: linear-gradient(95.63deg, rgba(159, 212, 250, 0.5) 0%, rgba(172, 215, 252, 0.5) 9.37%, rgba(237, 214, 255, 0.5) 100%);
        // border-radius: 38px;

        &-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          display: flex;
          justify-content: flex-end;
          padding: 1rem;
          margin-bottom: 1rem;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          border-radius: 35px;
        }

        &-rate {
          position: relative;
          width: 120px;
          height: 120px;
          padding: 12px;

          &__outside-circle {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          &__inner {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            text-align: center;
            font-weight: 700;
            color: var(--c_white-soft);
            background-color: var(--c_primary);
            border-radius: 10rem;
          }

          &__value {
            font-size: 26px;
            line-height: 28px;
          }

          &__title {
            font-size: 9px;
          }
        }

        &-name {
          color: var(--c_primary-dark);
          font-weight: 700;
          font-size: 18px;
          line-height: 21px;
          margin-bottom: .5rem;
        }

        &-row {
          display: flex;
          justify-content: space-between;
          padding-bottom: .75rem;
        }

        &-status,
        &-attached {
          display: flex;
          align-items: center;

          &__icon {
            width: 18px;
            height: 18px;
            margin-right: 6px;
          }

          &__name {
            font-weight: 600;
            font-size: 15px;
            line-height: 18px;
          }

          &.-upload {
            .company-card-status__name {
              color: #FFC249;
            }
          }

          &.-checked {
            .company-card-status__name {
              color: #06D6A0;
            }
          }
        }

        &-attached {
          color: #A09F9F;
        }

        &-btns {
          // --gap: .75rem;

          display: flex;
          align-items: center;
          justify-content: center;
          // gap: var(--gap);

          &__details,
          &__edit {
            font-family: 'Poppins';
            display: flex;
            align-items: center;
            justify-content: center;
            // width: calc((100% - var(--gap)) / 2);
            width: 100%;
            padding: .75rem 1rem;
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
            text-align: center;
            border: 2px solid var(--c_primary);
            border-radius: 15px;
            cursor: pointer;
          }

          &__details {
            color: var(--c_white-soft);
            background-color: var(--c_primary);
          }

          &__edit {
            color: var(--c_primary);
          }
        }
      }

      &-add {
        color: var(--c_white);

        &__wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          // background-color: rgba(255, 255, 255, 0.5);
          background: linear-gradient(180deg, #5764F4 0%, #2130E7 100%);
          border-radius: 35px;
        }

        &__btn {
          width: 92px;
          height: 92px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 6.5rem;
          margin-bottom: 1.25rem;
          // background-color: var(--c_primary);
          border-radius: 10rem;
          cursor: pointer;

          svg {
            width: 100%;
            height: 100%;
          }
        }

        &__title {
          width: 100%;
          padding: 0 1.5rem;
          font-weight: 700;
          font-size: 18px;
          text-align: center;
        }

        &.-incorporate {
          .company-add {
            &__wrapper {
              background: linear-gradient(180deg, #4FE15D 0%, #14935D 100%);
            }

            &__btn {
              :deep(svg) {
                path {
                  fill: #14935D;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
