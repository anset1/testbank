<template>
  <div class="page-subscriptions">
    <div class="container">
      <div class="grid grid-cols-2 gap-4 items-center">
        <div>
          <div class="section-title-wrapp">
            <h2 class="page-details__title section-title">Subscriptions</h2>
          </div>
        </div>

        <div class="text-right">
          <div class="btn btn--green" @click.prevent="openModal">
            Legal Support
          </div>
        </div>
      </div>

      <div
        class="subscription-plans grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          class="subscription-plan"
          v-for="plan in subscriptionPlans"
          :key="plan.id"
        >
          <div class="subscription-plan__title" :data-title="plan.title"></div>
          <ul class="subscription-plan__options" v-if="plan.options.length">
            <li
              class="subscription-plan__option"
              v-for="(option, index) in plan.options"
              :key="index"
            >
              {{ option }}
            </li>
          </ul>
          <div class="subscription-plan__footer">
            <div class="subscription-plan__price-info grid grid-cols-2">
              <div class="subscription-plan__price-new">
                {{ plan.price }} <small>per week</small>
              </div>
              <div class="subscription-plan__price grid grid-cols-2">
                <div class="subscription-plan__price-old">
                  {{ plan.old_price }}
                </div>
                <div class="subscription-plan__price-discount">
                  {{ plan.discount }}
                </div>
              </div>
            </div>
            <router-link :to="{ name: 'PagePayment' }">
                <div class="subscription-plan__buy btn btn--main">Buy</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="showModal"
      modal
      :style="{ width: '790px' }"
      class="modal--legal-support"
    >
      <div class="legal-modal__title text-center">
        Your subscription has confirmed! <br />
        🥳Congratulations!🥳 <br />
        You have been given the opportunity to:
      </div>

      <ul class="legal-modal__list">
        <li class="legal-modal__list-item">Selection of the right banks</li>
        <li class="legal-modal__list-item">Online opening of bank accounts</li>
        <li class="legal-modal__list-item">Possibility 1</li>
        <li class="legal-modal__list-item">Opportunity 2</li>
        <li class="legal-modal__list-item">Opportunity 3</li>
      </ul>

      <div class="btn btn--main legal-modal__button" @click.prevent="acceptModal">Accept</div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";

export default {
  name: "Subscriptions",
  components: {
    Dialog,
  },
  data: () => ({
    showModal: false,
    subscriptionPlans: [
      {
        id: 1,
        title: "Silver",
        options: [
          "Selection of the right banks",
          "Online opening of bank accounts",
          "Possibility 1",
          "Opportunity 2",
          "Opportunity 3",
        ],
        price: "500$",
        old_price: "625$",
        discount: "20% off",
      },
      {
        id: 2,
        title: "Gold",
        options: [
          "Selection of the right banks",
          "Online opening of bank accounts",
          "Possibility 1",
          "Opportunity 2",
          "Opportunity 3",
        ],
        price: "500$",
        old_price: "625$",
        discount: "20% off",
      },
      {
        id: 3,
        title: "Platinum",
        options: [
          "Selection of the right banks",
          "Online opening of bank accounts",
          "Possibility 1",
          "Opportunity 2",
          "Opportunity 3",
        ],
        price: "500$",
        old_price: "625$",
        discount: "20% off",
      },
    ],
  }),
  methods: {
    openModal() {
      this.showModal = true;
    },
    acceptModal() {
      this.showModal = false
    }
  },
};
</script>

