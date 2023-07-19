<template>
   <div class="card">
      <div class="card__content">
         <slot></slot>
      </div>

      <div class="card__illustration">
         <img src="/img/currencys.png" alt="illustration">
      </div>
   </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
   .card {
      display: flex;
      overflow: hidden;
      border-radius: 30px;
      background: #FFF;
      box-shadow: 0px 40px 48px 0px rgba(50, 50, 71, 0.25), 0px 24px 24px 0px rgba(50, 50, 71, 0.10);

      // .card__content
      &__content {
         flex: 1 1 654px;
         padding: 30px 20px;
      }

      // .card__illustration
      &__illustration {
         flex: 1 1 488px;
         background: linear-gradient(153deg, #1C31F0 0%, #141F81 44.15%, #0B0B0B 100%);
         position: relative;

         @media (max-width: 920px){
            display: none;
         }

         img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
         }
      }
   }

</style>
