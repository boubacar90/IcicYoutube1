import { NOW_PLAYING_UPDATE } from './types';

export const nowPlayingUpdate = ({ prop, value }) => {
  return {
    type: NOW_PLAYING_UPDATE,
    payload: { prop, value }
  }
}
