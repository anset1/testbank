<template>
  <div class="page-bank">
    <div class="container">
      <div data-v-4b5f91f1="" class="section-title-wrapp">
        <h2 data-v-4b5f91f1="" class="page-details__title section-title">
          Banks Sugestions
        </h2>
      </div>
      <div class="toolbar">
        <div class="toolbar-column">
          <div class="dropdown" @click="toggleDropdown">
            <p class="toolbar-column-title">Industry</p>
            <p class="arrow-icon">{{ selectedOption || "Any" }}</p>
            <span v-if="showDropdown">&#9660;</span>
            <span v-else>&#9650;</span>
          </div>
          <div v-if="showDropdown" class="dropdown-list">
            <div
              class="dropdown-option"
              v-for="option in options"
              :key="option"
              @click="handleSelectChange(option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
        <div class="toolbar-column">
          <p class="toolbar-column-title color-black">I need:</p>
          <p>Bank account</p>
          <div class="checkbox-wrapper-34">
            <input class="tgl tgl-ios" id="toggle-34" type="checkbox" />
            <label class="tgl-btn" for="toggle-34"></label>
          </div>
        </div>
        <div class="toolbar-column">
          <p class="toolbar-column-title">Acquiring</p>
          <div class="checkbox-wrapper-34">
            <input class="tgl tgl-ios" id="toggle-35" type="checkbox" />
            <label class="tgl-btn" for="toggle-35"></label>
          </div>
        </div>
        <div class="toolbar-column">
          <p class="toolbar-column-title">E-wallet</p>
          <div class="checkbox-wrapper-34">
            <input class="tgl tgl-ios" id="toggle-36" type="checkbox" />
            <label class="tgl-btn" for="toggle-36"></label>
          </div>
        </div>
      </div>

      <div class="page-bank__content">
        <div class="card">
          <div class="card__header">
            <div>
              <h3>
                The Bank <br />of New<br />
                York
              </h3>
              <p>New York, US</p>
            </div>
            <div>
              <p class="price">35</p>
            </div>
          </div>
          <div class="card__body">
            <div class="card__check">
              <div class="card__description">
                Best suited for
              </div>
              <div class="card_btn">
                <button>Check your Bank</button>
              </div>
            </div>
            <div class="card__banner">
              <div class="card__banner--title">Services</div>
              <div class="card__banner--txt">
                <p>Bank Account</p>
                <p>Bank Cards</p>
                <p>Digital Equiring</p>
              </div>
            </div>
            <div class="card__review">
              <p class="card__review--title">Customers review</p>
              <div class="card__review_img">
                <img src="/img/star.svg" alt="" >
              </div>
              <p class="card__review--description">
                Redwood Bank was launched in August 2017 to offer a real
                alternative for small and medium sized
              </p>
            </div>
            <div class="card__btn_wrap">
              <button class="btn-primary">Get Account</button>
              <button>More details</button>
              <p class="card__btn_wrap--txt">OTHER BANKS</p>
              <button class="btn-primary">Get All</button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card__header">
            <div >
              <h3 class="fz-32">
                The Bank <br />of New<br />
                York
              </h3>
              <p class="fz-16">New York, US</p>
            </div>
            <div>
              <p class="price fz-53">35</p>
            </div>
          </div>
          <div class="card__body">
            <div class="card__check">
              <div
                class="card__description fz-18"
              >
                Best suited for
              </div>
              <div class="card_btn">
                <button class="fz-10">Check your Bank</button>
              </div>
            </div>
            <div class="card__banner">
              <div class="card__banner--title fz-20">Services</div>
              <div class="card__banner--txt fz-14">
                <p>Bank Account</p>
                <p>Bank Cards</p>
                <p>Digital Equiring</p>
              </div>
            </div>
            <div class="card__review">
              <p class="card__review--title fz-20">Customers review</p>
              <div class="review_img">
                <img src="/img/star.svg" alt="" />
              </div>
              <p class="card__review--description fz-14">
                Redwood Bank was launched in August 2017 to offer a real
                alternative for small and medium sized
              </p>
            </div>
            <div class="card__btn_wrap">
              <button class="btn-primary fz-18">Get Account</button>
              <button class="fz-18">More details</button>
              <p class="card__btn_wrap--txt fz-14">OTHER BANKS</p>
              <button class="btn-primary fz-16">Get All</button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card__header">
            <div>
              <h3>
                The Bank <br />of New<br />
                York
              </h3>
              <p>New York, US</p>
            </div>
            <div>
              <p class="price">35</p>
            </div>
          </div>
          <div class="card__body">
            <div class="card__check">
              <div class="card__description">
                Best suited for
              </div>
              <div class="card_btn">
                <button>Check your Bank</button>
              </div>
            </div>
            <div class="card__banner">
              <div class="card__banner--title">Services</div>
              <div class="card__banner--txt">
                <p>Bank Account</p>
                <p>Bank Cards</p>
                <p>Digital Equiring</p>
              </div>
            </div>
            <div class="card__review">
              <p class="card__review--title">Customers review</p>
              <div class="card__review_img">
                <img src="/img/star.svg" alt="" >
              </div>
              <p class="card__review--description">
                Redwood Bank was launched in August 2017 to offer a real
                alternative for small and medium sized
              </p>
            </div>
            <div class="card__btn_wrap">
              <button class="btn-primary">Get Account</button>
              <button>More details</button>
              <p class="card__btn_wrap--txt">OTHER BANKS</p>
              <button class="btn-primary">Get All</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDropdown: false,
      selectedOption: null,
      options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    handleSelectChange(selectedValue) {
      this.selectedOption = selectedValue;
      this.showDropdown = false;
    },
  },
};
</script>

