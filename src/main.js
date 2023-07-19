import './assets/styles/main.scss'
import "../node_modules/noty/src/noty.scss";
import "../node_modules/noty/src/themes/mint.scss";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useMainStore } from './stores/main'
import axios from 'axios'
import cookies from 'js-cookie'
import noty from 'noty'
import UniversalSocialauth from 'universal-social-auth'
import ToastService from 'primevue/toastservice';

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import VueUploadComponent from 'vue-upload-component'

import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import MultiSelect from 'primevue/multiselect';
import AutoComplete from 'primevue/autocomplete';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';
import Tooltip from 'primevue/tooltip';
import Toast from 'primevue/toast';


window.axios = axios
window.Noty = noty

const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
});
app.use(pinia)

const options = {
  providers: {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI
    },
  }
}
const Oauth = new UniversalSocialauth(axios, options)
app.config.globalProperties.$Oauth = Oauth

const mainStore = useMainStore()

const token = cookies.get('x-access-token')
if (token) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + token
  mainStore.token = token;
}

app.component('file-upload', VueUploadComponent)
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Calendar', Calendar);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('MultiSelect', MultiSelect);
app.component('AutoComplete', AutoComplete);
app.component('InputMask', InputMask);
app.component('Password', Password);
app.component('Toast', Toast);

app.directive('tooltip', Tooltip);

router.beforeEach(async (to, from, next) => {
  window.scrollTo(0, 0)

  if (mainStore.token && !mainStore.user) {
    await mainStore.setUser()
    await mainStore.setContent()
  }

  setTimeout(() => {
    mainStore.appLoading = false
  }, 100);

  if (to.meta.requiresAuth && !mainStore.user) {
    return next({ name:'Login' });
  }

  return next();
});
app.use(router)
app.use(PerfectScrollbar, {
  options: {
    minScrollbarLength: 24
  }
})
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app')
