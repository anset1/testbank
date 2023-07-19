<template>
	<div class="default-layout">
		<Sidebar/>
		<div class="wrapper">
			<Header/>
			<router-view class="page"/>
      <Footer/>
		</div>
		<!-- <Modal /> -->
	</div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import Modal from '@/components/modals/Modal.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Sidebar,
    Header,
    Footer,
    // Modal,
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  background-color: #EEF8FF;
  .wrapper {
    position: relative;
    margin-left: var(--sb_width);
    width: calc(100% - var(--sb_width));
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
}
</style>

<style lang="scss">
.default-layout {
  .page {
    flex-grow: 1;
    padding-top: 1rem;
    padding-bottom: .75rem;

    &-title {
      padding-bottom: 1.25rem;
      font-weight: 700;
      font-size: 36px;
      line-height: 44px;
      text-transform: capitalize;
      color: var(--c_primary-dark);
    }
  }
}
</style>
