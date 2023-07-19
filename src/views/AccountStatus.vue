<template>
    <div class="page-accountStatus">

      <div class="container">
        <div data-v-4b5f91f1="" class="section-title-wrapp"><h2 data-v-4b5f91f1="" class="page-details__title section-title">Accounts Status</h2></div>
        <div class="main-table">
          <DataTable :value="accountData" dataKey="id">
            <Column 
              field="data" header="Everyfin" >
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
              <template #sorticon>
                <ArrowsIcon style="margin-left: 6px" />
              </template>
            </Column>
            <Column
              field="type"
              header="Account type"
              
            >
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
              <template #sorticon>
                <ArrowsIcon style="margin-left: 6px" />
              </template>
            </Column>
            <Column
              field="name"
              header="UBO"
              
            >
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
              <template #sorticon>
                <ArrowsIcon style="margin-left: 6px" />
              </template>
            </Column>
            <Column
              field="status"
              header="status"
            >
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
              <template #sorticon>
                <ArrowsIcon style="margin-left: 6px" />
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="main-table">
          <DataTable :value="accountData" dataKey="id">
            <Column 
              field="data" header="Guavapay" >
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
              <template #sorticon>
                <ArrowsIcon style="margin-left: 6px" />
              </template>
            </Column>
            <Column
              field="type"
              header="Account type"
              
            >
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
              <template #sorticon>
                <ArrowsIcon style="margin-left: 6px" />
              </template>
            </Column>
            <Column
              field="name"
              header="UBO"
              
            >
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
              <template #sorticon>
                <ArrowsIcon style="margin-left: 6px" />
              </template>
            </Column>
            <Column
              field="status"
              header="Status"
            >
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
              </template>
              <template #sorticon>
                <ArrowsIcon style="margin-left: 6px" />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    
    </div>
  </template>
  
  <script>
  import { accountStatus } from "@/service/accountStatus/accountStatus.js";
    export default {
    name: "accountStatus",
    components:{
      
    },
  
    data() {
      return {
        accountData: null,
        showModal: false,
      };
    },
    mounted() {
      accountStatus.getAccountStatusMini().then((data) => (this.accountData = data));
    },
    methods: {
    },
  };
  </script>
  
  <style lang="scss" scoped>
.page-accountStatus  {
  background: url('/img/accountstatus-bg.png');
}
.main-table {
  margin-top: 34px;
}
  </style>
  