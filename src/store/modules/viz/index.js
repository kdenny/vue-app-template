// import * as types from '../../mutation-types'

const state = {
  dashboardTables: {
    device: [
      {
        name: 'id',
        title: 'device',
        sortField: 'id'
      },
      {
        name: 'rel_percent',
        title: '% of pageviews'
      }
    ],
    contentSection: [
      {
        name: 'id',
        title: 'section',
        sortField: 'id'
      },
      {
        name: 'count',
        title: 'pageviews'
      }
    ],
    articleFields: [
      {
        name: 'id',
        title: 'url',
        sortField: 'id'
      },
      {
        name: 'count',
        title: 'pageviews'
      }
    ],
    authorFields: [
      {
        name: 'id',
        title: 'author name',
        sortField: 'id'
      },
      {
        name: 'count',
        title: 'pageviews'
      }
    ],
    countryFields: [
      {
        name: 'id',
        title: 'country',
        sortField: 'id'
      },
      {
        name: 'count',
        title: 'pageviews'
      }
    ],
    cityFields: [
      {
        name: 'id',
        title: 'city',
        sortField: 'id'
      },
      {
        name: 'count',
        title: 'pageviews'
      }
    ],
    referrerFields: [
      {
        name: 'id',
        title: 'referrer',
        sortField: 'id'
      },
      {
        name: 'count',
        title: 'pageviews'
      }
    ]
  },
  vitalsTables: {
    tags: [
      {
        name: 'tag',
        title: 'Tag'
      },
      {
        name: 'Nbr_Pageviews',
        title: 'Pageviews',
        sortField: 'id'
      },
      {
        name: 'rel_percent',
        title: 'rel_percent'
      },
      {
        name: 'content_type',
        title: 'Content Type'
      }
    ],
    contentSection: [
      {
        name: 'tag',
        title: 'Tag'
      },
      {
        name: 'Nbr_Pageviews',
        title: 'Pageviews',
        sortField: 'id'
      },
      {
        name: 'rel_percent',
        title: '%'
      },
      {
        name: 'content_type',
        title: 'Content Type'
      }
    ],
    contentAuthor: [
      {
        name: 'contentAuthor',
        title: 'Content Author'
      },
      {
        name: 'Nbr_Pageviews',
        title: 'Pageviews',
        sortField: 'id'
      },
      {
        name: 'rel_percent',
        title: '%'
      },
      {
        name: 'content_type',
        title: 'Content Type'
      }
    ],
    contentCreated: [
      {
        name: 'contentCreated',
        title: 'Created Date'
      },
      {
        name: 'Nbr_Pageviews',
        title: 'Pageviews',
        sortField: 'id'
      },
      {
        name: 'rel_percent',
        title: '%'
      },
      {
        name: 'content_type',
        title: 'Content Type'
      }
    ],
    zone: [
      {
        name: 'zone',
        title: 'Zone'
      },
      {
        name: 'Nbr_Pageviews',
        title: 'Pageviews',
        sortField: 'id'
      },
      {
        name: 'rel_percent',
        title: '%'
      }
    ]
  },
  scaleChart: {
    width: 575,
    height: 150,
    margins: {
      left: 50,
      right: 10,
      top: 0,
      bottom: 50
    }
  },
  heatmap: {
    width: 425,
    height: 250,
    margin: {
      left: 45,
      right: 0,
      top: 20,
      bottom: 60
    }
  }
}

const mutations = {
  // [types.TOGGLE_EXPAND_MENU_ITEM] (state, payload) {
  //   let menuItem = payload.menuItem
  //   let expand = payload.expand
  //   if (menuItem.children && menuItem.meta) {
  //     menuItem.meta.expanded = expand
  //   }
  // }
}

const actions = {
  // toggleExpandMenuItem ({commit}, payload) {
  //   commit(types.TOGGLE_EXPAND_MENU_ITEM, payload)
  // }
}

export default {
  state,
  mutations,
  actions
}
