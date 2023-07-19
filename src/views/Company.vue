<template>
  <div class="page-company">
    <div class="container">
      <div class="section-title-wrapp">
        <h2 class="page-details__title section-title">Company</h2>
      </div>

      <div class="page-company__title">Bank`s Info</div>
      <div class="form">
        <div class="grid grid--60-40">
          <div class="form-group">
            <label for="company_name">Name</label>
            <input
              name="name"
              id="name"
              v-model="form.name"
              placeholder="Some Greate Bank"
            />
          </div>
        </div>
        <div class="grid grid--60-40">
          <div class="form-group">
            <label for="company_name">Description</label>
            <textarea
              rows="1"
              name="company_name"
              id="company_name"
              v-model="form.description"
              placeholder="Useful info about the Some Greate Bank"
            />
          </div>
        </div>

        <div class="form-uploads">
          <div class="form-uploads__upload form-uploads__upload--top">
            <div class="form-uploads__upload-notice">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="96"
                height="66"
                viewBox="0 0 96 66"
                fill="none"
              >
                <path
                  d="M77.4375 25.125C74.625 11.4375 62.625 0.9375 48 0.9375C36.375 0.9375 26.4375 7.5 21.375 17.25C9.375 18.375 0 28.6875 0 41.0625C0 54.1875 10.6875 65.0625 24 65.0625H75.9375C87 65.0625 96 56.0625 96 45C96 34.5 87.75 25.875 77.4375 25.125ZM75.9375 57H24C15.1875 57 8.0625 49.875 8.0625 41.0625C8.0625 32.8125 14.0625 25.875 22.3125 25.125L26.4375 24.75L28.5 20.8125C32.25 13.5 39.75 9 48 9C58.5 9 67.5 16.5 69.5625 26.8125L70.6875 32.8125L76.875 33.1875C83.0625 33.5625 87.9375 38.8125 87.9375 45C87.9375 51.5625 82.6875 57 75.9375 57ZM32.0625 36.9375H42.1875V48.9375H53.8125V36.9375H63.9375L48 21L32.0625 36.9375Z"
                  fill="white"
                />
              </svg>
              <span
                >Vyvantage the file with your attachment. The image can be
                enlarged by increasing the number of 184 by 184 pixels.</span
              >
            </div>
            <FileUpload
              mode="basic"
              customUpload
              auto="true"
              choose-label="Choose file"
              :multiple="false"
              accept="image/*"
              :maxFileSize="50000"
              @uploader="onUploadFirst"
            />
            <div class="orm-uploads__upload-max">(max 5 Mb)</div>
          </div>
          <div class="form-uploads__upload">
            <img :src="form.logo || '/img/logo.svg'" alt="Logo" />
            <FileUpload
              mode="basic"
              customUpload
              auto="true"
              choose-label="Company logo"
              :multiple="false"
              accept="image/*"
              :maxFileSize="50000"
              @uploader="onUpload"
            />
            <div class="orm-uploads__upload-max">(max 5 Mb)</div>
          </div>
          <div class="form-uploads__icon">
            <img src="/img/folder.png" alt="folder" />
          </div>
        </div>

        <div class="grid grid--60-40" style="align-items: end;">
          <div class="fields pb-65">
            <div class="form-group select">
              <label for="company_name">Type of account</label>
              <MultiSelect
                v-model="form.type_of_account"
                display="chip"
                :options="accountTypes"
                placeholder="Type of account"
                :maxSelectedLabels="3"
                optionLabel="label"
                class="w-full md:w-20rem"
                :pt="{
                  root: () => ({
                    class:
                      'bank-accounts-actions__select bank-accounts-actions__select--2',
                  }),
                  panel: () => ({
                    class:
                      'bank-accounts-actions__panel bank-accounts-actions__panel--2',
                  }),
                  header: () => ({
                    class: 'bank-accounts-actions__header',
                  }),
                  item: () => ({
                    class:
                      'bank-accounts-actions__item bank-accounts-actions__item--2',
                  }),
                }"
              >
                <template #header>
                  <span></span>
                </template>
              </MultiSelect>
            </div>
            <div class="form-group">
              <label for="company_name">Open Fee</label>
              <input
                name="open_fee"
                id="open_fee"
                v-model="form.open_fee"
                placeholder="500$ - 1 000$"
              />
            </div>
            <div class="form-group">
              <label for="company_name">Outgoing Fee</label>
              <input
                name="outgoing_fee"
                id="outgoing_fee"
                v-model="form.outgoing_fee"
                placeholder="0,1% min 1000$"
              />
            </div>
            <div class="form-group">
              <label for="company_name">Incoming Fee</label>
              <input
                name="incoming_fee"
                id="incoming_fee"
                v-model="form.incoming_fee"
                placeholder="0,1%"
              />
            </div>
            <div class="form-group">
              <label for="company_name">Country</label>
              <Dropdown
                :pt="{
                  root: () => ({
                    class:
                      'bank-accounts-actions__select bank-accounts-actions__select--2',
                  }),
                  panel: () => ({
                    class:
                      'bank-accounts-actions__panel bank-accounts-actions__panel--2',
                  }),
                  header: () => ({
                    class: 'bank-accounts-actions__header',
                  }),
                  item: () => ({
                    class:
                      'bank-accounts-actions__item bank-accounts-actions__item--2',
                  }),
                }"
                v-model="form.country"
                :options="countryOptions"
                optionLabel="label"
                class="w-full md:w-20rem"
              />
            </div>
            <div class="form-group">
              <label for="company_name">Type of License</label>
              <Dropdown
                :pt="{
                  root: () => ({
                    class:
                      'bank-accounts-actions__select bank-accounts-actions__select--2',
                  }),
                  panel: () => ({
                    class:
                      'bank-accounts-actions__panel bank-accounts-actions__panel--2',
                  }),
                  header: () => ({
                    class: 'bank-accounts-actions__header',
                  }),
                  item: () => ({
                    class:
                      'bank-accounts-actions__item bank-accounts-actions__item--2',
                  }),
                }"
                v-model="form.type_of_license"
                :options="licenseOptions"
                optionLabel="label"
                class="w-full md:w-20rem"
              />
            </div>
            <div class="form-group select">
              <label for="company_name">Services</label>
              <MultiSelect
                v-model="form.services"
                display="chip"
                :options="serviceOptions"
                placeholder="Type of account"
                :maxSelectedLabels="3"
                optionLabel="label"
                class="w-full md:w-20rem"
                :pt="{
                  root: () => ({
                    class:
                      'bank-accounts-actions__select bank-accounts-actions__select--2',
                  }),
                  panel: () => ({
                    class:
                      'bank-accounts-actions__panel bank-accounts-actions__panel--2',
                  }),
                  header: () => ({
                    class: 'bank-accounts-actions__header',
                  }),
                  item: () => ({
                    class:
                      'bank-accounts-actions__item bank-accounts-actions__item--2',
                  }),
                }"
              >
                <template #header>
                  <span></span>
                </template>
              </MultiSelect>
            </div>
          </div>
          <div class="image-part">
            <img src="/img/bigphone.svg" alt="Phone" />
          </div>
        </div>

        <div class="grid grid--60-40">
          <div>
            <div class="page-company__title">Pricing</div>
            <div class="form-box">
              <div
                class="form-group"
                v-for="(pricing, index) in form.pricing"
                :key="index"
              >
                <label>{{ pricing.label }}</label>
                <input v-model="pricing.value" :placeholder="pricing.label" />
              </div>
            </div>

            <div class="form-buttons">
              <div class="btn btn--main">Save</div>
              <div
                class="btn btn--outline btn--icon"
                @click.prevent="addPricing"
              >
                Add pricing
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="45"
                  viewBox="0 0 46 45"
                  fill="none"
                >
                  <ellipse
                    cx="22.6877"
                    cy="22.3691"
                    rx="21.6877"
                    ry="21.3691"
                    stroke="#EBEEF0"
                    stroke-width="1.27978"
                    stroke-dasharray="4.27 4.27"
                  />
                  <ellipse
                    cx="22.6903"
                    cy="22.3691"
                    rx="18.0731"
                    ry="17.8076"
                    fill="#1C31F0"
                  />
                  <g clip-path="url(#clip0_693_11430)">
                    <path
                      d="M28.2587 21.5703H24.1438C24.0101 21.5703 23.9017 21.4641 23.9017 21.333V17.2988C23.9017 16.6436 23.3598 16.1123 22.6915 16.1123C22.0231 16.1123 21.4812 16.6436 21.4812 17.2988V21.333C21.4812 21.4641 21.3729 21.5703 21.2392 21.5703H17.1243C16.456 21.5703 15.9141 22.1016 15.9141 22.7568C15.9141 23.4121 16.456 23.9434 17.1243 23.9434H21.2392C21.3729 23.9434 21.4812 24.0496 21.4812 24.1807V28.2148C21.4812 28.8701 22.0231 29.4014 22.6915 29.4014C23.3598 29.4014 23.9017 28.8701 23.9017 28.2148V24.1807C23.9017 24.0496 24.0101 23.9434 24.1438 23.9434H28.2587C28.927 23.9434 29.4689 23.4121 29.4689 22.7568C29.4689 22.1016 28.927 21.5703 28.2587 21.5703Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_693_11430">
                      <rect
                        width="13.5548"
                        height="13.3557"
                        fill="white"
                        transform="translate(15.9141 15.6914)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import FileUpload from "primevue/fileupload";

export default {
  name: "Company",
  components: {
    Dropdown,
    FileUpload,
  },
  data: () => ({
    form: {
      name: "",
      description: "",
      incoming_fee: "",
      open_fee: "",
      outgoing_fee: "",
      type_of_account: [
        { label: "SWIFT", value: "swift" },
        { label: "NOTSWIFT", value: "notswift" },
      ],
      country: { value: "Australia", label: "Australia" },
      type_of_license: { label: "EMI", value: "EMI" },
      services: [
        { label: "Crypto", value: "Crypto" },
        { label: "Exchange", value: "Exchange" },
      ],
      pricing: [
        { label: "Name of pricing", value: "1 Year Business Savings Bond" },
        { label: "Name of pricing", value: "1 Year Business Savings Bond" },
      ],
      logo: null,
    },
    accountTypes: [
      { label: "SWIFT", value: "swift" },
      { label: "NOTSWIFT", value: "notswift" },
    ],
    countryOptions: [
      { value: "USA", label: "USA" },
      { value: "Germany", label: "Germany" },
      { value: "Poland", label: "Poland" },
      { value: "Australia", label: "Australia" },
    ],
    licenseOptions: [
      { label: "EMI", value: "EMI" },
      { label: "NOEMI", value: "NOEMI" },
    ],
    serviceOptions: [
      { label: "Crypto", value: "Crypto" },
      { label: "Exchange", value: "Exchange" },
    ],
  }),
  methods: {
    addPricing() {
      this.form.pricing = [
        ...this.form.pricing,
        { label: "Name of pricing", value: "1 Year Business Savings Bond" },
      ];
    },
    setLogo(logo) {
      this.form.logo = logo;
    },
    async onUpload(event) {
      const file = event.files[0];
      const reader = new FileReader();
      let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
      this.form.logo = blob;
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        const base64data = reader.result;
        this.setLogo(base64data);
      };
    },
  },
};
</script>

<style lang="scss">
.page-company {
  padding: 30px 15px 80px 15px !important;

  &__title {
    color: #191820;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    text-transform: capitalize;
    margin-bottom: 30px;
  }

  .form {
    &-box {
      border-radius: 30px;
      background: #fff;
      padding: 20px;
      margin-bottom: 60px;
    }

    &-uploads {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      border-radius: 24px;
      background: linear-gradient(
        135deg,
        #d2ecff 0%,
        #d6ecff 9.37%,
        #f5e8ff 100%
      );
      padding: 18px 20px;
      margin-bottom: 50px;

      &__icon {
        margin-bottom: -18px;

        img {
          margin-left: auto;
          margin-right: auto;
        }
      }

      &__upload {
        text-align: center;
        border-radius: 24px;
        background: #e9eaff;
        box-shadow: 9px 0px 50px 0px rgba(0, 0, 0, 0.1);
        padding: 15px 20px 8px;

        img {
          margin: 0 auto 20px;
        }

        &-notice {
          border-radius: 17px 20px 20px 0px;
          background: #1c31f0;
          padding: 15px 15px 15px 30px;
          margin-bottom: 34px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: -20px;

          span {
            color: #fff;
            font-family: Montserrat;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
        }

        &--top {
          margin-right: -30px;
          position: relative;
        }
      }
    }

    &-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn--main {
        min-width: 200px;
      }
    }

    &-group {
      margin-bottom: 30px;

      label {
        color: #191820;
        font-family: Montserrat;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 18px;
        margin-bottom: 15px;
        display: block;
      }

      input {
        border-radius: 24px;
        border: 1px solid #e5e5e5;
        color: #6d6d6d;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        padding: 15px 20px;
        width: 100%;
      }

      textarea {
        border-radius: 20px;
        background: #fff;
        color: #6d6d6d;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        resize: none;
        padding: 15px 20px;
        width: 100%;
        min-height: 54px;
      }
    }
  }
}

.p-fileupload-basic {
  .p-fileupload-choose {
    border-radius: 28px;
    border: 2px solid #1c31f0;
    background: transparent;
    color: #1c31f0;
    text-align: center;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: 0.9px;
    min-width: 210px;
    margin-bottom: 10px;

    svg {
      display: none;
    }
  }
}
</style>
