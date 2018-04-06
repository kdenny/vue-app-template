import lazyLoading from './lazyLoading'

export default {
  name: 'Metrics',
  meta: {
    expanded: true,
    title: 'menu.metrics',
    meta: {
      expanded: true
    },
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },
  children: [
    {
      name: 'MetricStatus',
      path: '/metric-status',
      component: lazyLoading('dashboard/Dashboard'),
      meta: {
        title: 'Metric Status'
      }
    },
    {
      name: 'MetricsBySource',
      path: '/pageviews/content',
      component: lazyLoading('pageviews/content/Content'),
      meta: {
        title: 'By Data Source'
      }
    }
  ]
}
