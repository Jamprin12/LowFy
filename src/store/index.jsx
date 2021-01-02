import * as React from 'react';
import songs from '../songs/data.json';

const Store = React.createContext(null);

export const useStore = () => React.useContext(Store);

const initialState = {
  songs,
  currentSong: songs[Math.floor(Math.random() * songs.length)],
  audio: null,
  volume: 0,
  isPlay: false,
  audio: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUDIO':
      return { ...state, audio: action.payload };
    case 'TOGGLE_SONG':
      return { ...state, isPlay: !state.isPlay };
    case 'CHANGE_VOLUME':
      return {
        ...state,
        volume: action.payload,
      };
    case 'CHANGE_SONG':
      return {
        ...state,
        currentSong: action.payload,
      };
    default:
      return state;
  }
};

export default function StoreProvider({ children }) {
  const store = React.useReducer(reducer, initialState);
  return <Store.Provider value={store}>{children}</Store.Provider>;
}
