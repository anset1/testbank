<template>
  <div class="page-login">
    <div class="container">
      <div class="box">
        <div class="box__title">Sign in your account</div>
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
          <!-- <div
            class="form__row form-item -linkedin"
            :class="{ '-load': socialAuth.load }"
            @click="useAuthProvider('linkedin')"
          >
            <LinkedinIcon class="form-item__icon"/>
            <span v-if="socialAuth.load == 'linkedin'">Loading...</span>
            <span v-else>Continue with Linkedin</span>
          </div>
          <div
            class="form__row form-item -apple"
            :class="{ '-load': socialAuth.load }"
            @click="useAuthProvider('apple')"
          >
            <AppleIcon class="form-item__icon"/>
            <span v-if="socialAuth.load == 'apple'">Loading...</span>
            <span v-else>Continue with Apple</span>
          </div> -->
          <div class="form__row form-title my-8">
            <span class="form-title__text">or login with E-mail</span>
          </div>
          <div class="form-main">
            <div class="form__row input-group">
              <!-- <label for="email">Email</label> -->
              <input class="form-control" id="email" type="text" v-model="email" placeholder="E-mail">
              <span class="invalid-feedback" v-if="emailError.length > 0">{{ emailError }}</span>
            </div>
            <div class="form__row input-group">
              <!-- <label for="password">Password</label> -->
              <input class="form-control" id="password" :type="passwordType" v-model="password" placeholder="Password">
              <EyeSlashIcon class="btn -pass-type-change" @click="passwordTypeToggle()"/>
              <span class="invalid-feedback" v-if="passwordError.length > 0">{{ passwordError }}</span>
            </div>
            <div class="form__row input-group -checkbox">
              <input type="checkbox" name="remember" id="remember">
              <label for="remember">Remember me</label>
            </div>
            <button v-if="!load" class="btn -signin" @click.prevent="login">Login</button>
            <div v-else class="load">
              Loading...
            </div>
          </div>
          <div class="form__row signup">
            Don’t have an account? <RouterLink :to="{ name: 'Sign Up' }" class="link -signup">Sign up</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- <form class="box" id="form">
      <div class="input-group">
        <label>Email</label>
        <input class="form-control" type="text" v-model="email">
        <span class="invalid-feedback" v-if="emailError.length > 0">{{ emailError }}</span>
      </div>
      <div class="input-group">
        <label>Password</label>
        <input class="form-control" type="password" v-model="password">
        <span class="invalid-feedback" v-if="passwordError.length > 0">{{ passwordError }}</span>
      </div>
      <button v-if="!load" class="btn submit" @click.prevent="login">Login</button>
      <a v-if="!load" class="forgot-password" @click.prevent="goToForgotPassword">Forgot password?</a>
      <div v-else class="load">
        Loading...
      </div>
    </form> -->
  </div>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia'
import { useMainStore } from '@/stores/main'

import { Providers } from 'universal-social-auth'

import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import AppleIcon from '@/components/icons/AppleIcon.vue'
import EyeSlashIcon from '@/components/icons/EyeSlashIcon.vue'

export default {
  name: "Login",
  components: {
    GoogleIcon,
    LinkedinIcon,
    AppleIcon,
    EyeSlashIcon,
  },
  data() {
    return {
      load: false,
      email: '',
      password: '',
      passwordType: 'password',
      emailError: '',
      passwordError: '',
      twoFactorOnLogin: false,
      socialAuth: {
        providers: ['google', 'linkedin', 'apple'],
        code: null,
        provider: null,
        load: null,
      },
    }
  },
  computed: {
    ...mapWritableState(useMainStore, ['token', 'api']),
    getLandingUrl () {
      return import.meta.env.VITE_APP_LANDING_URL
    }
  },
  methods: {
    ...mapActions(useMainStore, ['setToken', 'setUser', 'setContent', 'setTwoFactorOnLogin', 'removeTwoFactorOnLogin']),
    passwordTypeToggle() {
      this.passwordType = this.passwordType == 'password' ? 'text' : 'password'
    },
    async get2faSettings () {
      await this.api
        .get(import.meta.env.VITE_APP_BACKEND_API_URL + 'settings/customer-two-factor-on-login')
        .then(({ data }) => {
          this.twoFactorOnLogin = (+data.customer_two_factor_on_login) ? true : false;
          const twoFactorOnLogin = this.twoFactorOnLogin
          this.setTwoFactorOnLogin(twoFactorOnLogin)

          if (twoFactorOnLogin && data.code_is_not_empty) {
            new Noty({
              type: 'success',
              text: 'Please, check your email - we send you two factor code.',
            }).show();
            this.$router.replace({ name: "LoginCode" })
          } else {
            this.removeTwoFactorOnLogin()
            this.$router.replace({ name: "MyCompanies" })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    async login() {
      this.load = true
      await axios
        .post(import.meta.env.VITE_APP_BACKEND_API_URL + 'auth/login', {
          email: this.email,
          password: this.password,
        })
        .then(response => {
          if (response.data.error) {
            for (let key in response.data.errors) {
              if (key === 'email' && response.data.errors[key][0]) {
                this.emailError = response.data.errors[key][0]
              } else if (key === 'password' && response.data.errors[key][0]) {
                this.passwordError = response.data.errors[key][0]
              }
            }
            return
          }

          if (response.data.token && response.data.expiresIn) {
            this.setToken(response.data.token, response.data.expiresIn)
          } else {
            this.emailError = 'Error. Something went wrong'
          }
        })
        .catch(function (error) {
          this.emailError = 'Error. Something went wrong'
          console.log(error);
        })

      if (this.token) {
        await this.setUser()
        await this.setContent()
        await this.get2faSettings()
      }

      this.load = false
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
        await this.get2faSettings()
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
    goToForgotPassword () {
      this.$router.push({ name: 'ForgotPassword' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-login {
  .box {
    // width: 92%;
    // margin: 2% 4%;
    // padding: 1.25rem 1.5rem;

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
      // letter-spacing: 0.02em;
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
      // border: 3px solid var(--c_grey);
      // border-radius: 6px;
      cursor: pointer;

      &__icon {
        width: 24px;
        height: 24px;
        margin-right: 1.25rem;
      }

      span {
        margin-top: 2px;
      }

      // &.-linkedin {
      //   color: var(--c_white);
      //   background-color: var(--c_primary);
      //   border: 3px solid var(--c_primary);
      // }

      // &.-apple {
      //   color: var(--c_white);
      //   background-color: var(--c_black);
      //   border: 3px solid var(--c_black);
      // }

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
      // width: 50%;
      // min-width: 320px;
      // margin: .5rem auto;

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

        .btn {
          &.-pass-type-change {
            width: 1.25rem;
            height: 1.25rem;
            position: absolute;
            top: 27px;
            right: 32px;
            transform: translateY(-50%);
          }
        }

        &.-checkbox {
          flex-direction: row;
          align-items: center;

          label {
            color: var(--c_black);
            padding: 0 0 0 .5rem;
          }
        }
      }
    }
  }

  .signup {
    margin: 2.5rem 1rem 1.5rem;
    font-weight: 500;
    font-size: 18px;
    line-height: 18px;
  }

  .btn {
    &.-signin {
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
    &.-signup {
      color: var(--c_primary);
      padding-left: .25rem;
    }
  }
}
</style>
