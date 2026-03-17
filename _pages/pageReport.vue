<template>
  <div>
    <crud
      v-if="!loading"
      :crud-data="import('modules/qreports/_crud/report.vue')"
      :custom-data="crudData"
      ref="crudRequests"
    />
  </div>
</template>
<script>
import fieldsDetailsStore from "../_store/sections/fieldsDetailsStore.js";
import _ from "lodash";
import { QSpinnerFacebook } from 'quasar'
import { SORT_ASC, SORT_DESC } from '../_components/reports/sections/Model/constants.js';
import { ASCENDING } from '../_store/sections/model/constants.js';
import { cache } from "src/plugins/utils";

export default {
  data() {
    return {
      columns: [],
      filters: {},
      sort: {},
      loading: true,
    };
  },
  created() {
    this.$nextTick(async function () {
      await cache.set('app.data.filters', {})
      this.getCrudReport();
    });
  },
  computed: {
    //Crud info
    reportId() {
      return this.$route.params?.id || null;
    },
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    },
    module() {
      return this.$helper.getInfoFromPermission(this.$route.meta.permission)?.module || '';
    },
    crudData() {
      return {
        read: {
          search: false,
          columns: [...this.columns],
          filters: {
            ...this.filters,
            reportId: {
              value: this.reportId
            },
          },
          requestParams: {
            order: { ...this.sort },
          },
        },
        configNameCustom: `${this.module}.config.quickCards.report-${this.reportId}`,
      };
    },
  },
  methods: {
    async getCrudReport() {
      try {
        this.loading = true;
        await this.$q.loading.show({
          spinner: QSpinnerFacebook,
          spinnerColor: 'blue',
          spinnerSize: 140,
          backgroundColor: 'white',
          message: this.$tr('ireports.cms.message.waitMoment'),
          messageColor: 'black'
        })
        const response = await this.$crud.show(
          "apiRoutes.qreports.reports",
          this.reportId,
          {
            refresh: true,
            params: {
              include: "reportType",
            },
          }
        );
        if (response.data.reportType) {
          this.columns = await this.getColumns(response.data);
          const filterList = await this.getFilter(response.data);
          this.sort = await this.getSort(response.data);
          this.filters = await fieldsDetailsStore().buildfilters(
            filterList,
            true
          );
        }
        await this.$q.loading.hide();
        this.loading = false;
      } catch (error) {
        this.$q.loading.hide();
        this.loading = false;
      }
    },
    async getColumns(data) {
      try {
        const columns = data.columns || [];
        return columns
          .map((item) => ({
            name: item,
            label: item,
            field: item,
            align: "left",
            format: (val) => (val ? val : "-"),
          }))
          .filter((column) =>
            data.columns.some((item) => item === column.field)
          );
      } catch (error) {
        console.log(error);
      }
    },
    async getFilter(data) {
      try {
        const filters = data.reportType.filters || {};
        return Object.keys(filters)
          .map((item) => {
            const existeField = Object.keys(data.filters || {}).some(
              (filter) => _.camelCase(filter) === item
            );
            filters[item].value = existeField
              ? data.filters[item]
              : null;
            return {
              id: item,
              title: filters[item].props.label,
              ...filters[item],
            };
          })
          .filter((filter) => {
            const filterObject = Object.keys(data.filters || {});
            return filterObject.some((item) => item === filter?.id);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async getSort(data) {
      try {
        const dataSort = data.sort || {};
        const sort = {};
        Object.keys(dataSort).forEach((item) => {
          sort[item] = dataSort[item] === ASCENDING ? SORT_ASC : SORT_DESC;
        });
        return sort;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
  