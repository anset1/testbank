<template>
  <div class="page-signup">
    <div class="container">
      <div class="box">
        <div class="box__title">Sign up</div>
        <div class="form">
          <div class="form__row form-title">
            <span class="form-title__text">Use daily base profile for fast communication</span>
          </div>
          <div
            v-for="(provider, index) in socialAuth.providers" :key="index"
            class="form__row form-item"
            :class="[
              `-${provider}`,
              { '-load': socialAuth.load }
            ]"
            @click="useAuthProvider(provider)"
          >
            <component :is='`${provider}-icon`' class="form-item__icon"></component>
            <span v-if="socialAuth.load == provider">Loading...</span>
            <span v-else>{{ provider }}</span>
          </div>
          <div class="form__row form-title my-8">
            <span class="form-title__text">or sign up with E-mail</span>
          </div>
          <div class="form-main">
            <div class="form__row input-group">
              <input class="form-control" id="email" type="text" v-model="email" placeholder="E-mail">
              <span class="invalid-feedback" v-if="emailError.length > 0">{{ emailError }}</span>
            </div>
            <div class="form__row input-group">
              <input class="form-control" id="password" type="password" v-model="password" placeholder="Password">
              <span class="invalid-feedback" v-if="passwordError.length > 0">{{ passwordError }}</span>
            </div>
            <div class="form__row input-group">
              <input class="form-control" id="passwordConfirmation" type="password" v-model="passwordConfirmation" placeholder="Password confirmation">
              <span class="invalid-feedback" v-if="passwordConfirmationError.length > 0">{{ passwordConfirmationError }}</span>
            </div>
            <div class="form__row input-group -checkbox" :class="{ '-not-valid': isNotAgree }">
              <input type="checkbox" name="agree" id="agree" v-model="agree">
              <label for="agree">I agree to the terms and services</label>
            </div>
            <button v-if="!load" class="btn -signup" @click.prevent="signup">Sign Up</button>
            <div v-else class="load">
              Loading...
            </div>
          </div>
          <div class="form__row signin">
            Do you already have an account? <RouterLink :to="{ name: 'Login' }" class="link -signin">Sing in</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia'
import { useMainStore } from '@/stores/main'

import { Providers } from 'universal-social-auth'

import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import AppleIcon from '@/components/icons/AppleIcon.vue'

