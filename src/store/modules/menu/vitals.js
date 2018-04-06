import lazyLoading from './lazyLoading'

export default {
  name: 'Vitals',
  meta: {
    title: 'menu.vitals',
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },
  children: [
    {
      name: 'TuningDetail',
      path: '/tuning-detail',
      component: lazyLoading('vitals-dashboard/tuning/TuningDetail'),
      meta: {
        // expanded: true,
        title: 'menu.tuning',
        iconClass: 'vuestic-icon vuestic-icon-maps'
      }
    }
  ]
}
