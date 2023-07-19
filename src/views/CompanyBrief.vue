<template>
  <div class="page-companyBrief">
    <div class="container">
      <div class="row pills">
        <div class="pills__item">Partnership</div>
      </div>
      <div class="row page-title">Company Brief</div>
      <div class="row page-content">
        <div class="form">
          <div v-if="countries" class="form-box">
            <div class="form-title">Bank's Compliance</div>
            <div class="form-subtitle">
              But each one takes a different approach and makes different tradeoffs.
            </div>
            <div class="form-group select">
              <label for="ubo_residential">UBO Residential</label>
              <div class="select-wrapper">
                <SelectMultiple
                  v-if="countries"
                  :list="countries"
                  value_key="id"
                  name_key="name"
                  placeholder="Select Country"
                  @selected="obj => form.ubo_residential = Object.keys(obj)"
                />
              </div>
            </div>
            <div class="form-group select">
              <label for="country_of_incorporation">Country of incorporation</label>
              <div class="select-wrapper">
                <SelectSimple
                  :list="countries"
                  value_key="id"
                  name_key="name"
                  placeholder="Select Country"
                  @selected="item => form.country_of_incorporation = item.id"
                />
              </div>
            </div>
            <div class="form-group select">
              <label for="industry">Field of activity</label>
              <div class="select-wrapper">
                <SelectSimple
                  :list="industries"
                  value_key="id"
                  name_key="name"
                  placeholder="Select activity"
                  @selected="item => form.industry = item.id"
                />
              </div>
            </div>
          </div>
          <div v-if="countries" class="form-box">
            <div class="form-title">Company Information</div>
            <div class="form-subtitle">
              But each one takes a different approach and makes different tradeoffs.
            </div>
            <div class="form-group">
              <label for="company_name">Company Name</label>
              <input
                name="company_name"
                id="company_name"
                v-model="form.company_name"
                placeholder="e.g. Digigtal Flat [Bo]"
              />
            </div>
            <div class="form-group">
              <label for="company_address">Company Address</label>
              <input
                name="company_address"
                id="company_address"
                v-model="form.company_address"
                placeholder="e.g. London SW1A 1AA"
              />
            </div>
            <div class="form-group select">
              <label for="director_residence">Director Residence</label>
              <div class="select-wrapper">
                <SelectSimple
                  :list="countries"
                  value_key="id"
                  name_key="name"
                  placeholder="Select Country"
                  @selected="item => form.director_residence = item.id"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="phone_number">Phone Number</label>
              <input
                name="phone_number"
                id="phone_number"
                v-model="form.phone_number"
                placeholder="e.g. Ecommerce"
              />
            </div>
            <div class="form-group">
              <label for="email">Company Email</label>
              <input
                name="email"
                id="email"
                v-model="form.email"
                placeholder="company@email.com"
              />
            </div>
          </div>
          <div class="form-box">
            <div class="form-title">Business Information</div>
            <div class="form-subtitle">
              But each one takes a different approach and makes different tradeoffs.
            </div>
            <div class="form-group">
              <label for="website_link">Website Link (if available)</label>
              <input
                name="website_link"
                id="website_link"
                v-model="form.website_link"
                placeholder="e.g. London SW1A 1AA"
              />
            </div>
            <div class="form-group">
              <label for="monthly_turnover">Monthly Turnover</label>
              <input
                name="monthly_turnover"
                id="monthly_turnover"
                v-model="form.monthly_turnover"
                placeholder="Select Monthly Turnover"
              />
            </div>
            <div class="form-group select">
              <label for="geo_clients">Geo of Clients</label>
              <div class="select-wrapper">
                <SelectMultiple
                  v-if="countries"
                  :list="countries"
                  value_key="id"
                  name_key="name"
                  placeholder="Geo"
                  @selected="obj => form.geo_clients = Object.keys(obj)"
                />
              </div>
            </div>
          </div>
          <div class="form-files">
            <div class="form-title">Documents</div>
            <div class="form-subtitle">
              Download every document that is according to your company
            </div>
            <div
              class="drag-box"
              :class="{ '-active': $refs.upload && $refs.upload.dropActive }"
            >
              <label for="file" class="btn select-files"/>
              <file-upload
                :post-action="postAction"
                :headers="headers"
                :extensions="extensions"
                :multiple="true"
                :drop="true"
                v-model="files"
                ref="upload"
                @input-file="inputFile"
              />

              <CloudWithArrow class="drag-box__icon"/>
              <div class="drag-box__title">Drag your item or select files to upload</div>
              <div class="drag-box__subtitle">PNG, jPG, JPEG or PDF. Maximum file size 100 Mb.</div>
            </div>
            <!-- <div class="example-drag">
              <div class="upload">
                <ul v-if="files.length">
                  <li v-for="file in files" :key="file.id">
                    <span>{{file.name}}</span> -
                    <span>{{file.size}}</span> -
                    <span>{{+file.progress}}%</span> -
                    <span v-if="file.error">{{file.error}}</span>
                    <span v-else-if="file.success">success</span>
                    <span v-else-if="file.active">active</span>
                    <span v-else></span>
                  </li>
                </ul>
              </div>
            </div> -->
            <div v-if="files.length" class="files-status">
              <div class="files-status__title">Documents status</div>
              <div class="files-status-info">
                <!-- <div class="btn files-status-info__close"><XIcon class="btn__icon"/></div> -->
                <div class="files-status-info__percent">
                  {{ (uploadedFiles.length / (files.length / 100)).toFixed(1) }}%
                </div>
                <div class="files-status-info__desc">
                  <div class="files-status-info__text">
                    <b>{{ uploadedFiles.length }}</b> out of <b>{{ files.length }}</b> documents uploaded
                  </div>
                  <div class="files-status-info__status">
                    <span v-if="queueFiles.length">In Progress</span>
                    <span v-else-if="errorFiles.length">Has error</span>
                    <span v-else>Done</span>
                  </div>
                </div>
              </div>
              <div class="files-status-types">
                <div v-if="uploadedFiles.length" class="files-status-type -show">
                  <div class="files-status-type__top">
                    <div class="files-status-type__name">Uploaded</div>
                    <div class="files-status-type__count">{{ uploadedFiles.length }} files</div>
                    <!-- <div
                      v-if="uploadedFiles.length"
                      class="btn files-status-type__show"
                    ><ArrowToDown/></div> -->
                  </div>
                  <div class="files-status-type__content">
                    <div
                      v-for="(file, index) in uploadedFiles" :key="index"
                      class="files-status-type__item"
                    >
                      <div class="files-status-type__mark"><done-icon/></div>
                      <FileWithPlusIcon class="files-status-type__file-icon"/>
                      <div class="files-status-type__file-name">{{ file.name }}</div>
                      <div class="btn files-status-type__file-del" @click="removeFileFromServer(file)">
                        <XIcon class="btn__icon"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="queueFiles.length" class="files-status-type -show">
                  <div class="files-status-type__top">
                    <div class="files-status-type__name">Queue</div>
                    <div class="files-status-type__count">{{ queueFiles.length }} files</div>
                  </div>
                  <div class="files-status-type__content">
                    <div
                      v-for="(file, index) in queueFiles" :key="index"
                      class="files-status-type__item"
                    >
                      <div class="files-status-type__file-name">{{ file.name }} -> {{ +file.progress }}%</div>
                    </div>
                  </div>
                </div>
                <div v-if="errorFiles.length" class="files-status-type -show">
                  <div class="files-status-type__top">
                    <div class="files-status-type__name">Errors</div>
                    <div class="files-status-type__count">{{ errorFiles.length }} files</div>
                  </div>
                  <div class="files-status-type__content">
                    <div
                      v-for="(file, index) in errorFiles" :key="index"
                      class="files-status-type__item"
                    >
                      <div class="files-status-type__file-name">{{ file.name }} -> {{ file.error }}</div>
                      <div class="btn files-status-type__file-del" @click.prevent="$refs.upload.remove(file)">
                        <XIcon class="btn__icon"/>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div
                  v-for="(file, index) in files" :key="index"
                  class="files-status-type"
                  :class="{ '-show': showTypes.includes(file.type) }"
                >
                  <div class="files-status-type__top">
                    <div class="files-status-type__name">{{ file.type }}</div>
                    <div class="files-status-type__count">{{ file.list.length }} files</div>
                    <div
                      v-if="file.list.length"
                      class="btn files-status-type__show"
                      @click="toggleFileType(file.type)"
                    >
                      <ArrowToDown/>
                    </div>
                  </div>
                  <div class="files-status-type__content">
                    <div
                      v-for="(item, index) in file.list" :key="index"
                      class="files-status-type__item"
                    >
                      <div class="files-status-type__mark">
                        <component :is="item.status ? 'done-icon' : 'warning-icon'"></component>
                      </div>
                      <FileWithPlusIcon class="files-status-type__file-icon"/>
                      <div class="files-status-type__file-name">{{ item.name }}</div>
                      <div class="btn files-status-type__file-del"><XIcon class="btn__icon"/></div>
                    </div>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
          <div class="available">
            <div class="available-title">Available to you</div>
            <div class="available-desc">
              Based on the information you've shared, it looks like you're eligible for the account type below (subject to our due diligence).
            </div>
            <div class="available-list">
              <div class="available-list-item">
                <div class="available-list-item__mark"><DoneIcon/></div>
                <div class="available-list-item__text">
                  Designed for businesses making high-value payments across borders
                </div>
              </div>
              <div class="available-list-item">
                <div class="available-list-item__mark"><DoneIcon/></div>
                <div class="available-list-item__text">
                  Collect from and pay to <b>190+ countries</b>
                </div>
              </div>
              <div class="available-list-item">
                <div class="available-list-item__mark"><DoneIcon/></div>
                <div class="available-list-item__text">
                  Open local IBANS in the UK, Netherlands, Germany, Denmark, Luxembourg, and the US
                </div>
              </div>
              <div class="available-list-item">
                <div class="available-list-item__mark"><DoneIcon/></div>
                <div class="available-list-item__text">
                  Access <b>65+ currencies</b> at competitive rates
                </div>
              </div>
              <div class="available-list-item">
                <div class="available-list-item__mark"><DoneIcon/></div>
                <div class="available-list-item__text">
                  Dedicated human support from your own Client Manager
                </div>
              </div>
              <div class="available-list-item">
                <div class="available-list-item__mark"><DoneIcon/></div>
                <div class="available-list-item__text">
                  Joint signatories and multi-level team access
                </div>
              </div>
            </div>
          </div>
          <div class="form-options">
            <div v-if="!queueFiles.length" class="btn form-submit" @click="submit">Submit</div>
          </div>
        </div>
        <div class="rate">
          <div class="rate-box">
            <div class="rate-title">Compliance rate</div>
            <div class="rate-value">
              <div class="rate-value-percent">45%</div>
              <div class="rate-value-changes">
                <ChartUpIcon class="rate-value-changes__icon"/>
                <div class="rate-value-changes__value">+3.53%</div>
              </div>
            </div>
            <div class="rate-desc">
              Based on the information you've shared, it looks like you're eligible for the account type below (subject to our due diligence).
            </div>
            <div class="btn rate-btn">Watch matches</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia'
