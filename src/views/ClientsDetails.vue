<template>
  <section class="page-details">
     <div class="container">
       <div class="section-title-wrapp">
          <h2 class="page-details__title section-title">Client details</h2>
       </div>
       <div class="page-details__content">
          <div class="page-details__comments">
             <textarea class="page-details__textarea"></textarea>
             <div class="page-details__btn-wrap">
               <button class="page-details__btn page-details__btn_approve btn">Approve</button>
               <button class="page-details__btn page-details__btn_reject btn">Reject</button>
             </div>
          </div>
          <div class="page-details__details">
             <details-bg>
                 <template #default>
                    <div class="details-row">
                      <div class="details-row__th">Company name</div>
                      <div class="details-row__td">Digital Flat [Bo]</div>
                    </div>
                    <div class="details-row">
                      <div class="details-row__th">Industry</div>
                      <div class="details-row__td">SaaS</div>
                    </div>
                    <div class="details-row">
                      <div class="details-row__th">UBO Residental</div>
                      <div class="details-row__td">Ukraine</div>
                    </div>
                    <div class="details-row">
                      <div class="details-row__th">Country of incorporation</div>
                      <div class="details-row__td">United Kingdom</div>
                    </div>
                    <div class="details-row">
                      <div class="details-row__th">Monthly turnover</div>
                      <div class="details-row__td">100 000 000 000</div>
                    </div>
                    <div class="details-row">
                      <div class="details-row__th">Date</div>
                      <div class="details-row__td">01/01/2024</div>
                    </div>
                 </template>
             </details-bg>
          </div>
       </div>
     </div>
  </section>
</template>

<script>
   import DetailsBg from '../components/common/DetailsBg.vue';
   export default {
      name:"ClientsDetails",
      components: {
         DetailsBg
      }

   }
</script>

<style lang="scss" scoped>
.page-details {
   padding: 30px 15px 80px 15px;
   gap: 36px;

   // .page-details__title
   &__title {

   }

   // .page-details__content
   &__content {
      display: flex;
      gap: 30px;

      @media (max-width: 1100px){
        flex-direction: column;
      }
   }

   // .page-details__comments
   &__comments {
    flex: 1 1 40%;
    max-width: 425px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 1100px){
        order: 1;
        max-width: 680px;
    }
   }

   // .page-details__textarea
   &__textarea {
    width: 100%;
    height: 100%;
    resize: none;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 24px 32px 0px rgba(50, 50, 71, 0.08), 0px 16px 16px 0px rgba(50, 50, 71, 0.08);
    outline: none;
    min-height: 140px;
   }

   &__btn-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
   }

   // .page-details__btn
   &__btn {
      text-align: center;
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      padding: 15px 64px 15px 64px;
      border-radius: 47px;

      @media (max-width: 560px){
        padding: 10px 34px 10px 34px;
      }

      &_approve {
        color: #EEF8FF;
        font-weight: 700;
        background: linear-gradient(120deg, #1C31F0 0%, #931CF0 100%);
        box-shadow: 0px 24px 32px 0px rgba(50, 50, 71, 0.08), 0px 16px 16px 0px rgba(50, 50, 71, 0.08);
      }

      &_reject {
        color: #656565;
        font-weight: 400;
        background: #CFEBFF;
        box-shadow: 0px 24px 32px 0px rgba(50, 50, 71, 0.08), 0px 16px 16px 0px rgba(50, 50, 71, 0.08);
      }
   }

   // .page-details__details
   &__details {
      flex: 1 1 60%;
      max-width: 680px;
   }
}

.details-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 0px 10px 0px;
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: 0.8px;
  text-align: left;
  border-bottom: 1px solid #eef8ff86;

  @media (max-width: 540px){
      flex-direction: column;

  }

  &:last-child {
    border-bottom: none;
  }

  // .details-row__th
  &__th {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 1px;
    flex: 1 1 50%;
  }

  // .details-row__td
  &__td {
    flex: 1 0 140px;

    @media (max-width: 540px) {
      flex: unset;
    }
  }
}


</style>
