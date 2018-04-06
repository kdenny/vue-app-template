// import * as types from '../../mutation-types'
// import Vue from 'vue'
export const strict = false
const state = {
  libraries: null,
  tags: null,
  metricStatus: null,
  metricViews: null,
  charts: null
}

// const createSocket = function () {
//   if (state.socket.isConnected) {
//     wSocket.close()
//   }
//   let url = 'ws://172.31.22.33:9105/'
//   if (state.app !== 'pageviews') {
//     url += state.app + '/'
//   }
//   url += 'wsApp/' + state.client.aid
//   wSocket = new WebSocket(url)
// }
//
// const numberWithCommas = (x) => {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// }

const mutations = {
  // [types.OPEN_SOCKET] (state, socket) {
  //   state.socket.isConnected = true
  // },
  // [types.CLOSE_SOCKET] (state) {
  //   state.socket.isConnected = false
  // },
  // [types.UPDATE_DATA] (state, message) {
  //   state.updateCount += 1
  //   if (message.message.type === 'PageviewAggregationResultWrapper') {
  //     state.socket.message = message.message
  //     state.totalViews = message.message.value.data.count
  //     state.pubData = message.message.value.data
  //     state.pubData.user.values.forEach(uf => {
  //       if (uf.LOGIN) {
  //         state.computedStats.loggedIn = numberWithCommas(uf.LOGIN)
  //       }
  //       if (uf.ANON) {
  //         state.computedStats.anon = numberWithCommas(uf.ANON)
  //       }
  //     })
  //     state.pubData.adBlock.values.forEach(ua => {
  //       if (ua.OFF) {
  //         state.computedStats.adblock = Math.round((ua.OFF / state.totalViews) * 1000) / 10
  //       }
  //     })
  //   }
  //   if (state.updateCount > 2) {
  //     state.loading = false
  //   }
  //   if (state.switchCount) {
  //     if (state.updateCount > state.switchCount + 4) {
  //       state.switching = false
  //     }
  //   }
  // },
  // [types.SELECT_APP] (state, app) {
  //   state.updateCount = 0
  //   state.app = app.app.app
  // },
  // [types.SELECT_CLIENT] (state, client) {
  //   console.log(client)
  //   state.client = client.client.client
  //   state.form.aid = state.client.aid
  // },
  // [types.SELECT_TIMEFRAME] (state, timeframe) {
  //   state.timeframe = timeframe.timeframe.timeframe
  //   state.updateCount += 1
  //   if (state.updateCount > 3) {
  //     state.switching = true
  //     state.switchCount = state.updateCount
  //   }
  // },
  // [types.SELECT_FILTER] (state, filter) {
  //   state.currentFilter = filter
  // },
  // [types.LOAD_TUNING_DATA] (state, tuningData) {
  //   state.tuningData = tuningData
  // },
  // [types.LOAD_DASHBOARD_DATA] (state, dashboardData) {
  //   state.dashboardData = dashboardData
  // },
  // [types.LOAD_CONTENT_DATA] (state, contentData) {
  //   state.contentData = contentData
  // }
}

const actions = {
  // updateData ({ commit, state }, message) {
  //   console.log(state.updateCount)
  //   if (state.updateCount > 0) {
  //     commit(types.UPDATE_DATA, {
  //       message: message
  //     })
  //   } else {
  //     console.log('First update')
  //     commit(types.SELECT_TIMEFRAME, {
  //       timeframe: {
  //         timeframe: {name: 'Past hour', id: 'hour'}
  //       }
  //     })
  //   }
  // },
  // openSocket ({ commit, state, dispatch }) {
  //   createSocket()
  //   commit(types.OPEN_SOCKET, {
  //     socket: wSocket
  //   })
  //   dispatch('listenSocket')
  // },
  // listenSocket ({ commit, state }) {
  //   wSocket.addEventListener('open', function (e) {
  //     self.intId = setInterval(function () {
  //       commit(types.INCREMENT_COUNT, {
  //       })
  //     }, defaultRefresh)
  //   })
  //   wSocket.addEventListener('message', function (e) {
  //     commit(types.RESET_COUNT, {
  //     })
  //     if (state.updateCount > 0) {
  //       var message = JSON.parse(e.data)
  //       commit(types.UPDATE_DATA, {
  //         message: message
  //       })
  //     } else {
  //       let tf = {timeframe: {name: 'Past hour', id: 'hour'}}
  //       switchTimeframe(tf)
  //       commit(types.SELECT_TIMEFRAME, {
  //         timeframe: tf
  //       })
  //     }
  //   })
  // },
  // switchApp ({ commit, state, dispatch }, app) {
  //   commit(types.SELECT_APP, {
  //     app: app
  //   })
  //   console.log('Switching to ' + app)
  //   createSocket()
  //   commit(types.OPEN_SOCKET, {
  //     socket: wSocket
  //   })
  //   dispatch('openSocket')
  // },
  // switchClient ({ commit, state, dispatch }, client) {
  //   commit(types.SELECT_CLIENT, {
  //     client: client
  //   })
  //   createSocket()
  //   commit(types.OPEN_SOCKET, {
  //     socket: wSocket
  //   })
  //   dispatch('openSocket')
  // },
  // switchTimeframe ({ commit, state, dispatch }, timeframe) {
  //   commit(types.RESET_COUNT, {
  //   })
  //   switchTimeframe(timeframe)
  //   commit(types.SELECT_TIMEFRAME, {
  //     timeframe: timeframe
  //   })
  //   dispatch('listenSocket')
  // },
  // filterReset ({ commit, state, dispatch }) {
  //   commit(types.RESET_COUNT, {
  //   })
  //   resetFilter()
  //   commit(types.SELECT_FILTER, {
  //     filter: 'none'
  //   })
  // },
  // changeFilterPaid ({ commit, state, dispatch }) {
  //   commit(types.RESET_COUNT, {
  //   })
  //   filterPaid()
  //   commit(types.SELECT_FILTER, {
  //     filter: 'paid'
  //   })
  //   dispatch('listenSocket')
  // },
  // changeFilterAdblock ({ commit, state, dispatch }) {
  //   commit(types.RESET_COUNT, {
  //   })
  //   console.log('Filtering Adblock')
  //   filterAdblock()
  //   commit(types.SELECT_FILTER, {
  //     filter: 'adblock'
  //   })
  //   dispatch('listenSocket')
  // },
  // changeFilterLoggedIn ({ commit, state, dispatch }) {
  //   commit(types.RESET_COUNT, {
  //   })
  //   filterLoggedIn()
  //   commit(types.SELECT_FILTER, {
  //     filter: 'loggedIn'
  //   })
  //   dispatch('listenSocket')
  // },
  // loadTuningData ({ commit, state }) {
  //   console.log('Loading data')
  //   Vue.http.post(state.urls.tuning, state.form).then(response => {
  //     commit(types.LOAD_TUNING_DATA, {
  //       tuningData: JSON.parse(response.body)
  //     })
  //   })
  // },
  // loadDashboardData ({ commit, state }) {
  //   Vue.http.post(state.urls.dashboard, state.form).then(response => {
  //     commit(types.LOAD_DASHBOARD_DATA, {
  //       dashboardData: JSON.parse(response.body)
  //     })
  //   })
  // },
  // loadContentData ({ commit, state }) {
  //   Vue.http.post(state.urls.content, state.form).then(response => {
  //     commit(types.LOAD_CONTENT_DATA, {
  //       contentData: JSON.parse(response.body)
  //     })
  //   })
  // }
}

export default {
  // modules: {
  //   timer
  // },
  state,
  mutations,
  actions
}
