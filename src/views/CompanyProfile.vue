<template>
  <div class="page-company-profile">
    <div class="container">
      <div class="section-title-wrapp">
        <h2 class="page-details__title section-title">Company Profile</h2>
      </div>

      <div class="page-company-profile__header grid">
        <div class="page-company-profile__header-title">Compliance</div>
        <div class="page-company-profile__header-action text-center">
          <div
            class="page-company-profile__header-btn btn btn--green"
            @click.prevent="openModal"
          >
            Legal Support
          </div>
        </div>
        <div class="compliance grid" v-if="complianceItems.length">
          <div
            class="compliance__item grid"
            v-for="item in complianceItems"
            :key="item.id"
          >
            <div class="compliance__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM6.47 7.72C6.76 7.43 7.24 7.43 7.53 7.72C8.24 8.43 9.4 8.43 10.11 7.72C10.4 7.43 10.88 7.43 11.17 7.72C11.46 8.01 11.46 8.49 11.17 8.78C10.52 9.43 9.67 9.75 8.82 9.75C7.97 9.75 7.12 9.43 6.47 8.78C6.18 8.48 6.18 8.01 6.47 7.72ZM12 18.78C9.31 18.78 7.12 16.59 7.12 13.9C7.12 13.2 7.69 12.62 8.39 12.62H15.59C16.29 12.62 16.86 13.19 16.86 13.9C16.88 16.59 14.69 18.78 12 18.78ZM17.53 8.78C16.88 9.43 16.03 9.75 15.18 9.75C14.33 9.75 13.48 9.43 12.83 8.78C12.54 8.49 12.54 8.01 12.83 7.72C13.12 7.43 13.6 7.43 13.89 7.72C14.6 8.43 15.76 8.43 16.47 7.72C16.76 7.43 17.24 7.43 17.53 7.72C17.82 8.01 17.82 8.48 17.53 8.78Z"
                  fill="#3749E9"
                />
              </svg>
            </div>
            <div class="compliance__text">
              <div class="compliance__title">{{ item.title }}</div>
              <div class="compliance__subtitle">{{ item.subtitle }}</div>
            </div>
          </div>
        </div>
        <div class="page-company-profile__header-bg">
          <div class="page-company-profile__header-bg-1"></div>
          <div class="page-company-profile__header-bg-2"></div>
          <div class="page-company-profile__header-bg-3">
            <div class="page-company-profile__header-bg-line-1"></div>
            <div class="page-company-profile__header-bg-line-2"></div>
          </div>
        </div>
      </div>

      <div class="cp-info-block">
        <div class="cp-info-block__title">{{ bankCompilance.title }}</div>
        <div class="cp-info-block__text">{{ bankCompilance.subtitle }}</div>

        <div
          :class="['cp-info-block__card', { editing: bankCompilance.editing }]"
        >
          <div class="cp-info-block__card-text">
            <div
              class="cp-info-block__card-row"
              v-for="field in bankCompilance.fields"
              :key="field.id"
            >
              <div class="cp-info-block__card-title">{{ field.label }}</div>
              <div
                class="cp-info-block__card-subtitle"
                v-if="!bankCompilance.editing"
              >
                {{ field.type === "text" ? field.value : field.value.value }}
              </div>
              <div class="cp-info-block__card-field" v-else>
                <input
                  type="text"
                  v-model="field.value"
                  v-if="field.type === 'text'"
                />
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
                  v-else-if="field.type === 'dropdown'"
                  v-model="field.value"
                  :options="field.options"
                  optionLabel="label"
                  class="w-full md:w-20rem"
                />
              </div>
            </div>
          </div>
          <div class="cp-info-block__card-action">
            <div
              v-if="!bankCompilance.editing"
              class="btn btn--outline cp-info-block__card-btn"
              @click.prevent="editCompany('bankCompliance')"
            >
              Edit
            </div>
            <div class="btn-group" v-else>
              <div
                class="btn btn--outline cp-info-block__card-btn"
                @click.prevent="cancelEditCompany('bankCompliance')"
              >
                Cancel
              </div>
              <div
                class="btn btn--main cp-info-block__card-btn"
                @click.prevent="saveCompany('bankCompliance')"
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cp-info-block">
        <div class="cp-info-block__title">{{ companyInfo.title }}</div>
        <div class="cp-info-block__text">{{ companyInfo.subtitle }}</div>

        <div :class="['cp-info-block__card', { editing: companyInfo.editing }]">
          <div class="cp-info-block__card-text">
            <div
              class="cp-info-block__card-row"
              v-for="field in companyInfo.fields"
              :key="field.id"
            >
              <div class="cp-info-block__card-title">{{ field.label }}</div>

              <div
                class="cp-info-block__card-subtitle"
                v-if="!companyInfo.editing"
              >
                {{ field.value }}
              </div>
              <div class="cp-info-block__card-field" v-else>
                <input type="text" v-model="field.value" />
              </div>
            </div>
          </div>
          <div class="cp-info-block__card-action">
            <div
              v-if="!companyInfo.editing"
              class="btn btn--outline cp-info-block__card-btn"
              @click.prevent="editCompany('companyInfo')"
            >
              Edit
            </div>
            <div class="btn-group" v-else>
              <div
                class="btn btn--outline cp-info-block__card-btn"
                @click.prevent="cancelEditCompany('companyInfo')"
              >
                Cancel
              </div>
              <div
                class="btn btn--main cp-info-block__card-btn"
                @click.prevent="saveCompany('companyInfo')"
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cp-info-block cp-info-block--last">
        <div class="cp-info-block__title">{{ businessInfo.title }}</div>
        <div class="cp-info-block__text">{{ businessInfo.subtitle }}</div>

        <div
          :class="['cp-info-block__card', { editing: businessInfo.editing }]"
        >
          <div class="cp-info-block__card-text">
            <div class="cp-info-block__title">{{ businessInfo.title }}</div>
            <div class="cp-info-block__text">{{ businessInfo.subtitle }}</div>
            <div
              class="cp-info-block__card-row"
              v-for="field in businessInfo.fields"
              :key="field.id"
            >
              <div class="cp-info-block__card-title">{{ field.label }}</div>
              <template v-if="!businessInfo.editing">
                <div
                  class="cp-info-block__card-tags"
                  v-if="Array.isArray(field.value)"
                >
                  <div class="cp-info-block__card-tags-inner">
                    <div
                      class="cp-info-block__card-tag"
                      v-for="tag in field.value"
                      :key="tag.id"
                    >
                      {{ tag.label }}
                    </div>
                  </div>
                </div>
                <div class="cp-info-block__card-subtitle" v-else>
                  {{ field.value }}
                </div>
              </template>
              <div class="cp-info-block__card-field" v-else>
                <input
                  type="text"
                  v-model="field.value"
                  v-if="field.type === 'text'"
                />
                <MultiSelect
                  v-else-if="field.type === 'multi'"
                  v-model="field.value"
                  display="chip" 
                  :options="field.options"
                  placeholder="Company name"
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
          </div>
          <div class="cp-info-block__card-action">
            <div
              v-if="!businessInfo.editing"
              class="btn btn--outline cp-info-block__card-btn"
              @click.prevent="editCompany('businessInfo')"
            >
              Edit
            </div>
            <div class="btn-group" v-else>
              <div
                class="btn btn--outline cp-info-block__card-btn"
                @click.prevent="cancelEditCompany('businessInfo')"
              >
                Cancel
              </div>
              <div
                class="btn btn--main cp-info-block__card-btn"
                @click.prevent="saveCompany('businessInfo')"
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="btn btn--main btn--inline page-company-profile__offer-btn mb-50"
      >
        Scan for offer
      </div>

      <div class="cp-info-block__title">Available to you</div>
      <div class="cp-info-block__text">
        Based on the information you’ve shared, it looks like you’re eligible
        for the account type below (subject to our due diligence).
      </div>

      <div class="matches-block">
        <ul class="matches-block__checklist" v-if="advantages.length">
          <li
            class="matches-block__checklist-item"
            v-for="(advantage, index) in advantages"
            :key="index"
            v-html="advantage"
          />
        </ul>
        <div class="btn btn--main btn--inline page-company-profile__offer-btn">
          Watch matches
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="showModal"
      modal
      :style="{ width: '790px' }"
      class="modal--legal-support modal--legal-support-alternate"
    >
      <div class="legal-modal__title text-center">Legal Support 24/7</div>

      <div class="legal-modal__price">2500$</div>

      <div class="legal-modal__text">3 months</div>

      <div
        class="btn btn--main legal-modal__button"
        @click.prevent="acceptModal"
      >
        Book call
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";

