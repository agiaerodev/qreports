<template>
    
</template>
<script>

export default {
  computed: {
    crudData() {
      return {
        crudId: this.$uid(),
        apiRoute: 'apiRoutes.qreports.reportTypes',
        permission: 'ireport.report-types',
        read: {
          columns: [
            {
              name: "id",
              label: this.$tr("isite.cms.form.id"),
              field: "id",
              style: "width: 50px",
            },
            {
              name: "name",
              label: this.$tr("isite.cms.form.name"),
              field: "name",
              align: "left",
            },
            {
              name: "entity",
              label: this.$tr("isite.cms.label.entity"),
              field: "entity",
              format: val => val ? val : '-',
              align: "left",
            },
            {
              name: "procedureName",
              label: this.$tr("ireports.cms.label.procedureName"),
              field: "procedureName",
              format: val => val ? val : '-',
              align: "left",
            },
            {
              name: "actions",
              label: this.$tr("isite.cms.form.actions"),
              align: "left",
            },
          ],
        },
        create: {
          title: "Create report type",
        },
        update: {
          title: "Update report type",
        },
        delete: true,
        formLeft: {
          id: {
            value: null,
          },
          name: {
            name: "name",
            value: "",
            type: "input",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: `${this.$tr("isite.cms.form.name")}*`,
              clearable: true,
              color: "primary",
            },
          },
          entity: {
            name: "entity",
            value: "",
            type: "input",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: `${this.$tr("isite.cms.label.entity")}*`,
              clearable: true,
              color: "primary",
              "hide-bottom-space": false,
            },
          },
          procedureName: {
            value: "",
            type: "input",
            props: {
              label: this.$tr("ireports.cms.label.procedureName"),
              clearable: true,
              color: "primary",
              "hide-bottom-space": false,
            },
          },
          columns: {
            value: [],
            type: "json",
            props: {
              label: this.$tr("ireports.cms.label.columns"),
            },
          },
          filters: {
            value: [],
            type: "json",
            props: {
              label: this.$tr("ireports.cms.label.filters"),
            },
          },
          sort: {
            value: [],
            type: "json",
            props: {
              label: this.$tr("ireports.cms.label.sort"),
            },
          }
        },
      };
    },
  },
};
</script>
