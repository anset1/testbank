<template>
   <div class="page-payment">
      <div class="container">
         <div class="page-payment__header">
            <h2 class="page-payment__heading page-title">Select payment currency</h2>
            <button class="btn btn-secondary">Payment details</button>
         </div>
         <v-card>
            <template #default>
               <div class="payment-currency">
                  <form class="payment-currency__form">
                     <div class="payment-currency__item" @click="selected">
                        <label for="Bitcoin">
                           <span class="payment-currency__currency">
                              <img src="/img/currencys/Bitcoin.svg" alt="currency icon" width="52" height="52">
                              <span>Bitcoin</span>
                           </span>

                           <span class="payment-currency__value">
                              0.00013497 BTC
                           </span>
                        </label>
                        <input type="radio" name="payment-currency" id="Bitcoin">
                     </div>
                     <div class="payment-currency__item" @click="selected">
                        <label for="TetherTRC">
                           <span class="payment-currency__currency">
                              <img src="/img/currencys/Tether.svg" width="52" height="52" alt="currency icon">
                              <span>USDT TRC-20</span>
                           </span>

                           <span class="payment-currency__value">
                              0.00013497 BTC
                           </span>
                        </label>
                        <input type="radio" name="payment-currency" id="TetherTRC">
                     </div>
                     <div class="payment-currency__item" @click="selected">
                        <label for="TetherERC">
                           <span class="payment-currency__currency">
                              <img src="/img/currencys/Tether.svg" width="52" height="52" alt="currency icon">
                              <span>USDT ERC-20</span>
                           </span>

                           <span class="payment-currency__value">
                              0.00013497 BTC
                           </span>
                        </label>
                        <input type="radio" name="payment-currency" id="TetherERC">
                     </div>
                     <div class="payment-currency__item" @click="selected">
                        <label for="Ethereum">
                           <span class="payment-currency__currency">
                              <img src="/img/currencys/Ethereum.svg" width="52" height="52" alt="currency icon">
                              <span>Ethereum</span>
                           </span>

                           <span class="payment-currency__value">
                              0.00013497 BTC
                           </span>
                        </label>
                        <input type="radio" name="payment-currency" id="Ethereum">
                     </div>

                     <div class="input-group payment-currency__input">
                        <InputText id="email" v-model="email" aria-placeholder="email-help" placeholder="Email" />
                     </div>

                      <router-link :to="{ name: 'EnrollmentPage' }">
                        <button type="submit" class="btn btn-primary payment-currency__btn">Pay</button>
                      </router-link>
                  </form>
               </div>
            </template>
         </v-card>
      </div>
   </div>
</template>

<script>
import vCard from '@/components/common/Card.vue';
export default {
   name: "PagePayment",
   components: {
      vCard
   },
   data(){
      return {
         email: '',
      }
   },
   methods: {
      selected(event) {
         document.querySelectorAll('.payment-currency__item').forEach(item => {
            item.classList.remove('_selected');
         });

         const elem = event.target.closest('.payment-currency__item');
         elem.classList.add('_selected');
      }
   }

}
</script>

<style lang="scss" scoped>
.page-payment {
   padding: 40px 15px 80px 15px;

   &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 40px;

      @media (max-width: 880px) {
         flex-direction: column;
         align-items: flex-start;
         gap: 20px;
      }
   }

   &__heading {
      padding-bottom: 0;

      @media (max-width: 960px){
         font-size: 32px;
      }

      @media (max-width: 672px){
         font-size: 28px;
      }
   }
}

.payment-currency {

		// .payment-currency__form
		&__form {
		}

		// .payment-currency__item

		&__item {
         border-radius: 26px;
         padding: 14px 20px;
         border: 2px solid transparent;
         margin-bottom: 22px;

         color: #000;
         font-size: 18px;
         font-style: normal;
         line-height: 1.19;
         transition: all 0.3s ease-in;

         input[type="radio"] {
            display: none;
         }

         label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;

            @media (max-width: 578px){
                 flex-direction: column;
                 align-items: flex-start;
                 gap: 12px
            }
         }

         &._selected {
            border: 2px solid #C0C7FF;
            background: #EEF8FF;
         }
		}

		// .payment-currency__currency
		&__currency {
         display: flex;
         align-items: center;
         gap: 16px;

         span {
            font-weight: 700;
         }

         img {
            width: 52px;
            height: 52px;

            @media (max-width: 578px) {
               width: 36px;
               height: 36px;
            }
         }
		}

		// .payment-currency__value
		&__value {
         font-weight: 400;
		}

      &__input {
         margin-bottom: 28px;
      }

      &__btn {
         width: 100%;
      }
}

</style>
