export default {
    folders: {
        permission: 'ireport.folders.manage',
        activated: true,
        authenticated: true,
        path: '/folders/index',
        name: 'qreports.admin.folders',
        crud : import('src/modules/qreports/_crud/folders'),
        page: () => import('modules/qcrud/_pages/admin/crudPage'),
        layout: () => import('src/layouts/master.vue'),
        title: 'ireports.cms.sidebar.reportsInfo',
        icon: 'fa-light fa-folder',
        subHeader: {
          refresh: true,
        }
    },
    report: {
      permission: 'ireport.reports.manage',
      activated: true,
      authenticated: true,
      path: '/report/index/:id',
      name: 'qreports.admin.report',
      page: () => import('src/modules/qreports/_pages/pageReport'),
      layout: () => import('src/layouts/master.vue'),
      title: 'ireports.cms.sidebar.reportInfo',
      icon: 'fa-light fa-file-chart-column',
      subHeader: {
        refresh: true,
        breadcrumb: ['qreports.folders']
      }
    },
    reportCreate: {
      permission: 'ireport.reports.create',
      activated: true,
      authenticated: true,
      path: '/report/create/',
      name: 'qreports.admin.reportCreate',
      page: () => import('src/modules/qreports/_components/reports/steppers'),
      layout: () => import('src/layouts/master.vue'),
      title: 'ireports.cms.sidebar.reportCreate',
      icon: 'fa-light fa-file-chart-column',
      subHeader: {
        refresh: true,
      }
    },
    reportEdit: {
      permission: 'ireport.reports.edit',
      activated: true,
      authenticated: true,
      path: '/report/edit/:id?',
      name: 'qreports.admin.reportEdit',
      page: () => import('modules/qreports/_components/reports/steppers'),
      layout: () => import('src/layouts/master.vue'),
      title: 'ireports.cms.sidebar.reportEdit',
      icon: 'fa-light fa-file-chart-column',
      subHeader: {
        refresh: true,
        breadcrumb: ['qreports.folders']
      }
    },
    reportType: {
      permission: 'ireport.report-types.manage',
      activated: true,
      authenticated: true,
      path: '/report-type',
      name: 'qreports.admin.reportType',
      crud: import('modules/qreports/_crud/reportType'),
      page: () => import('modules/qcrud/_pages/admin/crudPage'),
      layout: () => import('src/layouts/master.vue'),
      title: 'Report Type',
      icon: 'fa-light fa-file-chart-column',
      subHeader: {
        refresh: true,
      }
    },
}
