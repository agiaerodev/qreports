import pages from 'src/setup/pages' // Get Pages from config
export default [

  {
    title: 'ireports.cms.sidebar.reportsInfo',
    icon: 'fal fa-file-alt',
    children: [
      pages.qreports.folders,
      pages.qreports.reportCreate,
      pages.qreports.reportType,
    ]
  },
]
