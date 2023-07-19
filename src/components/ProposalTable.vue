<template>
  <div class="proposal-table" :class="{ '-is_paid': options?.paginationData?.data?.length }">
    <div class="proposal-table-top">
      <div class="proposal-table-name">{{ name }}</div>
      <div class="proposal-table-desc">{{ desc }}</div>
    </div>
    <div class="proposal-table-main">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Type of account</th>
            <th>Open Fee (€)</th>
            <th>Incoming Fee (%)</th>
            <th>Outgoing Fee</th>
            <th>Average Onboarding time</th>
            <th>Provider Details</th>
            <th>Request</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="options?.paginationData?.data?.length">
            <tr v-for="(item, index) in options?.paginationData?.data" :key="index">
              <td>{{ item.financial_institution_name }}</td>
              <td>{{ item.country_code }}</td>
              <td>{{ item.account_type }}</td>
              <td>{{ item.open_integration_fee }}</td>
              <td>{{ item.incoming_fee }}%</td>
              <td>{{ item.outgoing_fee }}%</td>
              <td>{{ item.onboarding_time_text }}</td>
              <td><StarInfoIcon/></td>
              <td>
                <ProgressSpinner v-if="options?.loading.apply" style="width: 2rem; height: 2rem" />
                <div v-else-if="item.applied" class="btn btn-disapply" @click="apply(item.id)"><XIcon/></div>
                <div v-else class="btn btn-apply" @click="apply(item.id)">Apply</div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(item, index) in 4" :key="index">
              <td>Everyfin</td>
              <td>UK</td>
              <td>Swift</td>
              <td>500 - 1 000</td>
              <td>0-0,1%</td>
              <td>0,1%, min 50 €</td>
              <td>3 work days</td>
              <td><StarInfoIcon/></td>
              <td><div class="btn btn-apply">Apply</div></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';

import StarInfoIcon from '@/components/icons/StarInfoIcon.vue'
import XIcon from '@/components/icons/XIcon.vue'

export default {
  name: 'ProposalTable',
  components: {
    ProgressSpinner,
    StarInfoIcon,
    XIcon,
  },
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      required: true
    },
  },
  data: () => ({}),
  methods: {
    apply(id) {
      if (this.options.comingSoon) return

      this.$emit('apply', {
        id: id,
        objName: this.options.objName,
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.proposal-table {
  --px: 1.5rem;
  --border-radius: 30px;

  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  background: var(--c_white);
  border-radius: var(--border-radius);
  box-shadow: 0px 24px 32px 0px rgba(50, 50, 71, 0.08), 0px 16px 16px 0px rgba(50, 50, 71, 0.08);

  &.-is_paid {
    &::before,
    &::after {
      content: none;
    }
  }

  &-top {
    padding: .75rem var(--px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
    color: var(--c_white-soft);
    font-size: 18px;
    font-weight: 800;
    line-height: 1.25;
    letter-spacing: 0.9px;
    background: var(--c_main-dark-bg);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  &-desc {
    color: #CFEBFF;
  }

  &-main {
    padding: 0 .5rem;

    table {
      width: 100%;

      tr {
        th, td {
          padding: .75rem 1rem;
          color: var(--c_primary-dark);
          text-align: left;
          line-height: 1.25;
          border-bottom: 1px solid #E5E5E5;

          &:nth-child(8),
          &:nth-child(9) {
            border-bottom: 1px solid transparent;
          }
        }

        th {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.7px;
        }

        td {
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0.8px;

          &:nth-child(8) {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .btn {
      &-apply {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: .5rem 1rem;
        color: var(--c_white-soft);
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
        text-transform: uppercase;
        border-radius: 47px;
        background: linear-gradient(120deg, #1C31F0 0%, #931CF0 100%);
        box-shadow: 0px 24px 32px 0px rgba(50, 50, 71, 0.08), 0px 16px 16px 0px rgba(50, 50, 71, 0.08);
      }

      &-disapply {
        width: 2rem;
        height: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border-radius: 10rem;
        background-color: var(--c_danger);

        :deep(svg) {
          width: 50%;
          height: 50%;

          path {
            fill: var(--c_white);
          }
        }
      }
    }
  }

  &::before {
    content: 'Use free';
    position: absolute;
    top: 8rem;
    left: -6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem 2.25rem;
    color: var(--c_white);
    text-align: center;
    font-weight: 700;
    letter-spacing: 0.8px;
    line-height: 1;
    text-transform: uppercase;
    border-radius: 222px 222px 0 0;
    background: #1C1C24;
    transform: rotate(-90deg);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 7rem;
    border-radius: 30px;
    opacity: 0.97;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%);
    box-shadow: 0px 0px 44px 0px rgba(255, 255, 255, 0.08) inset, 0px 5.4px 5.4px 0px rgba(255, 255, 255, 0.16) inset;
    backdrop-filter: blur(3px);
  }
}
</style>
