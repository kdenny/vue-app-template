import lazyLoading from './lazyLoading'

export default {
  name: 'Charts',
  meta: {
    expanded: true,
    title: 'menu.charts',
    meta: {
      expanded: true
    },
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },
  children: [
    {
      name: 'CurrentCharts',
      path: '/charts',
      component: lazyLoading('dashboard/Dashboard'),
      meta: {
        title: 'Current Charts',
        default: true
      }
    },
    {
      name: 'NewChart',
      path: '/charts/new',
      component: lazyLoading('dashboard/Dashboard'),
      meta: {
        title: 'Define New Chart',
        default: true
      }
    }
  ]
}
