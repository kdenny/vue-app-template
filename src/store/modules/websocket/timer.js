import * as types from '../../mutation-types'
export const strict = false

const state = {
  timerCount: 0
}

const mutations = {
  [types.RESET_COUNT] (state) {
    state.timerCount = 0
  },
  [types.INCREMENT_COUNT] (state) {
    state.timerCount += 1
  }
}

export default {
  state,
  mutations
}