export default {
  name: "CompanyProfile",
  components: {
    Dialog,
    Dropdown,
  },
  data: () => ({
    showModal: false,
    complianceItems: [
      { id: 1, title: "Status", subtitle: "Upload" },
      { id: 2, title: "Pre-check type of risk", subtitle: "Low risk" },
      {
        id: 3,
        title: "Compliance advice",
        subtitle: "Compliance your company form download required files",
      },
    ],
    bankCompilance: {
      title: "Bank’s Compliance",
      subtitle:
        "But each one takes a different approach and makes different tradeoffs.",
      editing: false,
      fields: [
        {
          id: 1,
          value: { value: "Select Country", label: "Select Country" },
          edit_value: { value: "Select Country", label: "Select Country" },
          label: "UBO Residential",
          type: "dropdown",
          options: [
            { value: "USA", label: "USA" },
            { value: "Germany", label: "Germany" },
            { value: "Poland", label: "Poland" },
          ],
        },
        {
          id: 2,
          value: { value: "Select Country", label: "Select Country" },
          edit_value: { value: "Select Country", label: "Select Country" },
          label: "Country of incorporation",
          type: "dropdown",
          options: [
            { value: "USA", label: "USA" },
            { value: "Germany", label: "Germany" },
            { value: "Poland", label: "Poland" },
          ],
        },
        {
          id: 3,
          value: "e.g. Ecommerce",
          edit_value: "e.g. Ecommerce",
          label: "Industry",
          type: "text",
        },
      ],
    },
    companyInfo: {
      title: "Company Information",
      subtitle:
        "But each one takes a different approach and makes different tradeoffs.",
      editing: false,
      fields: [
        {
          id: 1,
          value: "e.g. Digigtal Flat [Bo] ",
          edit_value: "e.g. Digigtal Flat [Bo] ",
          label: "Company Name",
          type: "text",
        },
        {
          id: 2,
          value: "e.g. London SW1A 1AA ",
          edit_value: "e.g. London SW1A 1AA ",
          label: "Company Address",
          type: "text",
        },
        {
          id: 3,
          value: "Select Country",
          edit_value: "Select Country",
          label: "Director Residence",
          type: "dropdown",
          options: [
            { value: "USA", label: "USA" },
            { value: "Germany", label: "Germany" },
            { value: "Poland", label: "Poland" },
          ],
        },
        {
          id: 4,
          value: "+12 (345) 678 90 12",
          edit_value: "+12 (345) 678 90 12",
          label: "Phone Number",
          type: "text",
        },
      ],
    },
    businessInfo: {
      title: "Business Information",
      subtitle:
        "But each one takes a different approach and makes different tradeoffs.",
      editing: false,
      fields: [
        {
          id: 1,
          value: "e.g. London SW1A 1AA",
          edit_value: "e.g. London SW1A 1AA",
          label: "Address Approval",
          type: "text",
        },
        {
          id: 2,
          value: "Select Monthly Turnover",
          edit_value: "Select Monthly Turnover",
          label: "Monthly Turnover",
          type: "text",
        },
        {
          id: 3,
          value: [
            { id: 1, value: "germany", label: "Germany" },
            { id: 2, value: "poland", label: "Poland" },
            { id: 3, value: "usa", label: "USA" },
          ],
          edit_value: [
            { id: 1, value: "germany", label: "Germany" },
            { id: 2, value: "poland", label: "Poland" },
            { id: 3, value: "usa", label: "USA" },
          ],
          options: [
            { id: 1, value: "germany", label: "Germany" },
            { id: 2, value: "poland", label: "Poland" },
            { id: 3, value: "usa", label: "USA" },
          ],
          type: "multi",
          label: "Geo of Clients",
        },
      ],
    },
    advantages: [
      "Designed for businesses making high-value payments across borders",
      "Collect from and pay to <b>190+ countries</b>",
      "Open local IBANS in the UK, Netherlands, Germany, Denmark, Luxembourg, and the US",
      "Access <b>65+ currencies</b> at competitive rates",
      "Dedicated human support from your own Client Manager",
      "Joint signatories and multi-level team access",
    ],
  }),
  methods: {
    editCompany(name) {
      switch (name) {
        case "bankCompliance":
          this.bankCompilance.editing = true;
          break;
        case "companyInfo":
          this.companyInfo.editing = true;
          break;
        case "businessInfo":
          this.businessInfo.editing = true;
          break;
      }
    },
    cancelEditCompany(name) {
      switch (name) {
        case "bankCompliance":
          this.bankCompilance.fields = [...this.bankCompilance.fields].map(
            (field) => ({ ...field, value: field.edit_value })
          );
          this.bankCompilance.editing = false;
          break;
        case "companyInfo":
          this.companyInfo.fields = [...this.companyInfo.fields].map(
            (field) => ({ ...field, value: field.edit_value })
          );
          this.companyInfo.editing = false;
          break;
        case "businessInfo":
          this.businessInfo.fields = [...this.businessInfo.fields].map(
            (field) => ({ ...field, value: field.edit_value })
          );
          this.businessInfo.editing = false;
          break;
      }
    },
    saveCompany(name) {
      switch (name) {
        case "bankCompliance":
          this.bankCompilance.fields = [...this.bankCompilance.fields].map(
            (field) => ({ ...field, edit_value: field.value })
          );
          this.bankCompilance.editing = false;
          break;
        case "companyInfo":
          this.companyInfo.fields = [...this.companyInfo.fields].map(
            (field) => ({ ...field, edit_value: field.value })
          );
          this.companyInfo.editing = false;
          break;
        case "businessInfo":
          this.businessInfo.fields = [...this.businessInfo.fields].map(
            (field) => ({ ...field, edit_value: field.value })
          );
          this.businessInfo.editing = false;
          break;
      }
    },
    openModal() {
      this.showModal = true;
    },
    acceptModal() {
      this.showModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-company-profile {
  padding: 30px 15px 80px 15px;

  &__offer-btn {
    min-width: 285px;
  }

  &__header {
    border-radius: 24px;
    grid-template-columns: 1fr 390px;
    padding: 45px 80px 40px 65px;
    position: relative;
    align-items: center;
    column-gap: 20px;
    row-gap: 35px;
    margin-bottom: 85px;

    &-bg,
    &-bg-1,
    &-bg-2,
    &-bg-3 {
      border-radius: 24px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &-bg-1 {
      background: linear-gradient(180deg, #000 46.88%, #0b0b0b 100%);
      transform: rotate(-2.607deg);
      left: -30px;
    }

    &-bg-2 {
      border-radius: 24px;
      background: linear-gradient(
        135deg,
        #d2ecff 0%,
        #d6ecff 9.37%,
        #f5e8ff 100%
      );
      opacity: 0.1;
      box-shadow: 5px 6px 19px 0px rgba(62, 72, 118, 0.04);
    }

    &-bg-3 {
      background: linear-gradient(
        177deg,
        rgba(28, 49, 240, 0.5) 0%,
        rgba(20, 31, 129, 0.5) 34.14%,
        rgba(11, 11, 11, 0.5) 88.98%
      );
      backdrop-filter: blur(2.5px);
      overflow: hidden;
    }

    &-bg-line-2 {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='775' height='246' viewBox='0 0 775 246' fill='none'%3E%3Cpath d='M1.17578 239.5C27.8608 173.667 115.053 72.0001 225.709 120C364.029 180 352.186 377.5 435.557 259.5C518.928 141.5 585.246 -47.4999 773.777 13.0001' stroke='%233162FF' stroke-opacity='0.1' stroke-width='2'/%3E%3C/svg%3E");
      position: absolute;
      bottom: -15px;
      left: 50px;
      width: 66%;
      height: 82%;
      background-size: cover;
    }

    // &::after {
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   border-radius: 24px;
    // background: linear-gradient(
    //   177deg,
    //   rgba(28, 49, 240, 0.5) 0%,
    //   rgba(20, 31, 129, 0.5) 34.14%,
    //   rgba(11, 11, 11, 0.5) 88.98%
    // );
    // backdrop-filter: blur(2.5px);
    // }

    &-title {
      color: #fff;
      font-family: Montserrat;
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: 44px;
      text-transform: capitalize;
      position: relative;
      z-index: 1;
    }

    &-action {
      position: relative;
      z-index: 1;
    }

    &-btn {
      min-width: 235px;
    }
  }

  .compliance {
    position: relative;
    z-index: 1;
    grid-gap: 35px;
    grid-template-columns: calc(25% - 24px) calc(32% - 24px) 1fr;
    grid-column: 1 / 3;

    &__item {
      border-radius: 10px;
      padding: 12px;
      border: 1px solid var(--primary, #3749e9);
      grid-template-columns: 72px 1fr;
      grid-gap: 20px;
      align-items: center;
    }

    &__title {
      color: #fff;
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
      margin-bottom: 6px;
    }

    &__subtitle {
      color: #fff;
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    }

    &__icon {
      background: rgb(55 73 233 / 10%);
      border-radius: 10px;
      padding: 12px 24px;
    }
  }

  .section-title-wrapp {
    margin-bottom: 58px;
  }
}

.cp-info-block {
  margin-bottom: 80px;

  &__card {
    border-radius: 27px;
    background: #fff;
    box-shadow: 0px 24px 32px 0px rgba(50, 50, 71, 0.08),
      0px 16px 16px 0px rgba(50, 50, 71, 0.08);
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 120px;
    grid-gap: 20px;

    &-btn {
      padding: 11px 15px;
      border-radius: 15.273px;
    }

    &-field {
      input {
        border-radius: 24px;
        border: 1px solid #e5e5e5;
        color: #6d6d6d;
        font-family: Montserrat;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        padding: 11px 25px;
        width: 100%;
      }
    }

    &-title {
      color: #191820;
      font-family: Montserrat;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 18px;
      margin-bottom: 20px;
    }

    &-subtitle {
      color: #6d6d6d;
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
    }

    &-row {
      margin-bottom: 35px;
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;

      &-inner {
        border-radius: 24px;
        border: 1px solid #e5e5e5;
        padding: 6px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
    }

    &.editing {
      grid-template-columns: 1fr 250px;

      .cp-info-block__card-row {
        margin-bottom: 15px;
      }
    }

    &-tag {
      color: #565660;
      font-family: Montserrat;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px; /* 157.143% */
      text-transform: capitalize;
      border-radius: 21px;
      background: #cfebff;
      padding: 10px 15px;
    }
  }

  &__title {
    color: #191820;
    font-family: Montserrat;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px; /* 81.25% */
    text-transform: capitalize;
    margin-bottom: 20px;
  }

  &__text {
    color: #565660;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 30px;
  }

  &--last {
    margin-bottom: 50px;
  }
}

.btn-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
</style>
