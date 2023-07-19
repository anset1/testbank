<template>
  <div class="tbl" ref="tbl">
    <div class="tbl_header">
      <div
        v-for="(i, key) in options.header"
        :key="key"
        class="col"
        :class="i.class ? i.class : ''"
        :style="{ 'width': options.colsWidth[key] }"
      >
        <span>
          {{ i.ttl }}
          <Info v-if="i.info" :pos="i.info.pos" :txt="i.info.txt" />
          <span
            v-if="i.sort"
            class="sort"
            :class="{
              'sort--load': options.sort.loading,
              'sort--asc': options.sort.name === i.sort && options.sort.order === 'asc',
              'sort--desc': options.sort.name === i.sort && options.sort.order === 'desc',
            }"
            @click="sortBy(i.sort)"
          >&#9650;</span>
        </span>
      </div>
    </div>
    <div class="tbl_body">
      <div v-for="(i, key) in options.body" :key="key" class="tbl_row" :class="getIndividualClass(key)" :style="{ 'cursor': chatAppliedOfferType ? 'pointer' : '' }" @click="clickRow(key)">
        <div v-if="isIndividual(key)" class="individual-offer-hint" >Individual offer for you</div>
        <div
          v-for="(el, el_key) in i"
          :key="`w_${el_key}`"
          class="col"
          :style="{ 'width': getCellWidth(el, el_key) }"
        >
          <div @click="apply(el.id, el.applyType)" v-if="getType(el) === 'object' && el.type === 'apply-btn'" class="btn" v-html="el.html"></div>
          <div  @click="applyAccount(el.id, el.applyType, el.gdpr)" v-else-if="getType(el) === 'object' && el.type === 'account-apply-btn'" class="btn" :class="{ 'account-apply-btn-readonly': !el.gdpr }" v-html="el.html"></div>
          <span v-else-if="getType(el) === 'object' && el.type === 'account-gdpr'">
            <div class="checkBox" @click="changeAccountGdpr(el.id, el.serialNumber, el.applyType, el.gdpr)">
              <div class="check"><Check v-show="el.gdpr" /></div>
            </div>
          </span>
          <div v-else-if="getType(el) === 'object' && el.type === 'basic'" class="btn" v-html="el.html"></div>
          <template v-else-if="getType(el) === 'object' && el.type === 'deadline'">
            <div class="ddln">
              Deadline: <span class="ddln_val">{{ el.days }}</span> <span class="ddln_desc">days</span> <span class="ddln_val">{{ el.hours }}</span> <span class="ddln_desc">hours</span>
            </div>
            <div class="del ml-3">
              <div class="btn btn_close" @click="apply(el.id, el.applyType)"><Close /></div>
            </div>
          </template>
          <template v-else-if="getType(el) === 'object' && el.type === 'deadline_2'">
            <div class="ddln">
              <span class="ddln_val">{{ el.days }}</span> <span class="ddln_desc">days</span> <span class="ddln_val">{{ el.hours }}</span> <span class="ddln_desc">hours</span>
            </div>
            <div class="del ml-3">
              <div class="btn btn_close" @click="apply(el.id, el.applyType)"><Close /></div>
            </div>
          </template>
          <template v-else-if="getType(el) === 'object' && el.type === 'deadline_info'">
            <div class="ddln">
              <span class="ddln_val">{{ el.days }}</span> <span class="ddln_desc">days</span> <span class="ddln_val">{{ el.hours }}</span> <span class="ddln_desc">hours</span>
            </div>
          </template>
          <template v-else-if="getType(el) === 'object' && el.type === 'cancel'">
            <div class="del ml-3">
              <div class="btn btn_close" @click="apply(el.id, el.applyType)"><Close /></div>
            </div>
          </template>
          <div v-else-if="getType(el) === 'object' && el.type === 'deadline_lite'" class="ddln">
            <span class="ddln_val">{{ el.days }}</span> <span class="ddln_desc">days</span> <span class="ddln_val">{{ el.hours }}</span> <span class="ddln_desc">hours</span>
          </div>
          <span v-else-if="getType(el) === 'object' && el.type === 'info'" >
            {{ el.html }}
            <Info :pos="el.info.pos" :txt="el.info.txt" />
          </span>
          <span v-else-if="getType(el) === 'object' && el.type === 'del'" class="del">
            <div class="btn btn_close"><Close /></div>
          </span>
          <span v-else-if="getType(el) === 'object' && el.type === 'notification'" class="notification">
            <span @click="showNotificationDetails(el.notificationType, el.notification)">{{ el.text }}</span>
          </span>
          <span v-else-if="getType(el) === 'object' && el.type === 'hidden-id'" style="display: none">
            {{ el.id }}
          </span>

          <span v-else-if="(getType(el) === 'object' && el.type !== 'individual' ) || getType(el) !== 'object'">
            <span v-if="$route.name != 'Accounts'"><truncate clamp="..." :length="30" less="Show Less" :text="el"></truncate></span>
            <span v-else v-html="el" :style="[el && el.length > 60 ? {'font-size': '12px'} : {}]"></span>
          </span>
        </div>
      </div>
      <div v-if="options.footer && options.footer.type === 'Total Price' " class="tbl_row tbl_row-footer">
        <div class="tp">Total Price: <span class="val">{{ options.footer.val }}</span></div>
      </div>
    </div>
    <div class="tbl_footer">
      <pagination
        v-if="options.paginationData"
        :data="options.paginationData"
        @pagination-change-page="paginationChangePage"
      />
    </div>
  </div>
