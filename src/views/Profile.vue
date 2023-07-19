<template>
  <div class="profile">
    <div class="container">
      <div class="section-title-wrapp">
          <h2 class="page-details__title section-title">Profile</h2>
       </div>

      <div class="profile__content">
        <div class="profile__bio">
          <div class="profile__avatar avatar">
            <div class="avatar__img">
              <img src="/img/photo.jpg" alt="avatar">
            </div>
            <div class="avatar__actions">
              <button class="avatar__chenge-p btn btn-outline-primary">Change Picture</button>
              <div class="avatar__desc">
                  Vyvantage the file with your attachment.
                  The image can be enlarged by increasing the number of 184 by 184 pixels.
              </div>
            </div>
          </div>

          <div class="form-wrap">
            <form class="form" @submit="onSubmit">
              <div class="form__group input-group">
                  <label for="username">Username</label>
                  <InputText id="username" v-model="userName" aria-describedby="username-help" placeholder="Username"/>
              </div>

              <div class="form__group input-group">
                  <label for="email">Email</label>
                  <InputText id="email" v-model="email" aria-describedby="email-help" placeholder="yan@gmail.com"/>
              </div>

              <div class="form__group input-group">
                  <label for="phone">Phone Number</label>
                  <InputMask v-model="phone" date="phone" mask="(999) 999-9999" placeholder="(999) 999-9999" />
              </div>

              <div class="form__group input-group">
                  <label for="oldPassword">Old password</label>
                  <Password v-model="oldPassword"  inputId="oldPassword" toggleMask />
              </div>

              <div class="form__group input-group">
                  <label for="newPassword">New password</label>
                  <Password v-model="newPassword"  inputId="newPassword" toggleMask />
              </div>
            </form>
          </div>

          <div class="profile__btn-wrap">
            <button class="btn btn-secondary">Сancel</button>
            <button class="btn btn-primary">Update</button>
          </div>
        </div>
        <div class="profile__illustration">
          <img src="/img/illustration.png" alt="illustration">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
  data(){
    return {
      userName: '',
      email: '',
      phone: null,
      oldPassword: '',
      newPassword: '',
    }
  },

}
</script>

<style lang="scss" scoped>
.profile {
  padding: 30px 15px 80px 15px;

    &__content {
      display: flex;
      justify-content: space-between;
      gap:20px;
    }

    &__bio {
      flex: 1 1 auto;
    }

		// .profile__avatar
		&__avatar {

		}

		// .profile__illustration
		&__illustration {
      margin-top: 20px;
      margin-right: -15px;
      max-width: 428px;
      max-height: 648px;
      border-radius: 80px 0px 0px 70px;
      background: radial-gradient(56.10% 56.10% at 50.00% 43.90%, #01020D 0%, #1C31F0 80.22%, #3A4EFF 100%);
      padding-top: 68px;
      padding-left: 28px;
      padding-right: 28px;

      @media (max-width: 840px){
          display: none;
      }

      img {
        width: 100%;
        height: auto;

        @media (max-width: 1300px){
          transform: translateY(10%);
        }

        @media (max-width: 1080px){
          transform: translateY(25%);
        }
      }
		}

		// .profile__btn-wrap
		&__btn-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
		}
}

.avatar {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 26px;

    @media (max-width: 560px){
        flex-direction: column;
    }

    &__img {
      flex-shrink: 0;
      border-radius: 50%;
      width: 106px;
      height: 106px;
      overflow: hidden;
      position: relative;

      img {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

		// .avatar__actions
		&__actions {
      padding-top: 10px;
      @media (max-width: 560px) {
        text-align: center;
      }
		}

    &__chenge-p {
      margin-bottom: 10px;
    }

    &__desc {
      color: #555;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      max-width: 315px;
		}


}

.form-wrap {
  margin-bottom: 50px;
}

.form {

		// .form__group
		&__group {
		}
}

</style>
