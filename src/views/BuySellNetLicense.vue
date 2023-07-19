<template>
  <div class="page-buysellnetlicense">
    <div class="page-buysellnetlicense__container container">
      <div class="page-buysellnetlicense__header">
        <h1 class="page-buysellnetlicense__header--title">
          BUY & SELL NET LICENSE
        </h1>
        <p class="page-buysellnetlicense__header--text">
          Please contact with your<br />
          own manager or <a href="#">support@.com</a>
        </p>
        <button class="btn btn-primary">Buy or sell now</button>
        <img
          class="page-buysellnetlicense__header--image"
          src="/img/buy-page.png"
          alt=""
        />
      </div>
      <div class="page-buysellnetlicense__header">
        <h2 class="page-buysellnetlicense__header--heading">
          Be<br />COMPLAINED
        </h2>
        <p class="page-buysellnetlicense__header--description">
          Make your Company business profile more complained for getting a
          better Banks tariff!
        </p>
        <button class="page-buysellnetlicense__btn btn-primary">Apply</button>
      </div>
    </div>
    <div class="page-buysellnetlicense__table container">
      <div class="page-buysellnetlicense__table--heading">
        <h3>Compliance service</h3>
      </div>
      <div class="main-table">
        <DataTable :value="list" dataKey="id">
          <Column field="type" header="Type of Services" sortable>
            <template #body="{ data, field }">
              <div class="pos-rel">
                <span>{{ data[field] }}</span>

                <button
                  @click="openModal(data, 'typeMore')"
                  v-if="data.typeMore"
                  class="page-buysellnetlicense__table--btn btn-primary"
                >
                  <img src="/img/plus.svg" alt="" />
                </button>
              </div>
            </template>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>

          <Column field="price" header="Price" sortable>
            <template #body="{ data, field }">
              {{ formatCurrencyEU(data[field]) }}
            </template>
            <template #editor="{ data, field }">
              <InputNumber
                v-model="data[field]"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column field="description" header="Description of Benefit" sortable>
            <template #body="{ data, field }">
              <div class="pos-rel">
                <span>{{ data[field] }}</span>
                <button
                  @click="openModal(data)"
                  v-if="data.descriptionMore"
                  class="page-buysellnetlicense__table--btn btn-primary"
                >
                  <img src="/img/plus.svg" alt="" />
                </button>
              </div>
            </template>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column
            field="historyTransaction"
            header="Transaction History"
            sortable
          >
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column field="serviceTime" header="Service time" sortable>
            <template #body="{ data, field }">
              {{ formatCurrency(data[field]) }}
            </template>
            <template #editor="{ data, field }">
              <InputNumber
                v-model="data[field]"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column field="request" header="Request">
            <template #body>
              <button class="page-buysellnetlicense__btn btn-primary">
                Apply
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <Dialog
      v-model:visible="showModal"
      modal
      :style="{ width: '790px' }"
      class="modal--info"
      @click="handleClickOutside"
      ref="dialogRef"
    >
      <div class="legal-modal__title text-center">
        {{ modalText }}
      </div>
    </Dialog>
  </div>
</template>

<script>
import { buySell } from "@/service/buysell/buySell";

import ArrowsIcon from "@/components/icons/ArrowsIcon.vue";
import Dialog from "primevue/dialog";
export default {
  name: "buySell",
  components: {
    ArrowsIcon,
    Dialog,
  },

  data() {
    return {
      list: null,
      showModal: false,
    };
  },
  mounted() {
    buySell.getBuySellMini().then((data) => (this.list = data));
  },
  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
    formatCurrencyEU(value) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    },
    openModal(data, field) {
      this.showModal = true;
      if (field && data[field]) {
        this.modalText = data[field];
      } else if (data.descriptionMore) {
        this.modalText = data.descriptionMore;
      }
    },
  },
  acceptModal() {
    this.showModal = false;
  },
};
</script>

<style lang="scss" scoped>
.pos-rel {
  position: relative;
  margin-left: 25px;
}
.p-datatable .p-column-header-content:first-child {
  margin-left: 25px;
}
.page-buysellnetlicense {
  &__btn {
    border-radius: 47px;
    padding: 5px 20px;
  }
}
.page-buysellnetlicense__header + .page-buysellnetlicense__header {
  width: 20%;
  margin-left: 15px;
  position: relative;
  &::after {
    content: url("/img/buy-page-bg.svg");
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 1;
  }
}
.page-buysellnetlicense {
  &__container {
    display: flex;
  }
  &__header {
    width: 80%;
    background: linear-gradient(
      238deg,
      #1c31f0 0%,
      #141f81 44.15%,
      #0b0b0b 100%
    );
    border-radius: 30px;
    padding: 100px 0 60px 30px;
    position: relative;

    &--title {
      color: #fff;
      font-family: Montserrat;
      font-size: 32px;
      font-style: normal;
      font-weight: 600;
      line-height: 26px;
      text-transform: capitalize;
    }
    &--text {
      padding: 20px 0 40px 0;
      color: #fff;
      font-family: Montserrat;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      a {
        color: #96a0ff;
        font-family: Montserrat;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
      }
    }
    &--image {
      position: absolute;
      right: 0;
      top: 25px;
      background-image: url("/img/buy-page-bg.svg");
      background-repeat: no-repeat;
      background-position-x: 240px;
    }
    &--heading {
      color: #fff;
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 26px;
      text-transform: uppercase;
    }
    &--description {
      color: #fff;
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      padding: 10px 0 47px 0;
    }
  }
  &__table {
    margin-bottom: 130px;

    &--heading {
      margin: 50px 0 30px 0;
      color: var(--on-surface, #191820);
      font-family: Montserrat;
      font-size: 32px;
      font-style: normal;
      font-weight: 600;
      line-height: 26px;
      text-transform: capitalize;
      position: relative;
      h3 {
        padding-left: 60px;
      }
      &::before {
        content: url("/img/buySell-tor.svg");
        position: absolute;
        left: -50px;
        top: -60px;
      }
    }
    &--btn {
      padding: 7px;
      border-radius: 5px;
      position: absolute;
      left: -35px;
    }
  }
}
</style>
