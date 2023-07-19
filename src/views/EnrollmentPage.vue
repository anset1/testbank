<template>
   <div class="page-enrollment">
      <div class="page-enrollment__container container">
         <div class="page-enrollment__header row">
            <h2 class="page-enrollment__heading page-title">
               <img src="/img/currencys/Tether.svg" alt="Tether">
               <span>USDT TRC-20</span>
            </h2>
            <button class="btn btn-primary">Payment details</button>
         </div>

         <v-card>
            <template #default>
               <div class="info">
                  <Toast position="bottom-center" group="bc"/>
                  <div class="info__row">
                     <div class="info__block">
                        <div class="info__title">
                           Wallet address
                        </div>
                        <div class="info__text">
                           TXS38283U42894824283942D2324
                        </div>
                     </div>
                     <button class="info__btn-copy" v-tooltip.top="'Copy'" @click="copy">
                        <CopyIcon/>
                     </button>
                  </div>
                  <div class="info__row">
                     <div class="info__block">
                        <div class="info__title">
                           Sum
                        </div>
                        <div class="info__text">
                           2000 USDT
                        </div>
                     </div>
                     <button class="info__btn-copy" v-tooltip.top="'Copy'" @click="copy">
                        <CopyIcon/>
                     </button>
                  </div>
               </div>
               <div class="qrcode">
                  <div class="qrcode__time">
                     <div class="qrcode__clock">
                        <ClockIcon/>
                        00 : 59 : 50
                     </div>
                     <div class="qrcode__desc">
                        The day will be credited within 60 minutes
                     </div>
                  </div>

                  <div class="qrcode__img">
                     <img src="/img/qrcode.png" alt=" QR-code" width="190" height="190">
                     <!-- <canvas width="190" height="190"></canvas> -->
                  </div>
               </div>
            </template>
         </v-card>
      </div>
   </div>
</template>

<script>
import vCard from '@/components/common/Card.vue';
import CopyIcon from '@/components/icons/CopyIcon.vue';
import ClockIcon from '@/components/icons/ClockIcon.vue';
import useClipboard from 'vue-clipboard3';

export default {
   name:"EnrollmentPage",
   components: {
      vCard,
      CopyIcon,
      ClockIcon
   },
    methods: {
      async copy(event) {

        try {
          const { toClipboard } = useClipboard();
          const elem = event.target.closest('.info__row');
          const text = elem.querySelector('.info__text').innerText;
          await toClipboard(text);
          this.$toast.add({ severity: 'success', detail: 'Copyed to clipboard', group: 'bc', life: 3000 });
        }
        catch (e) {
          console.error(e);
        }

      }
    }
}
</script>

<style lang="scss" scoped>
.page-enrollment {
   padding: 40px 15px 80px 15px;

   // .page-enrollment__container
   &__container {
   }

   // .page-enrollment__header
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

   // .page-enrollment__heading
   &__heading {
      padding-bottom: 0;
      display: flex;
      align-items: center;
      gap: 20px;

      @media (max-width: 960px){
         font-size: 32px;
      }

      @media (max-width: 672px){
         font-size: 28px;
      }

      img {
         width: 36px;
         height: 36px;
      }
   }
}

.info {
   margin-bottom: 60px;

   // .info__row
   &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #9B9B9B;
      padding-top: 25px;
      padding-bottom: 44px;

      &:last-child {
         border-bottom: none;
      }

      @media (max-width: 578px){
         padding-top: 20px;
         padding-bottom: 28px;
      }
   }

   // .info__block
   &__block {
      font-size: 20px;
      line-height: 1.2;

      @media (max-width: 578px){
         font-size: 16px;
      }
   }

   // .info__title
   &__title {
      color: var(--c_grey);
      font-weight: 500;
      margin-bottom: 15px;
   }

   // .info__text
   &__text {
      color: var(--c_black);
      font-weight: 700;
   }

   // .info__btn-copy
   &__btn-copy {
      width: 55px;
      height: 55px;
      background: var(--c_white-soft);
      border-radius: 50%;
      text-align: center;
      vertical-align: middle;
      transition: all 0.3s ease-in;

      svg {
         display: block;
         margin: 0 auto;
         transition: all 0.3s ease-in;
      }

      @media (max-width: 620px){
          display: none;
      }
   }
}
.qrcode {
   display: flex;
   align-items: flex-end;
   justify-content: space-between;

   @media (max-width: 920px) {
      justify-content: start;
      gap: 20px;
   }

   @media (max-width: 530px) {
      flex-wrap: wrap;
   }

   // .qrcode__time
   &__time {
   }

   // .qrcode__clock
   &__clock {
      color: var(--c_primary);
      font-size: 35px;
      font-style: normal;
      font-weight: 500;
      line-height: 1.2;

      display: flex;
      gap: 15px;
      align-items: center;
      margin-bottom: 16px;

      svg {
         fill: var(--c_primary);
         width: 40px;
         height: 40px;
      }

      @media (max-width: 968px){
         font-size: 30px;

         svg {
            width: 32px;
            height: 32px;
         }
      }

      @media (max-width: 587px){
         font-size: 28px;
         gap: 8px;

         svg {
            width: 28px;
            height: 28px;
         }
      }
   }

   // .qrcode__desc
   &__desc {
      color: var(--c_grey);
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 1.2;
      max-width: 264px;

      @media (max-width: 968px) {
         font-size: 18px;
      }

      @media (max-width: 572px) {
         font-size: 16px;
      }
   }

   // .qrcode__img
   &__img {
      position: relative;
      width: 190px;
      height: 190px;
      flex-shrink: 0;

      canvas, img {
         position: absolute;
         width: 100%;
         height: 100%;
         object-fit: cover;
      }

      @media (max-width: 968px) {
         width: 170px;
         height: 170px;
      }

      @media (max-width: 587px) {
         width: 130px;
         height: 130px;
      }

      @media (max-width: 530px) {
         order: -1;
      }
   }
}



</style>
