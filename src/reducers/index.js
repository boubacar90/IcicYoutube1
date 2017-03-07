import { combineReducers } from 'redux';
import PlaylistsReducer from './PlaylistsReducer';
import NowPlayingReducer from './NowPlayingReducer';

export default combineReducers({
  playlists: PlaylistsReducer,
  nowPlaying: NowPlayingReducer
});
