<template>
  <div class="business-request">
    <div class="container">
      <div class="row">
        <div class="request-button">Business Request</div>
      </div>

      <div class="row request-description">
        But each one takes a different approach and makes different tradeoffs.
      </div>
      <div class="row">
        <div class="payment-card" :class="{ active: bankAccount.checked }">
          <div class="main-content">
            <div class="main-content__title">
              <Checkbox
                v-model="bankAccount.checked"
                inputId="bankAccount"
                value="true"
                :binary="true"
              />
              <label for="bankAccount" class="ml-2">Bank account</label>
            </div>
            <div class="payment-form">
              <div class="payment-form__title">
                <RequestBankIcon />
                <div class="text">Bank account (wire)</div>
              </div>
              <div class="payment-form__content">
                <div class="forms-box">
                  <div class="forms-box__item">
                    <RequestInput
                      title="Minimum ammount ($)"
                      type="number"
                      v-model="bankAccount.min"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Maximum ammount ($)"
                      type="number"
                      v-model="bankAccount.max"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Type of your MC code needed"
                      v-model="bankAccount.purpose"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aside-box">
            <ScrollPanel style="height: 420px" class="business-request">
              <div class="payment-box-wrapper">
                <div class="mt-2">
                  <RequestPaymentBox
                    title="List of Account currencies"
                    v-model="bankAccount.accountCurrencies"
                  />
                </div>

                <div class="mt-5">
                  <RequestPaymentBox
                    title="Payment methods you need"
                    v-model="bankAccount.paymentMethods"
                  />
                </div>
              </div>
            </ScrollPanel>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="payment-card" :class="{ active: acquiring.checked }">
          <div class="main-content">
            <div class="main-content__title">
              <Checkbox
                v-model="acquiring.checked"
                inputId="acquiring"
                value="true"
                :binary="true"
              />
              <label for="acquiring" class="ml-2">Acquiring</label>
            </div>
            <div class="payment-form">
              <div class="payment-form__title">
                <RequestBankIcon />
                <div class="text">Merchant account</div>
              </div>
              <div class="payment-form__content">
                <div class="forms-box">
                  <div class="forms-box__item">
                    <RequestInput
                      title="Minimum ammount ($)"
                      type="number"
                      v-model="acquiring.min"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestSelect
                      title="Maximum ammount ($)"
                      :options="acquiring.maxOptions"
                      v-model="acquiring.max"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Type of your MC code needed"
                      v-model="acquiring.purpose"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Incoming fee"
                      type="number"
                      v-model="acquiring.min"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Outgoing fee"
                      type="number"
                      v-model="acquiring.max"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Recall reason"
                      v-model="acquiring.purpose"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aside-box">
            <ScrollPanel style="height: 620px" class="business-request">
              <div class="payment-box-wrapper">
                <div class="mt-2">
                  <RequestPaymentBox
                    title="Type of cards you need"
                    v-model="acquiring.typeOfCard"
                  />
                </div>

                <div class="mt-5">
                  <RequestPaymentBox
                    title="List of card processing currencies"
                    v-model="acquiring.currencies"
                  />
                </div>
              </div>
            </ScrollPanel>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="payment-card" :class="{ active: digitalWallet.checked }">
          <div class="main-content">
            <div class="main-content__title">
              <Checkbox
                v-model="digitalWallet.checked"
                inputId="digitalWallet"
                value="true"
                :binary="true"
              />
              <label for="digitalWallet" class="ml-2"
                >E-wallet / Digital wallet</label
              >
            </div>
            <div class="payment-form">
              <div class="payment-form__title">
                <RequestCardIcon />
                <div class="text">Card Issuing ( min. 1k cards)</div>
              </div>
              <div class="payment-form__content">
                <div class="forms-box">
                  <div class="forms-box__item">
                    <RequestInput
                      title="Minimum ammount ($)"
                      type="number"
                      v-model="digitalWallet.min"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Maximum ammount ($)"
                      type="number"
                      v-model="digitalWallet.max"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Type of your MC code needed"
                      v-model="digitalWallet.purpose"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aside-box">
            <ScrollPanel style="height: 420px" class="business-request">
              <div class="payment-box-wrapper">
                <div class="mt-2">
                  <RequestPaymentBox
                    title="List of Account currencies"
                    v-model="digitalWallet.accountCurrencies"
                  />
                </div>

                <div class="mt-5">
                  <RequestPaymentBox
                    title="Payment methods you need"
                    v-model="digitalWallet.paymentMethods"
                  />
                </div>
              </div>
            </ScrollPanel>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="payment-card" :class="{ active: cryptoAccount.checked }">
          <div class="main-content">
            <div class="main-content__title">
              <Checkbox
                v-model="cryptoAccount.checked"
                inputId="cryptoAccount"
                value="true"
                :binary="true"
              />
              <label for="cryptoAccount" class="ml-2">Crypto account</label>
            </div>
            <div class="payment-form">
              <div class="payment-form__title">
                <RequestCardIcon />
                <div class="text">Card Issuing ( min. 1k cards)</div>
              </div>
              <div class="payment-form__content">
                <div class="forms-box">
                  <div class="forms-box__item">
                    <RequestInput
                      title="Minimum ammount ($)"
                      type="number"
                      v-model="cryptoAccount.min"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Maximum ammount ($)"
                      type="number"
                      v-model="cryptoAccount.max"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Type of your MC code needed"
                      v-model="cryptoAccount.purpose"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aside-box">
            <ScrollPanel style="height: 420px" class="business-request">
              <div class="payment-box-wrapper">
                <div class="mt-2">
                  <RequestPaymentBox
                    title="List of Account currencies"
                    v-model="cryptoAccount.accountCurrencies"
                  />
                </div>

                <div class="mt-5">
                  <RequestPaymentBox
                    title="Payment methods you need"
                    v-model="cryptoAccount.paymentMethods"
                  />
                </div>
              </div>
            </ScrollPanel>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="payment-card" :class="{ active: cardIssuing.checked }">
          <div class="main-content">
            <div class="main-content__title">
              <Checkbox
                v-model="cardIssuing.checked"
                inputId="cardIssuing"
                value="true"
                :binary="true"
              />
              <label for="cardIssuing" class="ml-2">Card issuing</label>
            </div>
            <div class="payment-form">
              <div class="payment-form__title">
                <RequestCardIcon />
                <div class="text">Card Issuing ( min. 1k cards)</div>
              </div>
              <div class="payment-form__content">
                <div class="forms-box">
                  <div class="forms-box__item">
                    <RequestInput
                      title="Minimum ammount ($)"
                      type="number"
                      v-model="cardIssuing.min"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Maximum ammount ($)"
                      type="number"
                      v-model="cardIssuing.max"
                    />
                  </div>
                  <div class="forms-box__item">
                    <RequestInput
                      title="Type of your MC code needed"
                      v-model="cardIssuing.purpose"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="aside-box">
            <ScrollPanel style="height: 420px" class="business-request">
              <div class="payment-box-wrapper">
                <div class="mt-2">
                  <RequestPaymentBox
                    title="List of Account currencies"
                    v-model="cardIssuing.accountCurrencies"
                  />
                </div>

                <div class="mt-5">
                  <RequestPaymentBox
                    title="Payment methods you need"
                    v-model="cardIssuing.paymentMethods"
                  />
                </div>
              </div>
            </ScrollPanel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "primevue/checkbox";
