<template>
  <div class="page-proposals">
    <div class="container">
      <Toast position="bottom-center" group="bc"/>
      <div class="row page-top">
        <div class="section-title-wrapp">
          <h2 class="page-details__title section-title">Individually Selected Proposals</h2>
        </div>
        <div class="page-option">
          <div class="btn btn-account-status">Account Status</div>
        </div>
      </div>
      <div class="row page-promo">
        <div class="promo">
          <div class="promo-text">To unlock all services buy subscription.</div>
          <div class="btn btn-promo">open all list</div>
        </div>
      </div>
      <div class="row page-content">
        <ProposalTable
          v-if="!bankAcc.loading.startData"
          name="Bank accounts"
          desc="matching 56/146"
          :options="bankAcc"
          @apply="apply"
        />
        <ProposalTable
          v-if="!merchantAcc.loading.startData"
          name="Merchant account"
          desc="matching 190/356"
          :options="merchantAcc"
          @apply="apply"
        />
        <!-- <Table
          :options="bankAcc"
          :key="bankAccKey"
          @apply="apply"
          @change-page="getBankOffers"
          @sort="sortBy"
          @scroll-top="toElTop"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia'
import { useMainStore } from '@/stores/main'

import ProposalTable from '@/components/ProposalTable.vue'

