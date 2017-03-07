import { ADD_SONG_TO_PLAYLIST } from '../actions/types';

const INITIAL_STATE = {
  temp: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SONG_TO_PLAYLIST:
      return { ...state }
    default:
      return state

  }
}