<style lang="scss" scoped>
.page-subscriptions {
  padding: 30px 15px 80px 15px;
  background-image: url("/img/page-background.svg");
  background-repeat: no-repeat;
  background-position: top right;
  background-size: cover;

  .subscription-plans {
    grid-gap: 36px;
  }

  .subscription-plan {
    border-radius: 38px;
    background: linear-gradient(
      135deg,
      rgba(159, 212, 250, 0.5) 0%,
      rgba(172, 215, 252, 0.5) 9.37%,
      rgba(237, 214, 255, 0.5) 100%
    );
    padding: 10px;

    &__title {
      border-radius: 30px 30px 0px 0px;
      background: #eef8ff;
      text-align: center;
      font-family: Montserrat;
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      letter-spacing: 1.5px;
      position: relative;
      padding: 9px 10px;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #eef8ff;
        border-radius: 30px 30px 0px 0px;
      }

      &::after {
        content: attr(data-title);
        position: relative;
        z-index: 1;
        background: -webkit-linear-gradient(0deg, #1c31f0 0%, #931cf0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        position: relative;
      }
    }

    &__option {
      position: relative;
      color: #555;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 193%;
      letter-spacing: 0.7px;
      padding: 2px 0 2px 39px;
      counter-increment: plan;

      &::before {
        content: counter(plan);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='31' height='31' viewBox='0 0 31 31' fill='none'%3E%3Cpath d='M14.519 0.801917C15.0898 0.335334 15.9102 0.335334 16.481 0.801917L17.6885 1.78896C18.0765 2.10618 18.594 2.21617 19.0775 2.08422L20.5821 1.67363C21.2933 1.47954 22.0428 1.81324 22.3744 2.47164L23.076 3.86447C23.3015 4.31209 23.7295 4.62306 24.2249 4.69918L25.7664 4.93604C26.4951 5.04801 27.044 5.65771 27.0792 6.39408L27.1537 7.95187C27.1776 8.4525 27.4421 8.91067 27.8637 9.18171L29.1756 10.0251C29.7957 10.4237 30.0492 11.204 29.7819 11.891L29.2162 13.3444C29.0345 13.8115 29.0898 14.3376 29.3647 14.7567L30.2201 16.0607C30.6245 16.6772 30.5387 17.4931 30.015 18.012L28.9072 19.1097C28.5511 19.4624 28.3876 19.9656 28.4683 20.4603L28.7194 21.9995C28.8381 22.7271 28.4279 23.4376 27.7384 23.6986L26.2799 24.2508C25.8111 24.4282 25.4571 24.8214 25.3296 25.3061L24.933 26.8144C24.7454 27.5274 24.0817 28.0096 23.3457 27.9676L21.7886 27.8788C21.2883 27.8503 20.8049 28.0655 20.4913 28.4564L19.5155 29.6729C19.0542 30.248 18.2517 30.4186 17.5963 30.0809L16.2101 29.3664C15.7645 29.1368 15.2355 29.1368 14.7899 29.3664L13.4037 30.0809C12.7483 30.4186 11.9458 30.248 11.4845 29.6729L10.5087 28.4564C10.1951 28.0655 9.71175 27.8503 9.21135 27.8788L7.65433 27.9676C6.91831 28.0096 6.25456 27.5274 6.06704 26.8144L5.67035 25.3061C5.54287 24.8214 5.18886 24.4282 4.72012 24.2508L3.26158 23.6986C2.57212 23.4376 2.1619 22.7271 2.28059 21.9995L2.53166 20.4603C2.61235 19.9656 2.44887 19.4624 2.09283 19.1097L0.984977 18.012C0.461287 17.4931 0.375527 16.6772 0.779893 16.0607L1.63532 14.7567C1.91023 14.3376 1.96553 13.8115 1.78376 13.3444L1.21815 11.891C0.950781 11.204 1.20431 10.4237 1.82444 10.0251L3.1363 9.18171C3.5579 8.91067 3.82243 8.4525 3.84635 7.95187L3.92078 6.39408C3.95597 5.65771 4.50495 5.04801 5.23361 4.93604L6.77508 4.69918C7.27047 4.62306 7.69848 4.31209 7.92396 3.86447L8.62557 2.47164C8.95722 1.81324 9.70673 1.47954 10.4179 1.67363L11.9225 2.08422C12.406 2.21617 12.9235 2.10618 13.3115 1.78896L14.519 0.801917Z' fill='url(%23paint0_linear_693_12509)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_693_12509' x1='2.7125' y1='-5.5721e-07' x2='24.025' y2='31' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23307824'/%3E%3Cstop offset='1' stop-color='%2319A403'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
        width: 31px;
        height: 31px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        text-align: center;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        letter-spacing: 0.8px;
      }
    }

    &__options {
      counter-reset: plan;
      display: grid;
      grid-gap: 15px;
      background: #f3f3ff;
      padding: 15px 15px 30px;
    }

    &__footer {
      border-radius: 38px;
      background: #1c1c24;
      margin: -10px;
      padding: 20px 25px;
    }

    &__price {
      align-items: center;
      justify-content: center;

      &-new {
        color: #fff;
        font-family: Montserrat;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        small {
          font-size: 14px;
        }
      }

      &-info {
        margin-bottom: 15px;
        align-items: center;
        grid-gap: 20px;
      }

      &-old {
        color: #a3a8e0;
        font-family: Montserrat;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-decoration: line-through;
      }

      &-discount {
        color: #4ccc37;
        font-family: Montserrat;
        font-size: 14.412px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        text-transform: uppercase;
        border-radius: 14px;
        border: 1px solid #4ccc37;
        text-align: center;
        padding: 5px;
      }
    }
  }
}
</style>