export default {
  name: "SignUp",
  components: {
    GoogleIcon,
    LinkedinIcon,
    AppleIcon,
  },
  data() {
    return {
      load: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      emailError: '',
      passwordError: '',
      passwordConfirmationError: '',
      agree: false,
      twoFactorOnLogin: false,
      socialAuth: {
        providers: ['google', 'linkedin', 'apple'],
        code: null,
        provider: null,
        load: null,
      },
      isNotAgree: false,
    }
  },
  computed: {
    ...mapWritableState(useMainStore, ['token']),
  },
  watch: {
    agree: function (nv) {
      if (nv) this.isNotAgree = false
    },
  },
  methods: {
    ...mapActions(useMainStore, ['setToken', 'setUser', 'setContent']),
    resetErrors() {
      this.emailError = ''
      this.passwordError = ''
      this.passwordConfirmationError = ''
      this.isNotAgree = false
    },
    async useSocialLogin() {
      const pdata = {
        code: this.socialAuth.code,
      }
      await axios
        .post(import.meta.env.VITE_APP_BACKEND_API_URL + 'auth/social-login/' + this.socialAuth.provider, pdata)
        .then(async (response) => {
          if (response.data.status === 445) {
            console.error(response.data.message)
          }

          if (response.data.token && response.data.expiresIn) {
            await this.setToken(response.data.token, response.data.expiresIn)
          } else {
            this.emailError = 'Error. Something went wrong'
          }
        }).catch(err => {
          console.log(err)
        })

      if (this.token) {
        await this.setUser()
        await this.setContent()
        this.$router.replace({ name: "MyCompanies" })
      }
    },
    useAuthProvider(provider) {
      if (this.socialAuth.load) {
        return false
      }

      this.socialAuth.load = provider
      this.$Oauth.authenticate(provider, Providers[provider])
        .then((response) => {
          if (response.code) {
            this.socialAuth.code = response.code
            this.socialAuth.provider = provider
            this.useSocialLogin()
          }
        }).catch(err => {
          console.log(err)
        })
    },
    async signup() {
      this.resetErrors()

      if (!this.email) {
        this.emailError = 'Please enter a valid email!'
        return false
      }
      if (!this.password || this.password.length < 7) {
        this.passwordError = 'The password must contain at least 8 characters!'
        return false
      }
      if (!this.passwordConfirmation || this.passwordConfirmation !== this.password) {
        this.passwordConfirmationError = 'Password mismatch!'
        return false
      }
      if (!this.agree) {
        this.isNotAgree = true
        return false
      }

      this.load = true
      await axios.post(import.meta.env.VITE_APP_BACKEND_API_URL + 'auth/register', {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        })
        .then(response => {
          if (response.data.token && response.data.expiresIn) {
            this.setToken(response.data.token, response.data.expiresIn)
          } else {
            this.emailError = 'Error. Something went wrong'
          }
        })
        .catch(error => {
          if (error.response?.data?.errors) {
            for (let key in error.response.data.errors) {
              if (key === 'email' && error.response.data.errors[key][0]) {
                this.emailError = error.response.data.errors[key][0]
              } else if (key === 'password' && error.response.data.errors[key][0]) {
                this.passwordError = error.response.data.errors[key][0]
              }
            }
          }
        })

      if (this.token) {
        await this.setUser()
        await this.setContent()
        this.$router.replace({ name: "MyCompanies" })
      }

      this.load = false
    },
    goToForgotPassword () {
      this.$router.push({ name: 'ForgotPassword' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-signup {
  .box {
    &__title {
      margin: .75rem auto;
      padding: .5rem 1rem;
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 44px;
      text-transform: capitalize;
      text-align: center;
      color: var(--c_primary-dark);
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &__row {
      min-width: 480px;
      margin-left: 1rem;
      margin-right: 1rem;
    }

    &-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-color: #E5E5E5;
      }

      &__text {
        text-align: center;
        padding: .5rem 1rem;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: var(--c_primary-dark);
        background-color: var(--c_white);
        z-index: 1;
      }
    }

    &-item {
      position: relative;
      width: 50%;
      height: 54px;
      min-height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: .75rem auto .25rem;
      padding: 1rem 1.25rem;
      font-weight: 500;
      font-size: 18px;
      line-height: 18px;
      color: #1C1C24;
      text-transform: capitalize;
      background: rgba(55, 73, 233, 0.1);
      border-radius: 10rem;
      cursor: pointer;

      &__icon {
        width: 24px;
        height: 24px;
        margin-right: 1.25rem;
      }

      span {
        margin-top: 2px;
      }

      &.-load {
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(32, 32, 32, .25);
          border-radius: 10rem;
          cursor: wait;
          z-index: 9;
        }
      }
    }

    &-main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      gap: 20px;

      .input-group {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        label {
          color: var(--c_grey-medium);
          font-size: 16px;
          line-height: 140%;
          letter-spacing: 0.03em;
          padding-bottom: .25rem;
        }

        .form-control {
          width: 100%;
          min-width: 100%;
          height: 54px;
          min-height: 54px;
          padding: 1rem 1.25rem;
          border: 1px solid #E5E5E5;
          border-radius: 10rem;
        }

        .invalid-feedback {
          padding-top: 2px;
          color: var(--c_danger);
        }

        &.-checkbox {
          flex-direction: row;
          align-items: center;

          label {
            color: var(--c_black);
            padding: 0 0 0 .5rem;
          }
        }

        &.-not-valid {
          label {
            color: var(--c_danger);
          }
        }
      }
    }
  }

  .signin {
    margin: 2.5rem 1rem 1.5rem;
    font-weight: 500;
    font-size: 18px;
    line-height: 18px;
  }

  .btn {
    &.-signup {
      width: 100%;
      min-width: 100%;
      height: 52px;
      min-height: 52px;
      padding: 17px 24px;
      color: var(--c_white);
      font-size: 18px;
      font-weight: 500;
      line-height: 18px;
      background-color: var(--c_primary);
      border-radius: 10rem;
    }
  }

  .link {
    &.-signin {
      color: var(--c_primary);
      padding-left: .25rem;
    }
  }
}
</style>
