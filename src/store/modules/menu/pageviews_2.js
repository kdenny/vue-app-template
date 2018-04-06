import lazyLoading from './lazyLoading'

export default {
  name: 'Pageviews2',
  meta: {
    title: 'menu.libraries',
    default: true,
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },
  path: '/dashboard',
  component: lazyLoading('dashboard/Dashboard')
}

