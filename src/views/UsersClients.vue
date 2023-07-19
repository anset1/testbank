<template>
  <div class="page-clients">
    <div class="container">
      <div class="section-title-wrapp">
        <h2 class="page-details__title section-title">Clients</h2>
      </div>

      <div class="select-token-container">
        <div
          v-for="item in selectedCities"
          :key="item.code"
          class="select-token"
        >
          <span>{{ item.name }}</span>
          <button @click="removeToken(item.code)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M0.875 11.6875L0 10.8125L4.8125 6L0 1.1875L0.875 0.3125L5.6875 5.125L10.5 0.3125L11.375 1.1875L6.5625 6L11.375 10.8125L10.5 11.6875L5.6875 6.875L0.875 11.6875Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
        <button
          v-if="selectedCities?.length"
          class="btn-token-clear"
          @click="deleteTokens"
        >
          Delete
        </button>
      </div>

      <div class="page-clients__filters">
        <div class="page-clients__select">
          <MultiSelect
            v-model="selectedCities"
            :options="cities"
            optionLabel="name"
            placeholder="Company name"
            :maxSelectedLabels="3"
            class="w-full md:w-20rem"
          />
        </div>
        <div class="page-clients__search">
          <div class="p-inputgroup flex-1">
            <span class="p-inputgroup-addon">
              <SearchIcon />
            </span>
            <AutoComplete
              v-model="value"
              :suggestions="items"
              @complete="search"
            />
          </div>
        </div>
      </div>

      <div class="page-clients__table-wrap main-table">
        <DataTable
          v-model:selection="selectedProduct"
          v-model:editingRows="editingRows"
          :value="products"
          dataKey="id"
          editMode="row"
          @row-edit-save="onRowEditSave"
          tableClass="page-clients__table"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column field="code" header="Company name" sortable>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px;" />
            </template>
          </Column>
          <Column field="name" header="Industry" sortable>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px;" />
            </template>
          </Column>
          <Column field="category" header="UBO Resedental" sortable>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px;" />
            </template>
          </Column>
          <Column field="quantity" header="Country of incorporation" sortable>
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px;" />
            </template>
          </Column>
          <Column field="price" header="Monthly Turnover" sortable>
            <template #body="{ data, field }">
              {{ formatCurrency(data[field]) }}
            </template>
            <template #editor="{ data, field }">
              <InputNumber
                v-model="data[field]"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </template>
            <template #sorticon>
              <ArrowsIcon style="margin-left: 6px;" />
            </template>
          </Column>
          <Column
            header=""
            bodyClass="background-tr"
            style="width: 60px"
            bodyStyle="text-align:center"
          >
            <template #body>
              <button>
                <DownloadIcon />
              </button>
            </template>
          </Column>
          <Column
            :rowEditor="true"
            style="width: 60px"
            bodyStyle="text-align:center"
          >
            <template #roweditoriniticon>
              <EditIcon />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductService } from "@/service/ProductService";
import EditIcon from "@/components/icons/EditIcon.vue";
import ArrowsIcon from "@/components/icons/ArrowsIcon.vue";
import DownloadIcon from "@/components/icons/DownloadIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";

export default {
  name: "UsersClients",
  components: {
    EditIcon,
    ArrowsIcon,
    DownloadIcon,
    SearchIcon,
  },
  data() {
    return {
      products: null,
      selectedProduct: null,
      metaKey: true,
      editingRows: [],
      selectedCities: null,
      cities: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],
      value: "",
      items: [],
    };
  },
  mounted() {
    ProductService.getProductsMini().then((data) => (this.products = data));
  },
  methods: {
    onRowEditSave(event) {
      let { newData, index } = event;

      this.products[index] = newData;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
    search(event) {
      this.items = [...Array(10).keys()].map(
        (item) => event.query + "-" + item
      );
    },
    deleteTokens() {
      if (this.selectedCities.length) {
        this.selectedCities = [];
      }
    },
    removeToken(code) {
      this.selectedCities = this.selectedCities.filter(
        (item) => item.code !== code
      );
    },
  },
};
</script>

<style lang="scss">
.page-clients {
  padding: 30px 15px 80px 15px;
  margin-bottom: 80px;

  &__filters {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    @media (max-width: 540px) {
      flex-wrap: wrap;
    }
  }

  &__select {
    max-width: 194px;
  }

  &__search {
    max-width: 194px;
  }

  &__table-wrap {
  }

  &__table {
    .p-datatable-thead {
      background: linear-gradient(153deg, #0b1999 0%, #861cf0 100%);
    }

    .p-datatable-tbody {
      position: relative;
      z-index: 2;
    }

    .p-datatable-tbody::after {
      position: absolute;
      content: "";
      top: -1px;
      right: 0;
      bottom: 0;
      width: 130px;
      background: linear-gradient(191deg, #821ded 0%, #431bc1 100%);
      z-index: 1;
    }
  }
}

.p-datatable .p-datatable-tbody > tr > td:last-child {
  position: relative;
  background: transparent;
  z-index: 3;
  padding-left: 8px;

  &::before {
    width: 0px !important;
  }
}

.background-tr {
  position: relative;
  background: transparent;
  z-index: 3;
  padding-right: 8px;
}

.p-datatable .p-datatable-tbody > tr > td .p-row-toggler,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-init,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-save,
.p-datatable .p-datatable-tbody > tr > td .p-row-editor-cancel {
  width: 36px;
  height: 36px;
}

.p-inputgroup-addon:last-child,
.p-inputgroup button:last-child,
.p-inputgroup input:last-child,
.p-inputgroup > .p-inputwrapper:last-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-inputtext {
  border-top-right-radius: 36px;
  border-bottom-right-radius: 36px;
}

.p-inputgroup-addon:first-child,
.p-inputgroup button:first-child,
.p-inputgroup input:first-child,
.p-inputgroup > .p-inputwrapper:first-child,
.p-inputgroup > .p-inputwrapper:first-child > .p-inputtext {
  border-top-left-radius: 36px;
  border-bottom-left-radius: 36px;
}

.p-inputgroup-addon {
  background: var(--c_white);
  border-top: 1px solid #5e5e5e;
  border-left: 1px solid #5e5e5e;
  border-bottom: 1px solid #5e5e5e;

  svg path {
    stroke: #5e5e5e !important;
  }
}

.p-inputtext {
  color: var(--c_black);
  background: var(--c_white);
  border: 1px solid #5e5e5e;
  border-left: none;
}

.p-multiselect {
  border: 1px solid #5e5e5e;
  border-radius: 36px;
  width: 194px;
}

.select-token-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 10px;
  min-height: 50px;
}

.select-token {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 30px;
  background: #cfebff;

  color: var(--c_black);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
}

.btn-token-clear {
  color: #2e0ef6;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  text-decoration-line: underline;
}
</style>
