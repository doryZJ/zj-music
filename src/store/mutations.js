import * as types from './mutations_types'

const mutations = {
  [types.SET_SINGER]: (state, singer) => {
    state.singer = singer
  },
  [types.SET_PLAYING]: (state, flag) => {
    state.playing = flag
  },
  [types.SET_FULLSCREEN]: (state, flag) => {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST]: (state, list) => {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST]: (state, list) => {
    state.sequenceList = list
  },
  [types.SET_MODE]: (state, mode) => {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX]: (state, index) => {
    state.currentIndex = index
  }
}

export default mutations
