import React from 'react';
import { useStore } from '../../store';

export default function SelectSong() {
  const [{ songs }, dispatch] = useStore();

  const selectSong = (e) => {
    let song = songs.find((song) => song.title === e.target.value);
    document.querySelector('.duration').style.width = song.duration + 'px';
    dispatch({ type: 'CHANGE_SONG', payload: song });
  };

  return (
    <div className="songs">
      <select className="select-song" onClick={selectSong}>
        {songs.map((song) => (
          <option key={song.id} value={song.title}>
            {song.title}
          </option>
        ))}
      </select>
    </div>
  );
}
