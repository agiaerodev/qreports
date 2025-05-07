
<template>
  <div class="stepper-report">
    <div
      class="
        tw-flex
        tw-flex-col
        sm:tw-flex-row
        sm:tw-items-end
        tw-justify-between
      "
    >
      <h2
        class="
          text-primary
          tw-text-2xl
          tw-font-semibold
          tw-mb-4"
      >
        {{  titleReport }}
      </h2>
      <div class="text-right tw-hidden">
        <q-btn
          rounded
          outline
          color="primary"
          label="Discard"
          class="q-mr-sm tw-mb-4"
          no-caps
        />
        <q-btn
          rounded
          color="primary"
          label="Save"
          class="tw-mb-4"
          no-caps
        />
      </div>
    </div>
    <q-stepper
      v-model="step"
      :contracted="$q.screen.lt.sm"
      ref="stepper"
      color="primary"
      alternative-labels
      active-color="primary"
      animated
      class="tw-bg-white tw-overflow-auto"
      :header-nav="!!this.reportId"
    >
      <q-step
        v-for="section in sections"
        :key="section.id"
        :name="section.id"
        :prefix="section.prefix"
        :title="section.title"
        :done="section.done"
        :error="section.error"
        :active-color="section.error ? 'red' : 'primary'"
      >
        <div>
          <q-form :ref="section.refs" class="qformClass">
            <component :is="section.component" />
          </q-form>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="text-right tw-border-t tw-z-0">
          <q-btn
            rounded
            no-caps
            outline
            label="Back"
            color="primary"
            v-if="step > 1"
            @click="formPrevious"
            class="
             tw-w-28
             q-mr-sm
             tw-mt-6
             text-sm
             btn-small
             rounded-sm"
          />
          <q-btn
            rounded
            no-caps
            color="primary"
            @click="saveFormReports"
            :label="step === sections.length ? 'Finish' : 'Next'"
            class="tw-w-28 tw-mt-6 text-sm btn-small"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
    <inner-loading :visible="loading" />
  </div>
</template>

