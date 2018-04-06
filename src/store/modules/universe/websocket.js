import * as types from '../../mutation-types'
import timer from './timer'
export const strict = false
const state = {
  socket: {
    isConnected: false,
    message: ''
  },
  pageviews: {
    current: {},
    previous: {}
  },
  totalViews: 0,
  computedStats: {},
  rdata: [],
  cdata: [],
  chdata: [],
  app: 'pageviews',
  client: {'aid': 'o19WonOrHQ', 'name': 'CNBC', 'mode': 2},
  iSocket: {},
  pubData: {},
  composerData: {},
  checkoutData: {},
  fullData: {},
  currentFilter: 'none',
  timeframe: {name: '10 minutes', id: 'minute'}
}

let wSocket = {}
const defaultRefresh = 500

const createSocket = function () {
  if (state.socket.isConnected) {
    wSocket.close()
  }
  let url = 'ws://172.31.22.33:9105/'
  if (state.app !== 'pageviews') {
    url += state.app + '/'
  }
  url += 'wsApp/' + state.client.aid
  wSocket = new WebSocket(url)
}

const switchTimeframe = function (timeframe) {
  const tfString = '{"type":"SetTimeFrame","value":{"timeFrameName":"' + timeframe.timeframe.id + '"}}'
  wSocket.send(tfString)
}

const resetFilter = function () {
  wSocket.send('{"type":"SetFilterEntity","value":{"entity":"total"}}')
}

const filterPaid = function () {
  wSocket.send('{"type":"SetNumberOfPaymentsFilter","value":{"min":0,"max":1000}}')
  wSocket.send('{"type":"SetFilterEntity","value":{"entity":"payment"}}')
}

const filterAdblock = function () {
  wSocket.send('{"type":"SetAdBlockFilter","value":{"values":["ON"]}}')
  wSocket.send('{"type":"SetFilterEntity","value":{"entity":"payment"}}')
}

const filterLoggedIn = function () {
  wSocket.send('{"type":"SetUserFilter","value":{"values":["LOGIN"]}}')
  wSocket.send('{"type":"SetFilterEntity","value":{"entity":"user"}}')
}

const mutations = {
  [types.OPEN_SOCKET] (state, socket) {
    state.iSocket = socket
    state.socket.isConnected = true
  },
  [types.CLOSE_SOCKET] (state) {
    state.socket.isConnected = false
  },
  [types.UPDATE_DATA] (state, message) {
    if (message.message.type === 'PageviewAggregationResultWrapper') {
      state.socket.message = message.message
      state.totalViews = message.message.value.data.count
      state.pubData = message.message.value.data
      state.pubData.user.values.forEach(uf => {
        if (uf.LOGIN) {
          // state.computedStats.loggedIn = Math.round((uf.LOGIN / state.totalViews) * 1000) / 10
          state.computedStats.loggedIn = uf.LOGIN
        }
      })
      state.pubData.adBlock.values.forEach(ua => {
        if (ua.OFF) {
          state.computedStats.adblock = Math.round((ua.OFF / state.totalViews) * 1000) / 10
        }
      })
    } else if (message.message.type === 'ComposerAggregationResultWrapper') {
      state.composerData = message.message
      console.log(state.composerData)
    } else if (message.message.type === 'CheckoutAggregationResultWrapper') {
      state.socket.message = message.message
      state.checkoutData = message.message
      console.log(state.checkoutData)
    }
  },
  [types.SELECT_APP] (state, app) {
    state.app = app.app.app
  },
  [types.SELECT_CLIENT] (state, client) {
    console.log(client)
    state.client = client.client.client
  },
  [types.SELECT_TIMEFRAME] (state, timeframe) {
    state.timeframe = timeframe.timeframe.timeframe
  },
  [types.SELECT_FILTER] (state, filter) {
    state.currentFilter = filter
  }
}

const actions = {
  updateData ({ commit, state }, message) {
    commit(types.UPDATE_DATA, {
      message: message
    })
  },
  openSocket ({ commit, state, dispatch }) {
    createSocket()
    commit(types.OPEN_SOCKET, {
      socket: wSocket
    })
    dispatch('listenSocket')
  },
  listenSocket ({ commit, state }) {
    wSocket.addEventListener('open', function (e) {
      self.intId = setInterval(function () {
        commit(types.INCREMENT_COUNT, {
        })
      }, defaultRefresh)
    })
    wSocket.addEventListener('message', function (e) {
      commit(types.RESET_COUNT, {
      })
      var message = JSON.parse(e.data)
      commit(types.UPDATE_DATA, {
        message: message
      })
    })
  },
  switchApp ({ commit, state, dispatch }, app) {
    commit(types.SELECT_APP, {
      app: app
    })
    console.log('Switching to ' + app)
    createSocket()
    commit(types.OPEN_SOCKET, {
      socket: wSocket
    })
    dispatch('openSocket')
    console.log('New socket created')
  },
  switchClient ({ commit, state, dispatch }, client) {
    commit(types.SELECT_CLIENT, {
      client: client
    })
    createSocket()
    commit(types.OPEN_SOCKET, {
      socket: wSocket
    })
    dispatch('openSocket')
  },
  switchTimeframe ({ commit, state, dispatch }, timeframe) {
    commit(types.RESET_COUNT, {
    })
    switchTimeframe(timeframe)
    commit(types.SELECT_TIMEFRAME, {
      timeframe: timeframe
    })
    dispatch('listenSocket')
  },
  filterReset ({ commit, state, dispatch }) {
    commit(types.RESET_COUNT, {
    })
    resetFilter()
    commit(types.SELECT_FILTER, {
      filter: 'none'
    })
  },
  changeFilterPaid ({ commit, state, dispatch }) {
    commit(types.RESET_COUNT, {
    })
    filterPaid()
    commit(types.SELECT_FILTER, {
      filter: 'paid'
    })
    dispatch('listenSocket')
  },
  changeFilterAdblock ({ commit, state, dispatch }) {
    commit(types.RESET_COUNT, {
    })
    console.log('Filtering Adblock')
    filterAdblock()
    commit(types.SELECT_FILTER, {
      filter: 'adblock'
    })
    dispatch('listenSocket')
  },
  changeFilterLoggedIn ({ commit, state, dispatch }) {
    commit(types.RESET_COUNT, {
    })
    filterLoggedIn()
    commit(types.SELECT_FILTER, {
      filter: 'loggedIn'
    })
    dispatch('listenSocket')
  }
}

export default {
  modules: {
    timer
  },
  state,
  mutations,
  actions
}
