<template>
   <div class="details-bg">
      <div class="details-bg__block">
        <slot>

        </slot>
      </div>
      <div class="details-bg__card-chip"></div>
      <div class="details-bg__card-entr"></div>
      <div class="details-bg__ellipses">
        <Ellipses/>
      </div>
   </div>
</template>

<script>
import Ellipses from '../icons/Ellipses.vue';
export default {
   name: "DetailsBg",
   components: {
      Ellipses
   }

}
</script>

<style lang="scss" scoped>
.details-bg {
   overflow: hidden;
   position: relative;
   height: 575px;
   padding: 20px;
   background: linear-gradient(153deg, #1C31F0 0%, #141F81 44.15%, #0B0B0B 100%);
   border-top-left-radius: 30px;
   border-bottom-right-radius: 30px;
   border-top-right-radius: 160px;
   border-bottom-left-radius: 160px;

   @media (max-width: 648px){
     height: auto;
     border-radius: 20px;
   }

   &__block {
      max-width: 637px;
      padding: 20px 30% 20px 20px;
      border-radius: 27px 160px 27px 27px;
      background: linear-gradient(123deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.07) 100%);
      box-shadow: 0px 1.1966018676757812px 15px 0px rgba(69, 42, 124, 0.10);
      backdrop-filter: blur(35px);

      @media (max-width: 1200px){
        padding-right: 20%;
      }

      @media (max-width: 648px){
        border-radius: 20px;
        padding: 20px;
      }
   }

   &__card-chip {
      position: absolute;
      width: 430px;
      height: 270px;
      bottom: 0;
      right: -6.5rem;
      transform: translateY(7%) translateX(5%) rotate(-16.5deg);
      background-image: url('/img/card-chip.png');
      background-size: cover;
      z-index: 2;

      @media (max-width: 648px){
        display: none;
      }
   }

   &__card-entr {
      position: absolute;
      width: 395px;
      height: 250px;
      bottom: 0;
      transform: translateY(50%) translateX(-12%) rotate(14.5deg);
      background-image: url('/img/card-entr.png');
      background-size: cover;
      z-index: 1;
      @media (max-width: 648px){
        display: none;
      }
   }

   &__ellipses {
      position: absolute;
      bottom: 0;
      transform: translateY(50%) rotate(25deg);
      z-index: 0;
      @media (max-width: 648px){
        display: none;
      }
   }
}
</style>
