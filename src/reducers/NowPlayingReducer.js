import { NOW_PLAYING_UPDATE } from '../actions/types'

const INITIAL_STATE = {
  uri: 'hhhooRlEKIM.mp4',
  maxSeconds: 0,
  minSeconds: 0,
  currentSeconds: 20,
  paused: false
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case NOW_PLAYING_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value }
    default:
      return state
  }
}