</template>

<script>
import Pagination from 'laravel-vue-pagination'
import Info from '@/components/elem/Info.vue'
import Close from '@/components/img/Close.vue'
import { mapMutations } from 'vuex';
import truncate from 'vue-truncate-collapsed'
import Check from '@/components/img/Check.vue'

export default {
  name: 'Table',
  components: {
    Pagination,
    Info,
    Close,
    truncate,
    Check
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    chatAppliedOfferType: {
      type: String,
      required: false,
      default: false
    }
  },
  watch: {
    'myProfileForm.registration_country': function (countryId) {
      this.setCountryName(countryId)
    },
    options: function (options) {
      console.log('options')
      console.log(options)
    }
  },
  methods: {
    ...mapMutations({
      setChatOffer: 'SET_CHAT_OFFER',
    }),
    getCellWidth(data, key) {
      let w = this.options.colsWidth[key]

      if (this.getType(data) === 'object' && (data.type === 'deadline' || data.type === 'deadline_2')) {
        w = `calc(${this.options.colsWidth[key]} + ${this.options.colsWidth[key + 1]})`
      }

      return w
    },
    apply (id, applyType) {
      console.log('applyType')
      console.log(id, applyType)
      if (this.options.comingSoon) return

      this.$emit('apply', {
        id: id,
        applyType: applyType,
      })
    },
    applyAccount (id, applyType, gdpr) {
      if (gdpr) {
        if (this.options.comingSoon) return

        this.$emit('apply', {
          id: id,
          applyType: applyType,
        })
      }
    },
    changeAccountGdpr (id, serialNumber, type, gdpr) {
      this.$emit('change-account-gdpr', {
        id: id,
        serialNumber: serialNumber,
        type: type,
        gdpr: gdpr,
      })
    },
    paginationChangePage (page) {
      if (this.options.comingSoon) return

      this.$emit('change-page', page)
      this.$emit('scroll-top', this.$refs.tbl)
    },
    getIndividualClass (index) {
      if (this.options.individual && this.options.individual.length > 0 && this.options.individual[index]) {
        return 'individual'
      }
      return ''
    },
    isIndividual (index) {
      if (this.options.individual && this.options.individual.length > 0 && this.options.individual[index]) {
        return true
      }
      false
    },
    sortBy (name) {
      if (this.options.sort.loading) return

      this.$emit('sort', {
        obj: this.options.objName,
        sort: name
      })
    },
    clickRow (row) {
      if (this.chatAppliedOfferType.length > 0) {
        for (var prop in this.options.body[row]) {
            if (Object.prototype.hasOwnProperty.call(this.options.body[row], prop)) {
                const p = this.options.body[row][prop]
                if (p.type && p.type == 'hidden-id') {
                  this.setChatOffer({
                    id: p.id,
                    type: this.chatAppliedOfferType,
                    time: +Date.now()
                  })
                  this.$emit('close',)
                }
            }
        }
      }
    },
    showNotificationDetails (type, notification) {
      if (type === 'create-service-chat') {
        this.$router.push({ name: "Chat", params: { chatId: notification.notification.data.chat_id } })
      }
      if (type === 'create-offer-chat') {
        this.$router.push({ name: "Chat", params: { chatId: notification.notification.data.chat_id } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tbl {
  &_header {
    .col {
      // padding: 0.75rem 2px;
      padding: .5rem 2px;
      font-size: 14px;
      min-height: 3.25rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.gradient_btn {
        padding: 6px;
        position: relative;

        $margin: 4px;
        &::before {
          content: '';
          position: absolute;
          top: $margin; right: $margin; bottom: $margin; left: $margin;
          // background: linear-gradient(113.24deg, #13B497 16%, #05737A 106.71%);
          background: linear-gradient(113.24deg, #13B497 16%, #3baab2 106.71%);
          filter: blur(1px);
          border-radius: 14px;
        }

        span {
          position: relative;
          width: 100%;
          min-height: 2.75rem;
          padding: .25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(-5deg, #13B497 -100%, #05737A 100%);
          border-radius: 14px;
        }
      }

      .sort {
        font-size: 22px;
        line-height: 0.3;
        cursor: pointer;
        padding: 0 0.25rem;
        display: inline-flex;
        align-items: baseline;

        &--asc {
          transform: rotate(180deg);
          color: var(--c_green);
        }

        &--desc {
          color: var(--c_green);
        }

        &--load {
          color: rgba(128, 128, 128, 0.4);
          cursor: default;
        }
      }
    }
  }

  &_body {
    .individual {
        background-color: #ff4c4c;
    }

    .tbl_row {
      border-bottom: 1px solid #323940;
      position: relative;

      .individual-offer-hint {
        position: absolute;
        left: -52px;
        top: -10px;
        background-color: #13B497;
        font-size: 16px;
        padding: 0.4rem;
        border-radius: 6px;
        color: white;
      }

      &:last-child {
        border: none;
      }

      .col {
        // position: relative;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
        padding: 6px 2px;
        min-height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;

        .btn {
          width: calc(100% - 1.5rem);
          color: #62CDAC;
          padding: .5rem .75rem;
          background: rgba(19, 180, 151, 0.1);
          border-radius: 6px;

          &.info {
            width: 1rem;
            padding: 0;
            background: transparent;
          }
        }

        .ddln {
          // position: absolute;
          // top: 50%;
          // right: 10%;
          // transform: translateY(-50%);
          width: calc(100% - 1.5rem);
          background: #393b41;
          border-radius: 6px;

          &_val {
            font-size: 24px;
            color: #62CDAC;
          }

          &_desc {
            font-size: 14px;
          }
        }

        .del {
          .btn_close {
            width: 2rem;
            height: 2rem;
            padding: .25rem;
            background-color: #B03636;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              width: 45%;
              height: 45%;
            }
          }
        }
        .ml-3 {
          margin: 0 13px;
        }
      }

      &:hover {
        background-color: #3D444B;

        &:last-child {
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;
        }
      }

      &-footer {
        justify-content: flex-start;
        padding-left: 20vw;

        .tp {
          font-size: 1.25rem;
          padding: .5rem 2rem;
          margin: .5rem;
          display: flex;
          align-items: baseline;
          justify-content: center;
          background-color: #272E35;
          border-radius: 6px;

          .val {
            color: #62CDAC;
            margin-left: 1.5rem;
          }
        }
      }
    }
  }

  &_footer {
    :deep(.pagination) {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(19, 180, 151, 0.1);
      border-radius: 14px;

      .page-item {
        margin: .75rem .5rem;

        a {
          width: 2.25rem;
          max-width: 2.25rem;
          height: 2.25rem;
          max-height: 2.25rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: .5rem;
          font-size: 1.25rem;
          color: #62CDAC;
          text-decoration: none;
          text-transform: uppercase;
          background-color: #2F363D;
          border-radius: 50%;

          .sr-only {
            display: none;
          }
        }

        &.active {
          a {
            color: #ffffff;
            background-color: #62CDAC;
            font-weight: 800;
          }
        }
      }
    }
  }
}

.checkBox {
  display: flex;
  align-items: flex-start;

  .check {
    width: 1.25rem;
    min-width: 1.25rem;
    height: 1.25rem;
    min-height: 1.25rem;
    border: 1px solid #5E7084;
    border-radius: .25rem;
    margin: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    :deep(svg) {
      width: 13px;
      height: 13px;

      path {
        fill: #ffffff;
      }
    }
  }
}

.account-apply-btn-readonly {
    background: #787878 !important;
    cursor: initial;
}

</style>
