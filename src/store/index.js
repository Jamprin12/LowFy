import * as React from "react";
import songs from "songs/data.json";

const Store = React.createContext(null);

export const useStore = () => React.useContext(Store);

const initialState = {
  songs,
  currentSong: songs[Math.floor(Math.random() * songs.length)],
  audio: null,
  volume: 0
};

const reducer = (state, action) => {
  switch (action.payload) {
    case "PLAY":
      break;

    default:
      return state;
  }
};

export default function StoreProvider({ children }) {
  const store = React.useReducer(reducer, initialState);
  return <Store.Provider value={store}>{children}</Store.Provider>;
}
