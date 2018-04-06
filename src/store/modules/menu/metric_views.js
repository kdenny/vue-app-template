import lazyLoading from './lazyLoading'

export default {
  name: 'MetricView',
  meta: {
    expanded: true,
    title: 'menu.metricViews',
    meta: {
      expanded: true
    },
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },
  children: [
    {
      name: 'MetricViews',
      path: '/metric-views',
      component: lazyLoading('dashboard/Dashboard'),
      meta: {
        title: 'Views List'
      }
    },
    {
      name: 'MetricsBySource',
      path: '/pageviews/content',
      component: lazyLoading('pageviews/content/Content'),
      meta: {
        title: 'Define new view'
      }
    }
  ]
}