<script>
import modelSections from "./sections/Model/sections.js";
import qReportsStore from "../../_store/qReportsStore.js";
import {
  STEP_DESCRIPTION,
  STEP_FEATURE,
} from "./sections/Model/constants.js";
import featureStore from "../../_store/sections/featureStore.js";
import sortStore from '../../_store/sections/sortStore.js';
export default {
  data() {
    return {
      step: STEP_DESCRIPTION,
    };
  },
  watch: {
    '$route.name': {
      deep: true,
      handler: function (newValue) {
        qReportsStore().reset();
        this.reset();
        const form = this.sections.find((item) => item.id === this.step);
        if(this.$refs[form.refs] && this.$refs[form.refs].length > 0) {
          this.step = STEP_DESCRIPTION;
          this.$refs[form.refs][0].reset();
        }
      }
    },
  },
  onBeforeMount() {
    this.$nextTick(function () {
      qReportsStore().reset();
      this.reset();
    });
  },
  created() {
    this.$nextTick(async function () {
      if(this.reportId) {
        await qReportsStore().showReport(this.reportId);
      }
    });
  },
  computed: {
    loading() {
      return qReportsStore().getLoading();
    },
    sortList() {
      return sortStore().getSortList()
    },
    sections() {
      return modelSections
        .filter(item => (this.sortList.length === 0 ? item.id !== 4 : true))
        .map(({ id, ...rest }, index) => ({ ...rest, id: index + 1, prefix: index + 1 }));
    },
    reportId() {
      return this.$route.params.id || null;
    },
    titleReport() {
      return this.reportId ? this.$tr('ireports.cms.sidebar.reportEdit')
        : this.$tr('ireports.cms.sidebar.reportCreate')
    },
  },
  methods: {
    async saveFormReports() {
      try {
        const form = this.sections.find((item) => item.id === this.step);

        if (this.$refs[form.refs] && this.$refs[form.refs].length > 0) {
          this.$refs[form.refs][0].validate().then(async (success) => {
            if (success) {
              if (this.step === STEP_FEATURE) {
                if (
                  featureStore().getSelectedColumns().length === 0
                ) {
                  form.error = true;
                  this.$alert.error({
                    message: this.$tr('ireports.cms.message.selectColumn'),
                  });
                  return;
                }
              }
              if (this.step === this.sections.length) {
                await qReportsStore().saveReport(this.reportId);
                await this.$alert.success({
                    message: this.reportId ? 'The report was updated correctly'
                      :'the report was saved correctly',
                });
                this.$router.push({ name: "qreports.admin.folders" });
                return;
              }
              form.error = false;
              form.done = true;
              this.$refs.stepper.next();
              return;
            }
            form.error = true;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    formPrevious() {
        this.$refs.stepper.previous()
    },
    reset() {
      this.sections.forEach(element => {
        element.error = false;
        element.done = false;
      });
    },
  },
};
</script>
<style>
.stepper-report .q-stepper .q-stepper-title {
  @apply tw-relative tw-mb-6 tw-overflow-x-hidden;
}
.stepper-report .q-stepper .q-stepper-title > h3 {
  @apply tw-text-lg tw-font-bold tw-bg-white tw-pr-4 tw-inline-block tw-relative;
  z-index: 1;
}
.stepper-report .q-stepper .q-stepper-title > div {
  @apply tw-block tw-w-full tw-h-px tw-bg-gray-200 tw-top-2/4 tw-absolute tw-z-0;
}
.stepper-report .q-stepper {
  @apply tw-rounded-xl tw-border tw-shadow-none;
  border-color: #f1f4fa;
}
.stepper-report .q-stepper__header {
  @apply tw-border-b-0;
}

.stepper-report .q-stepper__tab .q-stepper__dot {
  @apply sm:tw-w-10 sm:tw-h-10 tw-font-bold sm:tw-text-base tw-border-0;
}
.stepper-report .q-stepper__tab:not(.q-stepper__tab--active) .q-stepper__dot {
  @apply tw-border-2;
  background-color: transparent;
  border-color: #cccccc;
}
.stepper-report
  .q-stepper__tab:not(.q-stepper__tab--active)
  .q-stepper__dot
  span {
    color: #808080;
}
.stepper-report .q-stepper__tab--active .q-stepper__dot {
  @apply tw-border-current tw-border-2;
}
.stepper-report .q-stepper__tab--active .q-stepper__dot span {
  @apply tw-text-white;
}
.stepper-report .q-stepper .q-stepper__dot:before {
  margin-right: 2px;
}
.stepper-report .q-stepper .q-stepper__dot:after {
  margin-left: 2px;
}
.stepper-report .q-stepper .q-stepper__line:after,
.stepper-report .q-stepper .q-stepper__line:before {
  @apply tw-h-0.5;
  background-color: #cccccc;
}
.stepper-report .q-stepper__title {
  font-size: 0.5rem;
  color: #808080;
  @apply tw-font-bold sm:tw-text-xs md:tw-text-base;
}

.stepper-report .q-stepper__tab--done .q-stepper__dot span,
.stepper-report .q-stepper__tab--done .q-stepper__title,
.stepper-report .q-stepper__tab--active .q-stepper__title {
  color: var(--q-primary) !important;
}
.stepper-report .q-stepper__tab--done .q-stepper__dot {
  border-color: var(--q-primary) !important;
  color: var(--q-primary) !important;
}
.stepper-report .q-stepper__tab--done .q-stepper__dot:after,
.stepper-report .q-stepper__tab--done .q-stepper__dot:before {
  background-color: var(--q-primary) !important;
}
.stepper-report .q-stepper__tab--done.q-stepper__tab--active .q-stepper__dot span {
  color: #fff !important;
}
.stepper-report .q-stepper__nav {
  background-color: #fafafa;
}

.stepper-report .q-stepper__tab--error-with-icon .q-stepper__dot {
  background: red !important;
}
.input-report .q-field.q-field--float .q-field__label {
  @apply tw-font-medium;
  color: var(--q-primary);
}
.radio-report .q-field .q-field__label {
  @apply tw-font-medium tw-top-0 tw-text-black;
  height: 30px;
  transform: none !important;
}
.radio-report .q-radio__label {
  @apply tw-text-black;
}
.input-report .q-field__bottom .q-field__messages {
  @apply tw-text-xs;
  color: #818181;
}
.input-report .q-field__bottom .q-field__counter {
  @apply tw-text-xs;
}
.input-report-nolabel .q-field .q-field__label {
  @apply tw-font-medium;
  color: var(--q-primary);
}
.input-report .q-field .q-field__native input {
  @apply lg:tw--mt-3;
}
.input-report-nolabel .q-field--labeled .q-field__control-container {
  @apply lg:tw-pt-px !important;
}
/*.input-report .q-icon,*/
.input-report-nolabel .q-select__dropdown-icon {
  color: var(--q-primary);
}
</style>
