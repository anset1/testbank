<template>

    <div class="main-page">
        
            <div class="main-page__content">
            <div class="main-page__banner">
              <h1 class="main-page__heading">One account<br> to open and<br> manage all<br> banks</h1>
              <div class="main-page__description">
                We mean that you enter parameters,<br>
                choose a bank and <br>
                open bank accounts right here.
              </div>
              <div class="main-page_image">
                <img src="/img/savings.png" alt="">
              </div>
            </div>
        </div>
     
           <div class="main-page__container container">
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
        <button class="btn btn-primary">Check for Me</button>
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
  
  <style lang="scss" scoped>
  .main-page{
    padding-top: 100px;
    background: url("/img/accountstatus-bg.png");
    &__container {
        padding: 50px 0 100px 0;
        text-align: center;
    }
    &__content {
        padding: 60px 0px 60px 60px;
        width: 80%;
        background: linear-gradient(233deg, #071279 0%, #2130B2 32.81%, #141F81 65.10%, #0E1238 100%);
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
    }
    &__banner {
        border-radius: 30px;
        padding: 80px;
        background: url('/img/main-page-bg.png') no-repeat;
        background-size: cover;
        position: relative;
    }
    &__heading {
        color: #EEF8FF;
        font-family: Montserrat;
        font-size: 45px;
        font-style: normal;
        font-weight: 800;
        line-height: 101%;
        letter-spacing: 2.25px;
        text-transform: uppercase;
    }
    &__description {
        margin-top: 30px;
        color: #EEF8FF;
        font-family: Montserrat;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 145.5%;
        letter-spacing: 0.9px;
    }
    &_image {
        position: absolute; 
        right: -185px;
        top: -50px;
    }
    }
  .dropdown p + p {
    color: var(--secondary, #000);
    text-align: center;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: 0.9px;
  }
  .dropdown-option {
    color: var(--secondary, #000);
    text-align: center;
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; 
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
    margin: 60px 0;
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
  
  </style>
  