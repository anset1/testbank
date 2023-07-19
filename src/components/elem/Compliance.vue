<template>
  <div class="box box_compliance">
    <div class="header">
      <div class="title">Compliance</div>
      <div class="block">
        <Stat class="img" />
        <div class="block_content">
          <div class="subtxt">Status</div>
          <div class="txt">{{ paid }}</div>
        </div>
      </div>
      <div class="block">
        <Graph class="img" />
        <div class="block_content">
          <div class="subtxt">
            Pre-check type of risk
            <Info pos="tr" txt="Compliance risk status, getting type including a provided date by client and isn’t a final . Can be change after full Compliance review" />
          </div>
          <div class="txt">
            <span v-if="!showCalculatedRisk">{{ risk }}</span>
            <span v-else>{{ calculatedRiskName }}</span>
          <ArrowFlat class="high" /></div>
        </div>
      </div>
      <div class="block">
        <CircleLoad class="img" />
        <div class="block_content">
          <div class="subtxt">Additional compliance request</div>
          <div class="txt">{{ $store.getters.contentArr.additional_compliance_request }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Info from '@/components/elem/Info.vue'
import Stat from '@/components/img/Stat.vue'
import Graph from '@/components/img/Graph.vue'
import CircleLoad from '@/components/img/CircleLoad.vue'
import ArrowFlat from '@/components/img/ArrowFlat.vue'

export default {
  components: {
    Info,
    Stat,
    Graph,
    CircleLoad,
    ArrowFlat,
  },
  data() {
    return {
        risk: '',
        paid: '',
        additionalComplianceRequest: '',
        showCalculatedRisk: false,
        calculatedRiskName: '',
    }
  },
  watch: {
    '$store.state.user': function() {
      this.showCalculatedRisk = (this.$store.state.user && this.$store.state.user.show_calculated_risk) ? true : false;
      this.calculatedRiskName = (this.$store.state.user && this.$store.state.user.calculatedRisk && typeof this.$store.state.user.calculatedRisk === 'object') ? this.$store.state.user.calculatedRisk.name : '';
      this.risk = (this.$store.state.user && this.$store.state.user.risk) ? this.$store.state.user.risk : '';
      this.paid = (this.$store.state.user && this.$store.state.user.is_paid == 1) ? 'Paid' : 'Unpaid';
      this.additionalComplianceRequest = (this.$store.state.user) ? this.$store.state.user.additional_compliance_request : '';
    }
  }
}
</script>

<style lang="scss" scoped>
.box_compliance {
  background: linear-gradient(113.24deg, #13B497 16.01%, #05737A 106.71%);

  .header {
    display: flex;
    align-items: center;
    background-image: url('/img/group_61.png');
    background-position: 102% -0.5rem;
    background-repeat: no-repeat;
    background-size: auto;
    border-radius: 14px;

    .block {
      display: flex;
      padding: .25rem 1rem;

      svg.img {
        width: 1.5rem;
        height: 1.5rem;
        margin-top: 10px;
      }

      &_content {
        padding: 0 .75rem;

        .subtxt {
          position: relative;
          font-size: 10px;
        }

        .txt {
          display: flex;
          align-items: center;

          :deep(svg) {
            width: .75rem;
            height: .75rem;
            margin: 6px;

            &.high {
              transform: rotate(-90deg);
              path {
                fill: #B03636;
              }
            }
          }
        }
      }
    }
  }
}
</style>
