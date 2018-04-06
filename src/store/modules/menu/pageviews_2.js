import lazyLoading from './lazyLoading'

export default {
  name: 'Pageviews2',
  meta: {
    expanded: true,
    title: 'menu.pageviews',
    meta: {
      expanded: true
    },
    iconClass: 'vuestic-icon vuestic-icon-maps'
  },
  children: [
    {
      name: 'PageviewDashboard',
      path: '/dashboard',
      component: lazyLoading('dashboard/Dashboard'),
      meta: {
        title: 'Dashboard',
        default: true
      }
    },
    {
      name: 'ContentPage',
      path: '/pageviews/content',
      component: lazyLoading('pageviews/content/Content'),
      meta: {
        title: 'Content'
      }
    },
    {
      name: 'ContentDashboard',
      path: '/pageviews/content-analytics',
      component: lazyLoading('pageviews/content/analytics/HelloWorld'),
      meta: {
        title: 'Content Analytics'
      }
    },
    // {
    //   name: 'TrafficPage',
    //   path: '/pageviews/traffic-volume',
    //   component: lazyLoading('pageviews/traffic-volume/TrafficVolume'),
    //   meta: {
    //     title: 'Traffic Volume'
    //   }
    // },
    {
      name: 'UserAgentPage',
      path: '/pageviews/user-agent',
      component: lazyLoading('pageviews/user-agent/UserAgent'),
      meta: {
        title: 'User Agent'
      }
    },
    {
      name: 'GeographyPage',
      path: '/pageviews/geography',
      component: lazyLoading('pageviews/geography/Geography'),
      meta: {
        title: 'Geography'
      }
    },
    {
      name: 'ReferrerPage',
      path: '/pageviews/referrer',
      component: lazyLoading('pageviews/referrer/Referrer'),
      meta: {
        title: 'Referrer'
      }
    }
  ]
}
