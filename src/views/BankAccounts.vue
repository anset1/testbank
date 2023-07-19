<template>
  <div class="page-bank-accounts">
    <div class="container">
      <div class="section-title-wrapp">
        <h2 class="page-details__title section-title">Bank Accounts</h2>
      </div>

      <div class="bank-accounts-actions">
        <div class="bank-accounts-actions__dropdown">
          <MultiSelect
            v-model="selectedCompanies"
            :options="bankNames"
            placeholder="Company name"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
            :pt="{
              root: () => ({
                class: 'bank-accounts-actions__select'
              }),
              panel: () => ({
                class: 'bank-accounts-actions__panel'
              }),
              header: () => ({
                class: 'bank-accounts-actions__header',
              }),
              item: () => ({
                class: 'bank-accounts-actions__item',
              }),
            }"
          >
            <template #header>
              <span></span>
            </template>
          </MultiSelect>
        </div>
        <div class="bank-accounts-actions__button btn btn--main">
          CHECK INVOICE <small>coming soon</small>
        </div>
      </div>
      <div class="page-bank-accounts__table-wrap main-table">
        <DataTable
          v-model:selection="selectedBankAccounts"
          :value="accounts"
          dataKey="id"
          editMode="row"
          tableClass="bank-accounts-table"
        >
          <Column field="name" header="Bank name" sortable>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column field="country" header="Country" sortable>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column field="type_of_account" header="Type of account" sortable>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column
            field="transaction_history"
            header="Transaction history"
            sortable
          >
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column field="balance" header="Balance" sortable>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px" />
            </template>
          </Column>
          <Column
            field="payment"
            header=""
            style="
              width: 185px;
              position: relative;
              height: 64px;
              text-align: center;
            "
          >
            <template #body="{ data, field }">
              <div class="bank-accounts-table__data">
                {{ data[field] }}
              </div>
              <div class="bank-accounts-table__button btn btn--main btn--sm">
                Make a payment
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowsIcon from "@/components/icons/ArrowsIcon.vue";

export default {
  name: "BankAccounts",
  components: {
    ArrowsIcon,
  },
  data: () => ({
    accounts: [
      {
        id: 1,
        name: "Guavapay",
        country: "Uk",
        type_of_account: "SWIFT / SEPA",
        transaction_history: "$0.00",
        balance: "$0.00",
        payment: "$0.00",
      },
      {
        id: 2,
        name: "Bank Gillette",
        country: "Haiti",
        type_of_account: "SWIFT",
        transaction_history: "$0.00",
        balance: "100 000$",
        payment: "$0.00",
      },
      {
        id: 3,
        name: "Johnson Bank",
        country: "Iceland",
        type_of_account: "NOTSWIFT",
        transaction_history: "$0.00",
        balance: "1 000$",
        payment: "$0.00",
      },
      {
        id: 4,
        name: "Sonyc Bank",
        country: "Saint Barthélemy",
        type_of_account: "NOTSWIFT",
        transaction_history: "$0.00",
        balance: "1 000$",
        payment: "$0.00",
      },
      {
        id: 5,
        name: "The Walt Disney Bank",
        country: "Viet Nam",
        type_of_account: "SWIFT",
        transaction_history: "$0.00",
        balance: "1 000$",
        payment: "$0.00",
      },
      {
        id: 6,
        name: "The Great Bank",
        country: "Saudi Arabia",
        type_of_account: "SWIFT",
        transaction_history: "$0.00",
        balance: "1 000$",
        payment: "$0.00",
      },
      {
        id: 7,
        name: "Louis Vuitton Bank",
        country: "Saint Vincent and the Grenadines",
        type_of_account: "SWIFT",
        transaction_history: "$0.00",
        balance: "1 000$",
        payment: "$0.00",
      },
      {
        id: 8,
        name: "Apple Bank",
        country: "Algeria",
        type_of_account: "SWIFT",
        transaction_history: "$0.00",
        balance: "155 000$",
        payment: "$0.00",
      },
      {
        id: 9,
        name: "Master Bank",
        country: "Brazil",
        type_of_account: "SWIFT",
        transaction_history: "$0.00",
        balance: "1 000$",
        payment: "$0.00",
      },
      {
        id: 10,
        name: "Mitsubishi Bank",
        country: "Sao Tome and Principe",
        type_of_account: "SWIFT",
        transaction_history: "$0.00",
        balance: "1 000$",
        payment: "$0.00",
      },
    ],
    selectedCompanies: null,
  }),
  computed: {
    bankNames() {
      return [...this.accounts].map((account) => account.name);
    },
    selectedBankAccounts() {
      if (!this.selectedCompanies) return [];
      return [...this.accounts].filter((acc) =>
        this.selectedCompanies.includes(acc.name)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.page-bank-accounts {
  padding: 30px 15px 80px 15px;
  background-image: url("/img/page-background.svg");
  background-repeat: no-repeat;
  background-position: top right;
  background-size: cover;

  .bank-accounts-table {
    &__button {
      display: inline-block;
      position: absolute;
      top: 1rem;
      left: 1rem;
      opacity: 0;
      visibility: hidden;
    }

    tr {
      &:hover {
        .bank-accounts-table__button {
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
}

.bank-accounts-actions {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;

  &__dropdown {
    width: 256px;
    max-width: 100%;
  }

  &__button {
    max-width: 200px;
    padding: 10px 20px;
  }
}
</style>
