import * as types from '../../mutation-types'
export const strict = false
const state = {
  tuningData: null,
  dashboardData: null,
  urls: {
    tuning: 'http://localhost:8000/reports/client_vitals/',
    dashboard: 'http://localhost:8000/reports/dashboard/'
  },
  form: {
    aid: 'o19WonOrHQ',
    homepage: 'http://www.cnbc.com',
    startDate: '2018-02-01',
    endDate: '2018-02-15'
  }
}

const queryApi = function (url, formData) {
  this.$http.post(url, formData).then(response => {
    return JSON.parse(response.body)
  })
}

const queryDashboardApi = function (url, formData) {
  this.$http.post(url, formData).then(response => {
    return JSON.parse(response.body)
  })
}

const mutations = {
  [types.LOAD_TUNING_DATA] (state) {
    state.form.aid = state.websocket.client.aid
    state.tuningData = queryApi(state.urls.tuning, state.form)
  },
  [types.LOAD_DASHBOARD_DATA] (state) {
    state.form.aid = state.websocket.client.aid
    state.dashboardData = queryDashboardApi(state.urls.dashboard, state.form)
  }
}

const actions = {
  loadTuningData ({ commit, state }, message) {
    commit(types.LOAD_TUNING_DATA, {})
  },
  loadDashboardData ({ commit, state }) {
    commit(types.LOAD_DASHBOARD_DATA, {})
  }
}

export default {
  state,
  mutations,
  actions
}
