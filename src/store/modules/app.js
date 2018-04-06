import * as types from '../mutation-types'

const state = {
  sidebar: {
    opened: false,
    withoutAnimation: false
  },
  config: {
    googleMaps: {
      apiKey: 'AIzaSyBNAqPrTQoz9P4NBlDDyfxrnKiafkaL8iQ'
    },
    windowMatchSizeLg: '(min-width: 992px)',
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd'
    },
    chartPalette: [
      '#f6a39f',
      '#5ecee9',
      '#fd9cba',
      '#90d1a4',
      '#eaa5c3',
      '#dbe9a8',
      '#dcb4e5',
      '#b1bf81',
      '#a4bfeb',
      '#f6d89e',
      '#79cac4',
      '#ecb489',
      '#9dede5',
      '#e3b298',
      '#c3f3ca',
      '#e7b2b7',
      '#a6cca7',
      '#ccba8f',
      '#e3e2b9',
      '#bbc49a']
  },
  activeData: 'websocket',
  isLoading: true
}

const mutations = {
  [types.CLOSE_MENU] (state) {
    if (document.documentElement.clientWidth < 992) {
      state.sidebar.opened = false
    }
  },
  [types.TOGGLE_SIDEBAR] (state, opened) {
    state.sidebar.opened = opened
  },
  [types.SWITCH_ACTIVE_DATA] (state, active) {
    state.activeData = active
  },
  [types.TOGGLE_WITHOUT_ANIMATION] (state, value) {
    state.sidebar.withoutAnimation = value
  },
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}

const actions = {
  closeMenu ({ commit }) {
    commit(types.CLOSE_MENU)
  },
  toggleSidebar ({ commit }, opened) {
    commit(types.TOGGLE_SIDEBAR, opened)
  },
  switchActiveData ({ commit }, active) {
    commit(types.SWITCH_ACTIVE_DATA, active)
  },
  isToggleWithoutAnimation ({ commit }, value) {
    commit(types.TOGGLE_WITHOUT_ANIMATION, value)
  }
}

export default {
  state,
  mutations,
  actions
}
