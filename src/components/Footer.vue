<template>
  <div class="footer">
    <div class="footer__container">
      <div class="footer-docs">
        <div class="footer-docs__item">Terms and Conditions</div>
        <div class="footer-docs__item">Privacy Policy</div>
        <div class="footer-docs__item">AML</div>
        <div class="footer-docs__item">KYC</div>
      </div>
    </div>
    <div class="footer-copyright">
      Copyright ©2022 Toka. All rights reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.footer {
  width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  color: var(--c_white);
  background-color: var(--c_main-dark-bg);
  border-radius: 20px 20px 0px 0px;

  &__container {
    width: 100%;
    padding: 0 1.25rem;
  }

  &-docs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    justify-content: space-evenly;
    padding: .75rem .75rem 10px;
    border-bottom: 1px solid #4C4C5B;

    &__item {
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
  }

  &-copyright {
    width: 100%;
    padding: .5rem .75rem;
    color: #8D99FF;
    font-size: 12px;
    text-align: center;
  }
}
</style>