import { useMainStore } from '@/stores/main'

import ArrowToDown from '@/components/icons/ArrowToDown.vue'
import CloudWithArrow from '@/components/icons/CloudWithArrow.vue'
import XIcon from '@/components/icons/XIcon.vue'
import DoneIcon from '@/components/icons/DoneIcon.vue'
import WarningIcon from '@/components/icons/WarningIcon.vue'
import FileWithPlusIcon from '@/components/icons/FileWithPlusIcon.vue'
import ChartUpIcon from '@/components/icons/ChartUpIcon.vue'

import FileUpload from 'vue-upload-component'
import SelectSimple from '@/components/common/Select.vue'
import SelectMultiple from '@/components/common/SelectMultiple.vue'

export default {
  name: 'CompanyBrief',
  components: {
    ArrowToDown,
    CloudWithArrow,
    XIcon,
    DoneIcon,
    WarningIcon,
    FileWithPlusIcon,
    ChartUpIcon,
    SelectSimple,
    SelectMultiple,
    FileUpload,
  },
  data: () => ({
    form: {
      ubo_residential: null,
      country_of_incorporation: null,
      industry: null,
      company_name: '',
      company_address: '',
      director_residence: null,
      phone_number: '',
      email: '',
      website_link: '',
      monthly_turnover: '',
      geo_clients: null,
    },
    files: [],
    extensions: ['jpg', 'jpeg', 'png', 'pdf'],
    filesTest: [
      { type: 'uploaded', list: [] },
      { type: 'checked', list: [] },
      { type: 'compatib', list: [{ name: 'FileName-1.jpg', status: true }, { name: 'FileName-2.jpg', status: true }] },
      { type: 'useless', list: [{ name: 'FileName-3.jpg', status: false }] },
    ],
    showTypes: [],
  }),
  async created() {
    await this.setCountries()
    await this.setIndustries()
  },
  computed: {
    ...mapWritableState(useMainStore, ['api', 'token', 'countries', 'industries']),
    postAction() {
      return import.meta.env.VITE_APP_BACKEND_API_URL + 'user-company/store-file'
    },
    headers() {
      return {
        'Authorization': `Bearer ${this.token}`
      }
    },
    uploadedFiles() {
      return this.files.filter(file => !file.error && file.success)
    },
    queueFiles() {
      return this.files.filter(file => !file.error && !file.success)
    },
    errorFiles() {
      return this.files.filter(file => file.error)
    },
  },
  methods: {
    ...mapActions(useMainStore, ['setCountries', 'setIndustries']),
    toggleFileType(type) {
      if (this.showTypes.includes(type)) {
        this.showTypes = this.showTypes.filter(item => item !== type)
      } else {
        this.showTypes.push(type)
      }
    },
    inputFile(newFile, oldFile) {
      if (!this.$refs.upload || !this.$refs.upload.active) {
        this.$refs.upload.active = true
      }
    },
    removeFileFromServer(file) {
      const file_id = +file?.response?.file_id
      if (!file_id) return

      const data = {
        file_id: file_id
      }

      this.api
        .delete(import.meta.env.VITE_APP_BACKEND_API_URL + 'user-company/delete-file', { data: data })
        .then(({ data }) => {
          if (data.status == "success") {
            this.$refs.upload.remove(file)
          } else {
            alert('Error. Something went wrong')
          }
        })
        .catch(error => {
          console.log(error)
          alert('Error. Something went wrong')
        })
    },
    submit() {
      const file_ids = this.uploadedFiles.map(file => file?.response?.file_id)

      const data = {
        ubo_residential: this.form.ubo_residential,
        country_of_incorporation: this.form.country_of_incorporation,
        industry: this.form.industry,
        company_name: this.form.company_name,
        company_address: this.form.company_address,
        director_residence: this.form.director_residence,
        phone_number: this.form.phone_number,
        email: this.form.email,
        website_link: this.form.website_link,
        monthly_turnover: this.form.monthly_turnover,
        geo_clients: this.form.geo_clients,
        file_ids: file_ids,
      }

      this.api
        .post(import.meta.env.VITE_APP_BACKEND_API_URL + 'user-company/create', data)
        .then(({ data }) => {
          this.$router.replace({ name: "MyCompanies" })
        })
        .catch(error => console.log(error))
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  &-companyBrief {
    .pills {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: .75rem;
      margin-bottom: 1.75rem;
      cursor: pointer;

      &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 20px;
        color: var(--c_black);
        font-size: 18px;
        text-align: center;
        background-color: #CFEBFF;
        border-radius: 10rem;
        white-space: nowrap;

        &.-active {
          color: var(--c_white-soft);
          background-color: var(--c_primary);
          font-weight: 600;
        }
      }
    }
  }

  &-content {
    --rate_width: 25vw;

    display: flex;
    gap: 3.5rem;
    padding-bottom: 2rem;

    .form {
      width: calc(100% - var(--rate_width));
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &-box {
        padding: 1.5rem 1.75rem;
        margin-bottom: 2.25rem;
        background: var(--c_white);
        box-shadow: 0px 16px 16px rgba(50, 50, 71, 0.08), 0px 24px 32px rgba(50, 50, 71, 0.08);
        border-radius: 30px;
      }

      &-title {
        color: var(--c_primary-dark);
        font-weight: 600;
        font-size: 32px;
        line-height: 1.2;
        text-transform: capitalize;
      }

      &-subtitle {
        color: var(--c_secondary-dark);
        font-weight: 400;
        font-size: 20px;
        line-height: 1.5;
      }

      &-group {
        --select_height: 46px;

        padding-top: 1rem;

        label {
          font-weight: 700;
          font-size: 20px;
          line-height: 2;
        }

        input,
        select {
          min-width: 100%;
          max-width: 100%;
          height: var(--select_height);
          padding: 12px 25px;
          border: 1px solid #E5E5E5;
          border-radius: 24px;
          outline: none;
        }

        select {
          appearance: none;
          cursor: pointer;
        }
      }

      .select {
        &-wrapper {
          position: relative;
          width: 100%;
        }

        &-arrow {
          position: absolute;
          top: calc(var(--select_height) / 2);
          right: 1.5rem;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          pointer-events: none;
        }
      }

      .drag-box {
        position: relative;
        width: 100%;
        height: 240px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.25rem 2rem;
        margin: 1rem auto 1.75rem;
        background: linear-gradient(95.63deg, rgba(210, 236, 255, 0.5) 0%, rgba(214, 236, 255, 0.5) 9.37%, rgba(245, 232, 255, 0.5) 100%);
        border-radius: 24px;
        cursor: pointer;

        &.-active {
          border: 1px dashed var(--c_secondary-dark);
        }

        .select-files {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        &__icon {
          width: 80px;
          height: 60px;
          margin-bottom: 1.25rem;
        }

        &__title {
          width: 400px;
          padding-bottom: .25rem;
          color: var(--c_secondary-dark);
          font-weight: 600;
          font-size: 20px;
          line-height: 20px;
          text-align: center;
        }

        &__subtitle {
          color: var(--c_secondary-dark-2);
          font-weight: 400;
          font-size: 14px;
          // line-height: 22px;
          text-align: center;
          text-transform: capitalize;
        }
      }

      .files-status {
        &__title {
          color: var(--c_primary-dark);
          padding-bottom: 1.25rem;
          font-weight: 700;
          font-size: 20px;
        }

        &-info {
          position: relative;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          background: #FFFFFF;
          box-shadow: 0px 16px 16px rgba(50, 50, 71, 0.08), 0px 24px 32px rgba(50, 50, 71, 0.08);
          border-radius: 27px;

          &__close {
            position: absolute;
            top: .75rem;
            right: .75rem;
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #F0F3FD;
            border-radius: 10rem;

            .btn__icon {
              width: 40%;
              height: 40%;
            }
          }

          &__percent {
            width: 72px;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: .75rem;
            margin-right: 1.25rem;
            color: var(--c_primary);
            font-weight: 700;
            font-size: 16px;
            text-align: center;
            background-image: url('/img/g1171.svg');
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
          }

          &__text {
            padding-bottom: .5rem;
            color: #333;
            font-size: 20px;
          }

          &__status {
            color: #6D6D6D;
            font-weight: 400;
            font-size: 16px;
          }
        }

        &-types {
          padding: .5rem 0 1.25rem;
        }

        &-type {
          &__top {
            padding: .25rem;
            display: flex;
            align-items: center;
          }

          &__name {
            min-width: 8rem;
            padding-right: .5rem;
            text-transform: capitalize;
          }

          &__count {
            flex-grow: 1;
          }

          &__show {
            width: 1rem;
            height: 1rem;
            margin-right: .75rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          &__content {
            padding: .75rem;
            margin-bottom: .5rem;
            display: none;
            flex-direction: column;
            gap: .75rem;
            align-items: center;
            background-color: var(--c_white);
            box-shadow: 0px 16px 16px rgba(50, 50, 71, 0.08), 0px 24px 32px rgba(50, 50, 71, 0.08);
            border-radius: 20px;
          }

          &__item {
            width: 100%;
            display: flex;
            align-items: center;
            gap: .5rem;
          }

          &__mark,
          &__file-icon {
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          &__file-name {
            flex-grow: 1;
          }

          &__file-del {
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #F0F3FD;
            border-radius: 10rem;

            .btn__icon {
              width: 40%;
              height: 40%;
            }
          }

          &.-show {
            font-weight: 600;
            .files-status-type {
              &__show {
                transform: rotate(180deg);
              }

              &__content {
                display: flex;
              }
            }
          }
        }
      }

      &-options {
        display: flex;
        align-items: center;
        gap: .75rem;
        margin: 2rem 0;
      }

      &-submit {
        padding: 1rem 1.75rem;
        color: var(--c_white);
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        text-align: center;
        background: linear-gradient(90.86deg, #1C31F0 -2.12%, #931CF0 87.62%);
        box-shadow: 0px 16px 16px rgba(50, 50, 71, 0.08), 0px 24px 32px rgba(50, 50, 71, 0.08);
        border-radius: 10rem;
      }
    }

    .available {
      &-title {
        padding: 1rem 0;
        color: var(--c_primary-dark);
        font-weight: 700;
        font-size: 20px;
      }

      &-desc {
        padding-bottom: .75rem;
        color: var(--c_secondary-dark);
        font-weight: 400;
        font-size: 20px;
      }

      &-list {
        color: var(--c_secondary-dark);
        font-weight: 400;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        &-item {
          display: flex;
          align-items: center;
          gap: 10px;

          &__mark {
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #9E9E9E;
            border-radius: 10rem;

            :deep(svg) {
              width: 44%;
              height: 44%;

              path {
                stroke: var(--c_white);
              }
            }
          }

          &__text {
            flex-grow: 1;
          }
        }
      }
    }

    .rate {
      width: var(--rate_width);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-left: 1rem;

      &-box {
        position: relative;
        width: 100%;
        padding: 3rem 2.5rem;
        margin-top: 7vh;
        background: linear-gradient(95.63deg, #D2ECFF 0%, #D6ECFF 9.37%, #F5E8FF 100%);
        box-shadow: 5px 6px 19px rgba(62, 72, 118, 0.04);
        border-radius: 24px;
        z-index: 1;

        &::before {
          content: '';
          position: absolute;
          top: -13px;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #1C31F0 0%, #141F81 10.94%, #0B0B0B 65.1%);
          backdrop-filter: blur(2.5px);
          border-radius: 24px;
          transform: matrix(1, 0.06, -0.07, 1, 0, 0);
          z-index: -1;
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(131.03deg, rgba(28, 49, 240, 0.5) 21.85%, rgba(20, 31, 129, 0.5) 39.4%, rgba(11, 11, 11, 0.5) 67.6%);
          backdrop-filter: blur(2.5px);
          border-radius: 24px;
          z-index: -1;
        }
      }

      &-title {
        color: var(--c_white);
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        text-align: center;
        text-transform: capitalize;
      }

      &-value {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        margin: 1rem auto;
        color: var(--c_white);
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        background-image: url('/img/g1171.svg');
        background-position: center;
        background-size: 88%;
        background-repeat: no-repeat;
        aspect-ratio: 1;

        &-percent {
          font-weight: 700;
          font-size: 50px;
          line-height: 68px;
          letter-spacing: 0.01em;
        }

        &-changes {
          display: flex;
          align-items: center;
          gap: 10px;

          &__icon {
            width: 1.25rem;
            height: 1.25rem;
          }

          &__value {
            color: var(--c_success);
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
          }
        }
      }

      &-desc {
        padding-bottom: 2.5rem;
        color: var(--c_white);
        line-height: 22px;
        text-align: center;
      }

      &-btn {
        padding: 1.5rem 2rem;
        margin-bottom: 2rem;
        color: var(--c_white);
        font-weight: 700;
        font-size: 20px;
        line-height: 22px;
        text-align: center;
        background: linear-gradient(90.86deg, #1C31F0 -2.12%, #931CF0 87.62%);
        box-shadow: 0px 16px 16px rgba(50, 50, 71, 0.08), 0px 24px 32px rgba(50, 50, 71, 0.08);
        border-radius: 10rem;
      }
    }
  }
}
</style>