export default {
  name: 'Proposals',
  components: {
    ProposalTable,
  },
  data: () => ({
    test: {
      bankAcc: {"current_page":1,"data":[{"id":278,"user_id":null,"type":1,"financial_institution_name":"Testhigth","account_type":"test","open_integration_fee":"1520","onboarding_time":"1","incoming_fee":"0.3","outgoing_fee":"0.2","created_at":"2021-10-13T13:53:30.000000Z","updated_at":"2021-10-13T13:53:30.000000Z","country_id":16,"provider_id":155,"is_legal_company":1,"open_integration_fee_max":null,"oif_min_max":0,"restricted_countries":null,"restricted_business_types":null,"time_left":null,"applied":false,"serial_number":1,"onboarding_time_text":"1 work day","country_code":"AT","users":[{"id":229,"name":"PAVEL","email":"pasha4jesus@gmail.com","member_login":"MZFsptT","full_name":null,"language":null,"mobile_phone":null,"logo":null,"hide":false,"business_type":"GBMF LIMITED","service_type":4,"service_type_other":null,"account_type":2,"email_verified_at":null,"access_token":null,"notes_from_support":null,"created_at":"2021-06-24T14:49:32.000000Z","updated_at":"2021-10-25T11:18:12.000000Z","discount_code":"TEST","usertype":null,"customer_type":null,"risk_id":1,"is_paid":0,"registration_country":null,"company_full_name":null,"website":null,"company_registration_number":null,"balance":null,"balance_currency_id":null,"additional_compliance_request":null,"is_payment_confirmed":0,"invoice_media_id":null,"payment_request_settings_changed":0,"rating":null,"rating_color":"","is_kyb_rate_manual":0,"kyb_rate_manual":null,"is_provider":0,"provider_type":null,"provider_service_type":null,"reg_admin":0,"kyb_rate_comment":null,"referral_code":"MZFsptT","_lft":36,"_rgt":37,"parent_id":4,"business_activity_id":null,"risk_coefficient":"0.00","calculated_risk_id":7,"show_calculated_risk":1,"two_factor_code":null,"two_factor_expires_at":null,"forgot_password_token":null,"last_request_at":null,"customer_type_name":"","pivot":{"offer_id":278,"user_id":229,"created_at":"2021-10-25T11:20:42.000000Z"}}],"country":{"id":16,"code":"AT","name":"Austria","mark":6,"phonecode":43}},{"id":277,"user_id":null,"type":1,"financial_institution_name":"test7852","account_type":"test","open_integration_fee":"1540","onboarding_time":"2","incoming_fee":"0.1","outgoing_fee":"0.5","created_at":"2021-10-13T07:16:46.000000Z","updated_at":"2021-10-13T12:17:14.000000Z","country_id":11,"provider_id":155,"is_legal_company":1,"open_integration_fee_max":null,"oif_min_max":0,"restricted_countries":null,"restricted_business_types":null,"time_left":null,"applied":false,"serial_number":2,"onboarding_time_text":"2 work days","country_code":"AG","users":[],"country":{"id":11,"code":"AG","name":"Antigua and\/or Barbuda","mark":3,"phonecode":1268}}],"first_page_url":"https:\/\/app.kyc-pay.com\/api\/offers\/bank-accounts?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/app.kyc-pay.com\/api\/offers\/bank-accounts?page=1","links":[{"url":null,"label":"&laquo; Previous","active":false},{"url":"https:\/\/app.kyc-pay.com\/api\/offers\/bank-accounts?page=1","label":"1","active":true},{"url":null,"label":"Next &raquo;","active":false}],"next_page_url":null,"path":"https:\/\/app.kyc-pay.com\/api\/offers\/bank-accounts","per_page":20,"prev_page_url":null,"to":2,"total":2},
      merchantAcc: {"current_page":1,"data":[{"id":279,"user_id":null,"type":2,"financial_institution_name":"Testligth","account_type":"12","open_integration_fee":"120","onboarding_time":"1","incoming_fee":"0.1","outgoing_fee":"0.6","created_at":"2021-10-13T13:55:16.000000Z","updated_at":"2021-10-13T13:55:16.000000Z","country_id":10,"provider_id":155,"is_legal_company":1,"open_integration_fee_max":null,"oif_min_max":0,"restricted_countries":null,"restricted_business_types":null,"time_left":null,"applied":false,"serial_number":1,"onboarding_time_text":"1 day","country_code":"AQ","users":[{"id":436,"name":"Maxim","email":"m.gurin@agentkuzminov.com","member_login":"52QRkBL","full_name":null,"language":null,"mobile_phone":null,"logo":null,"hide":false,"business_type":"Marketing agency","service_type":1,"service_type_other":null,"account_type":1,"email_verified_at":null,"access_token":null,"notes_from_support":null,"created_at":"2022-06-15T21:01:27.000000Z","updated_at":"2022-06-15T21:06:07.000000Z","discount_code":null,"usertype":null,"customer_type":null,"risk_id":1,"is_paid":0,"registration_country":null,"company_full_name":null,"website":null,"company_registration_number":null,"balance":null,"balance_currency_id":null,"additional_compliance_request":null,"is_payment_confirmed":0,"invoice_media_id":383,"payment_request_settings_changed":0,"rating":null,"rating_color":"","is_kyb_rate_manual":0,"kyb_rate_manual":null,"is_provider":0,"provider_type":null,"provider_service_type":null,"reg_admin":0,"kyb_rate_comment":null,"referral_code":"52QRkBL","_lft":583,"_rgt":584,"parent_id":null,"business_activity_id":null,"risk_coefficient":"0.00","calculated_risk_id":7,"show_calculated_risk":1,"two_factor_code":null,"two_factor_expires_at":null,"forgot_password_token":null,"last_request_at":null,"customer_type_name":"","pivot":{"offer_id":279,"user_id":436,"created_at":"2022-06-15T21:05:43.000000Z"}}],"country":{"id":10,"code":"AQ","name":"Antarctica","mark":5,"phonecode":0}},{"id":276,"user_id":null,"type":2,"financial_institution_name":"tert44","account_type":"411","open_integration_fee":"2555","onboarding_time":"1","incoming_fee":"0.6","outgoing_fee":"0.7","created_at":"2021-09-27T11:32:00.000000Z","updated_at":"2021-10-13T12:17:14.000000Z","country_id":1,"provider_id":155,"is_legal_company":1,"open_integration_fee_max":"25554","oif_min_max":1,"restricted_countries":null,"restricted_business_types":null,"time_left":null,"applied":false,"serial_number":2,"onboarding_time_text":"1 day","country_code":"US","users":[],"country":{"id":1,"code":"US","name":"United States","mark":3,"phonecode":1}}],"first_page_url":"https:\/\/app.kyc-pay.com\/api\/offers\/merchant-accounts?page=1","from":1,"last_page":1,"last_page_url":"https:\/\/app.kyc-pay.com\/api\/offers\/merchant-accounts?page=1","links":[{"url":null,"label":"&laquo; Previous","active":false},{"url":"https:\/\/app.kyc-pay.com\/api\/offers\/merchant-accounts?page=1","label":"1","active":true},{"url":null,"label":"Next &raquo;","active":false}],"next_page_url":null,"path":"https:\/\/app.kyc-pay.com\/api\/offers\/merchant-accounts","per_page":20,"prev_page_url":null,"to":2,"total":2},
    },
    bankOffersData: {},
    bankAcc: {
      objName: 'bankAcc',
      colsWidth: ['3%', '10%', '10%', '11%', '12%', '15%', '15%', '12%', '10%'],
      header: [
        { ttl: '#', info: null },
        {
          ttl: 'Name',
          info: {
            pos: 'tr',
            txt: 'The names will be available to you after passing Compliance'
          },
          sort: 'type_of_license'
        },
        { ttl: 'Country', info: null },
        { ttl: 'Type of Account', info: null },
        {
          ttl: 'Open/Integration fee',
          info: {
            pos: 'tr',
            txt: 'All Fee is a public providing by Financial Institutions.<br/> The Fee, depand Client type of business and legal structure'
          },
          sort: 'open_integration_fee'
        },
        { ttl: 'Incoming fee', info: null },
        { ttl: 'Outgoing fee', info: null },
        {
          ttl: 'Onboarding time',
          info: {
            pos: 'tl',
            txt: 'Actual deadlines, start from date of  providing  company packege of documents'
          },
          sort: 'onboarding_time'
        },
        { ttl: 'Request', info: null },
      ],
      body: [],
      paginationData: null,
      sort: {
        name: '',
        order: 'asc',
        loading: false
      },
      loading: {
        startData: false,
        apply: false,
      },
    },
    bankAccKey: 0,
    merchantOffersData: {},
    merchantAcc: {
      objName: 'merchantAcc',
      body: [],
      paginationData: null,
      sort: {
        name: '',
        order: 'asc',
        loading: false
      },
      loading: {
        startData: true,
        apply: false,
      },
    },
    merchantAccKey: 0,
  }),
  async created() {
    if (this.user.is_paid) {
      this.bankAcc.loading.startData = true
      this.merchantAcc.loading.startData = true
      await this.getBankOffers()
      this.bankAcc.loading.startData = false
      await this.getMerchantOffers()
      this.merchantAcc.loading.startData = false
    }
  },
  computed: {
    ...mapWritableState(useMainStore, ['user', 'api', 'token']),
  },
  methods: {
    ...mapActions(useMainStore, ['setCountries', 'setIndustries']),
    getTestData() {

    },
    async getBankOffers(page = 1) {
      const basePath = import.meta.env.VITE_APP_BACKEND_API_URL + 'offers/bank-accounts?page=' + page
      const sortParams = '&sort=' + this.bankAcc.sort.name + '&order=' + this.bankAcc.sort.order
      await this.api
        .get(basePath + sortParams)
        .then(response => {
          this.bankAcc.paginationData = this.bankOffersData = response.data
          this.bankAcc.body = []
          this.bankAcc.individual = []
          this.bankOffersData.data.forEach(el => {
            const individual = (parseInt(el.user_id) === parseInt(this.$store.state.user.id)) ? true : false;
            const country = el.country_code && el.country ? el.country.name : ''
            this.bankAcc.individual.push(individual);
            if (!el.applied) {
              this.bankAcc.body.push([
                el.serial_number, this.getFinName(el), country, el.account_type, this.getOif(el),
                el.incoming_fee, el.outgoing_fee, el.onboarding_time_text, { type: 'apply-btn', html: 'Apply', applyType: 'bank-offer', id: el.id }
              ])
            } else {
              const timeLeftDaysNumber = (el.time_left) ? el.time_left.days_number : ''
              const timeLeftHoursNumber = (el.time_left) ? el.time_left.hours_number : ''
              this.bankAcc.body.push([
                el.serial_number, this.getFinName(el), country, el.account_type, this.getOif(el), el.incoming_fee, el.outgoing_fee, { type: 'deadline_info', days: timeLeftDaysNumber, hours: timeLeftHoursNumber}, { type: 'cancel', applyType: 'bank-offer', id: el.id }
              ])
            }
          })
          if (this.bankAcc.sort.name) this.bankAcc.sort.loading = false
        })
        .catch(errors => console.dir(errors))
    },
    async getMerchantOffers(page = 1) {
      const basePath = import.meta.env.VITE_APP_BACKEND_API_URL + 'offers/merchant-accounts?page=' + page
      const sortParams = '&sort=' + this.merchantAcc.sort.name + '&order=' + this.merchantAcc.sort.order
      await this.api
        .get(basePath + sortParams)
        .then(response => {
          this.merchantAcc.paginationData = this.merchantOffersData = response.data
          this.merchantAcc.body = []
          this.merchantAcc.individual = []
          this.merchantOffersData.data.forEach(el => {
            const individual = (parseInt(el.user_id) === parseInt(this.$store.state.user.id)) ? true : false
            const country = el.country_code && el.country ? el.country.name : ''
            this.merchantAcc.individual.push(individual)
            if (!el.applied) {
              this.merchantAcc.body.push([
                el.serial_number, this.getFinName(el), country, el.account_type, this.getOif(el), el.incoming_fee, el.outgoing_fee, el.onboarding_time_text, { type: 'apply-btn', html: 'Apply', applyType: 'merchant-offer', id: el.id }
              ])
            } else {
              const timeLeftDaysNumber = (el.time_left) ? el.time_left.days_number : ''
              const timeLeftHoursNumber = (el.time_left) ? el.time_left.hours_number : ''
              this.merchantAcc.body.push([
                el.serial_number, this.getFinName(el), country, el.account_type, this.getOif(el), el.incoming_fee, el.outgoing_fee, { type: 'deadline_info', days: timeLeftDaysNumber, hours: timeLeftHoursNumber}, { type: 'cancel', applyType: 'merchant-offer', id: el.id }
              ])
            }
          })
          if (this.merchantAcc.sort.name) this.merchantAcc.sort.loading = false
        })
        .catch(errors => console.dir(errors))
    },
    apply(payload) {
      if (!payload.hasOwnProperty('objName') || !payload.objName) {
        return console.log('error: not set objName')
      }

      let offer = this[payload.objName]?.paginationData?.data.find(el => +el.id == +payload.id)
      if (!offer) {
        return console.log('error: offer not found')
      }

      this[payload.objName].loading.apply = true

      this.api
        .post(import.meta.env.VITE_APP_BACKEND_API_URL + 'offers/toogle-apply/' + payload.id)
        .then(response => {
          const res = response.data

          if (!res.hasOwnProperty('applied')) {
            return console.log('error: not set applied')
          }

          offer.applied = res.applied

          this.$toast.add({
            severity: 'success',
            detail: 'Apply status was successfully changed',
            group: 'bc',
            life: 8000
          });

          if (res.applied) {
            this.$toast.add({
              severity: 'success',
              detail: 'Please fill out the documents on the Compliance page and check your mail',
              group: 'bc',
              life: 8000
            });
          }
        })
        .catch(errors => console.dir(errors))
        .finally(() => {
          this[payload.objName].loading.apply = false
        })
    },
    sortBy (data) {
      this[data.obj].sort.loading = true
      this[data.obj].sort.order = this[data.obj].sort.name === data.sort && this[data.obj].sort.order === 'asc'
        ? 'desc' : 'asc'
      this[data.obj].sort.name = data.sort

      switch (data.obj) {
        case 'bankAcc':
          this.getBankOffers(1)
          break;
        case 'merchantAcc':
          this.getMerchantOffers(1)
          break;
      }
    },
    toElTop (el) {
      // this.$refs.os.osInstance().scroll({ el: el, margin: 10 }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }

  .section-title-wrapp {
    margin: 0;
  }

  &-content {
    display: flex;
    flex-direction: column;
  }
  .promo {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem 2rem;
    margin-bottom: 1.5rem;
    color: var(--c_white);
    background: linear-gradient(136deg, #121B66 0%, #1C31F0 38.49%, #5462E4 100%);
    background-image: url('/img/proposals-promo-bg.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 43px;

    &-text {
      max-width: 400px;
      text-align: center;
      font-size: 30px;
      font-style: normal;
      font-weight: 800;
      line-height: 114.5%;
      letter-spacing: 1.473px;
    }

    .btn {
      display: inline-flex;
      padding: 6px 23px 5px 23px;
      justify-content: center;
      align-items: center;
      border-radius: 47px;
      border: 1px solid #FFF;
      background: linear-gradient(120deg, #1C31F0 0%, #931CF0 100%);
      box-shadow: 0px 24px 32px 0px rgba(50, 50, 71, 0.08), 0px 16px 16px 0px rgba(50, 50, 71, 0.08);
    }
  }

  .btn {
    &-account-status {
      display: inline-flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      padding: .5rem 1.25rem;
      color: #1C31F0;
      font-size: 18px;
      font-weight: 500;
      line-height: 125%;
      letter-spacing: 0.18px;
      background: #EEF8FF;
      border-radius: 21px;
      border: 1px solid #1C31F0;
    }
  }
}
</style>