<!--   <style lang="scss" scoped>
  </style> -->

<style lang="scss" scoped>
.page-bank {
  background: url("/img/accountstatus-bg.png");
}
.color-black {
  color: #000 !important;
}
.dropdown p + p {
  color: var(--secondary, #000);
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.9px;
}
.dropdown-option {
  color: var(--secondary, #000);
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 25.2px */
  letter-spacing: 0.9px;
}
.arrow-icon {
  position: relative;
  &:before {
    content: url("/img/arrow.svg");
    position: absolute;
    right: -25px;
    top: -3px;
  }
}
.dropdown {
  span {
    display: none;
  }
}
.toolbar {
  background-color: #fff;
  border-radius: 47px;

  padding: 10px 30px 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-column {
    display: flex;
    align-items: center;
    &:first-child {
      width: 230px;
    }
    &-title {
      padding-right: 10px;
      color: var(--medium-gray, #656565);
      text-align: center;
      font-family: Montserrat;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 140%; /* 25.2px */
      letter-spacing: 0.9px;
    }
  }
}

.dropdown {
  display: flex;
  cursor: pointer;
}

.dropdown-list {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 4px;
  min-width: 100px;
  z-index: 1;
}

.dropdown-option {
  padding: 4px;
  cursor: pointer;
}

.checkbox-wrapper-34 .tgl {
  display: none;
}

.checkbox-wrapper-34 .tgl::selection,
.checkbox-wrapper-34 .tgl:after::selection,
.checkbox-wrapper-34 .tgl:before::selection,
.checkbox-wrapper-34 .tgl *::selection,
.checkbox-wrapper-34 .tgl *:after::selection,
.checkbox-wrapper-34 .tgl *:before::selection,
.checkbox-wrapper-34 .tgl + .tgl-btn::selection {
  background: none;
}
.checkbox-wrapper-34 .tgl + .tgl-btn {
  outline: 0;
  display: block;
  width: 57px;
  height: 27px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:after,
.checkbox-wrapper-34 .tgl + .tgl-btn:before {
  position: relative;
  display: block;
  content: "";
  width: 44%;
  height: 100%;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:after {
  left: 0;
}
.checkbox-wrapper-34 .tgl + .tgl-btn:before {
  display: inline;
  position: absolute;
  top: 5px;
  font-family: "Montserrat";
}
.checkbox-wrapper-34 .tgl:checked + .tgl-btn:after {
  left: 56.5%;
  background: #fff;
}

.checkbox-wrapper-34 .tgl-ios + .tgl-btn {
  background: linear-gradient(120deg, #1c31f0 0%, #0b1999 100%);
  margin-left: 10px;

  border-radius: 20rem;
  padding: 3px;
  transition: all 0.4s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:after {
  border-radius: 2em;
  background: #000;
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    padding 0.3s ease, margin 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:before {
  content: "No";
  left: 28px;
  color: var(--g04);
  transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios + .tgl-btn:active:after {
  padding-right: 0.4em;
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn {
  background: linear-gradient(
    120deg,
    #c64eff 1.34%,
    #931cf0 45.25%,
    #1c31f0 77.08%
  );
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:active {
  box-shadow: inset 0 0 0 30px rgba(0, 0, 0, 0.1);
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:active:after {
  margin-left: -0.4em;
}
.checkbox-wrapper-34 .tgl-ios:checked + .tgl-btn:before {
  content: "Yes";
  left: 4px;
  color: #fff;
}

.page-bank__content {
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
   &:nth-child(1) {
      margin-top: 140px;
      position: relative;
      &::after {
        content: url("/img/card-after-1.png");
        position: absolute;
        top: 145px;
        right: -84px;
      }
    }
     &:nth-child(2) {
      width: 400px;
      margin: 0 20px;
    }
    &:nth-child(3) {
      margin-top: 140px;
      &::after {
        content: url("/img/card-after-4.png");
        position: absolute;
        top: 750px;
        z-index: 1;
        right: 200px;
      }
    }
      width: 350px;
      &__header {
        border-radius: 65.636px 29.1px 17.636px 17.636px;
      background-size: cover !important;

      background: url("/img/card-bg.png") no-repeat;
      padding: 30px 0 0 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        color: #5eafef;
        font-family: Montserrat;
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: 27.336px;
        text-transform: capitalize;
      }
      p {
        color: #fff;
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%;
        letter-spacing: 0.7px;
        padding: 5px 0 12px 0;
      }
      .price {
        color: #fff;
        text-shadow: 0px 0px 59.96281433105469px 0px #3ddeed,
          0px 0px 59.96281433105469px 0px #3ddeed,
          0px 0px 59.96281433105469px 0px #3ddeed;
        font-family: Roboto;
        font-size: 47.044px;
        font-style: normal;
        font-weight: 700;
        line-height: 140%;
        letter-spacing: 2.352px;
        padding-right: 50px;
        position: relative;
        &::before {
          content: "$";
          color: #edf3ff;
          font-family: Roboto;
          font-size: 28.433px;
          font-style: normal;
          font-weight: 700;
          line-height: 140%;
          letter-spacing: 1.422px;
        }
      }
    }
    &__body {
        &::before {
        content: url("/img/card-after-2.png");
        position: absolute;
        right: 0;
        z-index: -1;
        top: 184px;
      }
      background-color: rgba(255, 255, 255, 0.50);
      backdrop-filter: blur(8.818060874938965px);
      padding: 13px 15px 17px 15px;
      z-index: 2;
      position: relative;
      &_checkBank {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &_txt {
          color: #506492;
          font-family: Montserrat;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 140%; /* 22.4px */
          letter-spacing: 0.8px;
        }
        &_btn {
          button {
            color: #1c31f0;
            font-family: Montserrat;
            font-size: 9px;
            font-style: normal;
            font-weight: 500;
            line-height: 125%;
            border-radius: 18.518px;
            padding: 8px;
            border: 0.882px solid #1c31f0;
            letter-spacing: 0.09px;
          }
        }
    }
}
&__banner {
    margin-top: 10px;
  border-radius: 17.636px;
  background: #506492;
  box-shadow: 0px 14.10889720916748px 14.10889720916748px 0px
      rgba(50, 50, 71, 0.08),
    0px 20.281539916992188px 25.572376251220703px 0px rgba(0, 0, 0, 0.1);
  padding: 8px;
  &--title {
    color: #fff;
    font-family: Montserrat;
    font-size: 17.636px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 24.691px */
    letter-spacing: 0.882px;
    text-transform: uppercase;
    text-align: center;
    position: relative;
    &::after {
      content: url("/img/card-icon.svg");

      position: absolute;
      right: 70px;
    }
  }
  &--txt {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: space-around;
    p {
      color: #fff;
      text-align: center;
      font-family: Montserrat;
      font-size: 12.345px;
      font-style: normal;
      font-weight: 600;
      line-height: 140%;
      letter-spacing: 0.617px;
      width: 120px;
    }
  }
}
&__review {
    margin-top: 17px;
  text-align: center;
  &--title {
    color: #506492;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 25.2px */
    letter-spacing: 0.9px;
  }
  &_img {
    position: relative;
    &::after {
      content: "(5.0)";
      position: absolute;
      color: #506492;
      font-family: Montserrat;
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: 140%;
      letter-spacing: 0.6px;
      right: 60px;
      top: 5px;
    }
  }
  &--description {
    margin-top: -40px;
    color: #506492;
    text-align: center;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    padding: 0 10px;
    line-height: 140%; 
    letter-spacing: 0.6px;
  }
}

&__btn {
    &_wrap {
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  &--txt {
    text-align: center;
    margin-top: 10px;
  }
  button {
    text-align: center;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 16.834px; /* 105.215% */
    padding: 13px 0;
    &:first-child {
      border-radius: 80px 34.033px 34.033px 34.033px;
      box-shadow: 0px 17.378467559814453px 23.171289443969727px 0px
          rgba(50, 50, 71, 0.08),
        0px 11.585644721984863px 11.585644721984863px 0px rgba(50, 50, 71, 0.08),
        0px 3.52722430229187px 29.099599838256836px 0px rgba(28, 49, 240, 0.2);
    }
    &:nth-child(2) {
      margin-top: 10px;
      color: #1c31f0;
      text-align: center;
      font-family: Montserrat;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 16.834px; /* 105.215% */
      border-radius: 80px 41.445px 41.445px 41.445px;
      border: 1.764px solid #1c31f0;
      box-shadow: 0px 21.163345336914062px 28.21779441833496px 0px
          rgba(50, 50, 71, 0.08),
        0px 14.10889720916748px 14.10889720916748px 0px rgba(50, 50, 71, 0.08);
    }
    &:nth-child(4) {
      border-radius: 27.173px;
      margin-top: 10px;
      box-shadow: 0px 13.87547779083252px 18.500635147094727px 0px
          rgba(50, 50, 71, 0.08),
        0px 9.250317573547363px 9.250317573547363px 0px rgba(50, 50, 71, 0.08);
    }
  }
}
}
}


.fz-53 {
  font-size: 53px;
}
.fz-32 {
  font-size: 32px;
}
.fz-16 {
  font-size: 16px;
}

.fz-18 {
  font-size: 18px;
}
.fz-20 {
  font-size: 20px;
}
.fz-14 {
  font-size: 14px;
}
</style>
