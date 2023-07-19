import { defineStore } from 'pinia'
import cookies from 'js-cookie'

export const useMainStore = defineStore('main', {
  state: () => ({
    appLoading: true,
    token: null,
    user: null,
    content: {},
    twoFactorOnLogin: false,
    countries: null,
    industries: null,
    myCompanies: null,
  }),
  getters: {
    api: (state) => {
      return state.token
        ? axios.create({ headers: { 'Authorization' : `Bearer ${state.token}` } })
        : axios
    },
  },
  actions: {
    setToken(token, expiresIn) {
  	  axios.defaults.headers.common.Authorization = 'Bearer ' + token
      const expiryTime = new Date(new Date().getTime() + expiresIn * 1000)
      cookies.set('x-access-token', token, { expires: expiryTime })
	    this.token = token
	  },
    async setUser() {
      const userData = await this.api
        .get(import.meta.env.VITE_APP_BACKEND_API_URL + 'auth/me')
        .catch(errors => {
          console.dir(errors)
          this.logout()
        })
      this.user = userData.data
    },
    async setContent() {
      const contentData = await this.api
        .get(import.meta.env.VITE_APP_BACKEND_API_URL + 'content')
        .catch(errors => {
          console.dir(errors)
          this.logout()
        })
      this.content = contentData.data
    },
    setTwoFactorOnLogin(twoFactorOnLogin) {
      cookies.set('2fa-required', twoFactorOnLogin)
      this.twoFactorOnLogin = twoFactorOnLogin
    },
    removeTwoFactorOnLogin() {
      cookies.remove('2fa-required')
      this.twoFactorOnLogin = false
    },
    logout() {
      axios.defaults.headers.common.Authorization = ''
      cookies.remove('x-access-token')
      this.token = null
      this.user = null
      this.content = {}
      this.$router.replace({ name: "Login" })
    },
    async setCountries() {
      if (this.countries) return

      const { data } = await this.api
        .get(import.meta.env.VITE_APP_BACKEND_API_URL + 'data/countries')
        .catch(errors => console.dir(errors))
      this.countries = data
    },
    async setIndustries() {
      if (this.industries) return

      const { data } = await this.api
        .get(import.meta.env.VITE_APP_BACKEND_API_URL + 'data/industries')
        .catch(errors => console.dir(errors))
      this.industries = data
    },
    async setMyCompanies() {
      const { data } = await this.api
        .get(import.meta.env.VITE_APP_BACKEND_API_URL + 'user-company/my-companies')
        .catch(errors => console.dir(errors))
      this.myCompanies = data
    },
  },
})
