import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module

import app from './modules/app'
import websocket from './modules/websocket/websocket'
// import api from './modules/bigqueryAPI/api'
import menu from './modules/menu'
import viz from './modules/viz'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
    websocket,
    menu,
    viz
  },
  state: {},
  mutations: {}
})

Vue.use(VuexI18n.plugin, store)

export default store