import ScrollPanel from "primevue/scrollpanel";
import RequestBankIcon from "../components/icons/RequestBankIcon.vue";
import RequestCardIcon from "../components/icons/RequestCardIcon.vue";
import RequestInput from "../components/RequestInput.vue";
import RequestSelect from "../components/RequestSelect.vue";
import RequestPaymentBox from "../components/RequestPaymentBox.vue";
export default {
  name: "BusinessRequestPage",
  components: {
    Checkbox,
    ScrollPanel,
    RequestBankIcon,
    RequestCardIcon,
    RequestInput,
    RequestSelect,
    RequestPaymentBox,
  },
  data: () => {
    return {
      bankAccount: {
        checked: false,
        min: 0,
        max: 0,
        purpose: "",
        accountCurrencies: [
          { key: "usd", label: "USD", checked: true },
          { key: "cny", label: "CNY", checked: true },
          { key: "eur", label: "EUR", checked: false },
          { key: "rub", label: "RUB", checked: false },
          { key: "gbp", label: "GBP", checked: false },
          { key: "other", label: "Other", checked: false },
        ],
        paymentMethods: [
          { key: "swift", label: "SWIFT", checked: false },
          { key: "network", label: "Loro Account Network", checked: false },
          { key: "target-2", label: "Target-2", checked: false },
          { key: "sepa", label: "SEPA", checked: false },
        ],
      },
      acquiring: {
        checked: false,
        min: 0,
        max: {},
        type: "",
        incoming: 0,
        otgoing: 0,
        reason: "",
        maxOptions: [{ name: "Outgoing fee" }, { name: "Outgoing fee" }],
        typeOfCard: [
          { key: "visa", label: "Visa", checked: false },
          { key: "union", label: "Union Pay", checked: false },
          { key: "mir", label: "MIR", checked: false },
          { key: "other", label: "Other", checked: false },
          { key: "master-card", label: "Master Card", checked: false },
          { key: "amex", label: "AMEX", checked: false },
        ],
        currencies: [
          { key: "jcb", label: "JCB", checked: false },
          { key: "usd", label: "USD", checked: false },
          { key: "cny", label: "CNY", checked: false },
          { key: "eur", label: "EUR", checked: false },
          { key: "rub", label: "RUB", checked: false },
          { key: "gbp", label: "GBP", checked: false },
          { key: "other", label: "Other", checked: false },
        ],
      },
      digitalWallet: {
        checked: false,
        min: 0,
        max: 0,
        purpose: "",
        accountCurrencies: [
          { key: "usd", label: "USD", checked: false },
          { key: "cny", label: "CNY", checked: false },
          { key: "eur", label: "EUR", checked: false },
          { key: "rub", label: "RUB", checked: false },
          { key: "gbp", label: "GBP", checked: false },
          { key: "other", label: "Other", checked: false },
        ],
        paymentMethods: [
          { key: "swift", label: "SWIFT", checked: false },
          { key: "network", label: "Loro Account Network", checked: false },
          { key: "target-2", label: "Target-2", checked: false },
          { key: "sepa", label: "SEPA", checked: false },
        ],
      },
      cryptoAccount: {
        checked: false,
        min: 0,
        max: 0,
        purpose: "",
        accountCurrencies: [
          { key: "usd", label: "USD", checked: false },
          { key: "cny", label: "CNY", checked: false },
          { key: "eur", label: "EUR", checked: false },
          { key: "rub", label: "RUB", checked: false },
          { key: "gbp", label: "GBP", checked: false },
          { key: "other", label: "Other", checked: false },
        ],
        paymentMethods: [
          { key: "swift", label: "SWIFT", checked: false },
          { key: "network", label: "Loro Account Network", checked: false },
          { key: "target-2", label: "Target-2", checked: false },
          { key: "sepa", label: "SEPA", checked: false },
        ],
      },
      cardIssuing: {
        checked: false,
        min: 0,
        max: 0,
        purpose: "",
        accountCurrencies: [
          { key: "usd", label: "USD", checked: false },
          { key: "cny", label: "CNY", checked: false },
          { key: "eur", label: "EUR", checked: false },
          { key: "rub", label: "RUB", checked: false },
          { key: "gbp", label: "GBP", checked: false },
          { key: "other", label: "Other", checked: false },
        ],
        paymentMethods: [
          { key: "swift", label: "SWIFT", checked: false },
          { key: "network", label: "Loro Account Network", checked: false },
          { key: "target-2", label: "Target-2", checked: false },
          { key: "sepa", label: "SEPA", checked: false },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.request-button {
  display: inline-flex;
  margin-top: 20px;
  padding: 20px 26px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px 39px;
  background: linear-gradient(96deg, #1c31f0 0%, #5865f4 100%);
  color: #eef8ff;
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
  text-transform: capitalize;
  cursor: pointer;
}
.request-description {
  margin-top: 20px;
  margin-bottom: 50px;
  color: var(--secondary, #565660);
  font-size: 20px;
  font-weight: 400;
  line-height: 22px;
}
.payment-card {
  margin-bottom: 80px;
  width: 100%;
  min-height: 150px;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  display: flex;
  background: linear-gradient(
      180deg,
      rgba(70, 85, 243, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.35);
  border: 20px solid
    linear-gradient(
      180deg,
      rgba(9, 100, 193, 0.33) 0%,
      rgba(212, 228, 245, 0) 100%
    );
  box-shadow: 0px 35px 70px 0px rgba(0, 0, 0, 0.1),
    3px 3px 22px 0px rgba(255, 255, 255, 0.05) inset,
    0px 3px 2px 0px rgba(255, 255, 255, 0.05) inset,
    0px -3px 2px 0px rgba(0, 0, 0, 0.1) inset;
  backdrop-filter: blur(9px);
  .main-content {
    width: 100%;
    &__title {
      display: flex;
      align-items: center;
      color: rgba(25, 24, 32, 0.5);
      padding: 40px;
      font-size: 32px;
      font-weight: 600;
      line-height: 26px;
      text-transform: capitalize;
    }
    .payment-form {
      position: relative;
      padding: 20px 380px 30px 30px;
      border-radius: 30px 30px 0px 0px;
      width: 100%;
      min-height: 335px;
      flex-shrink: 0;
      background: linear-gradient(
        241deg,
        #071279 0%,
        #2130b2 32.81%,
        #141f81 69.17%,
        #0e1238 100%
      );
      z-index: 10;
      &__title {
        height: 42px;
        display: flex;
        align-items: center;
        .text {
          margin-left: 16px;
          color: #fff;
          font-size: 26px;
          font-style: normal;
          font-weight: 700;
        }
      }
      &__content {
        display: flex;
        justify-content: center;
        .forms-box {
          margin-top: 60px;
          width: 100%;
          max-width: 860px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          &__item {
            margin-top: 50px;
          }
        }
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 650px;
        width: 368px;
        height: 188px;
        background: url("@/assets/coins-image.svg");
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #9c9ec2;
        opacity: 0.5;
        border-radius: 30px 30px 0px 0px;
        z-index: 50;
      }
    }
  }
  .aside-box {
    width: 100%;
    max-width: 370px;
    height: 100%;
    min-height: 440px;
    padding: 20px 10px 20px 8px;
    border-radius: 30px 0px 0px 30px;
    background: #1c1c24;
    color: #fff;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    .payment-box-wrapper {
      padding: 0 20px 0 25px;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #9c9ec2;
      opacity: 0.5;
      border-radius: 30px 0px 0px 30px;
      z-index: 50;
    }
  }
}

.payment-card.active {
  .main-content {
    &__title {
      color: #191820;
    }
    .payment-form {
      &::after {
        display: none;
      }
    }
  }
  .aside-box {
    &::after {
      display: none;
    }
  }
}
::v-deep(.p-scrollpanel.business-request) {
  width: 100%;
}

::v-deep(.p-scrollpanel.business-request .p-scrollpanel-wrapper) {
  border-left: 5px solid #313131;
}

::v-deep(.p-scrollpanel.business-request .p-scrollpanel-bar) {
  background-color: #fff;
  width: 5px;
  opacity: 1;
  transition: background-color 0.3s;
  left: 0;
}

::v-deep(.p-scrollpanel.business-request .p-scrollpanel-bar:hover) {
  background-color: var(--primary-400);
}
</style>
