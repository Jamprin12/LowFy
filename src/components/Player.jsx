import React, { useState, useEffect } from "react";
import data from "../services/data.json";

export default function Player() {
  // const [search, setSearch] = useState("lofi");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(
    data[Math.floor(Math.random() * data.length)]
  );
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    setSongs(data);
    setAudio(document.querySelector("#song"));
    setVolume(document.querySelector("#volume").value / 100);
  }, []);

  const onLoading = () => {
    audio.volume = volume;
    playSong();
  };

  const prevSong = async () => {
    if (!currentSong) return;

    let song = songs.find((el) => el.id === currentSong.id - 1);

    if (!song) return;

    await setCurrentSong(song);
    playSong();
  };

  const nextSong = async () => {
    if (audio.currentTime === audio.duration) {
      if (!currentSong) return;

      let song = songs.find((el) => el.id === currentSong.id + 1);

      if (!song) return;

      await setCurrentSong(song);
      playSong();
    }

    if (!currentSong) return;

    let song = songs.find((el) => el.id === currentSong.id + 1);

    if (!song) return;

    setCurrentSong(song);
    playSong();
  };

  const playSong = async () => {
    if (!audio || !audio.src) return;
    document
      .querySelector(".button-toggle i")
      .classList.replace("fa-play", "fa-pause");

    if (!audio.currentSrc) return;

    await audio.play();
  };

  const pauseSong = async () => {
    if (!audio || !audio.src) return;
    document
      .querySelector(".button-toggle i")
      .classList.replace("fa-pause", "fa-play");
    await audio.pause();
  };

  const selectSong = (e) => {
    let song = songs.find((song) => song.title === e.target.value);
    document.querySelector(".duration").style.width = song.duration + "px";
    setCurrentSong(song);
    playSong();
  };

  const currentTime = () => {
    document.querySelector(".now").style.width = audio.currentTime + "px";
  };

  return (
    <div className="audio-wrapper" onLoad={onLoading}>
      <div className="actions-section">
        <button onClick={prevSong}>
          <i className="fas fa-angle-double-left"></i>
        </button>
        <button
          className="button-toggle"
          onDoubleClick={pauseSong}
          onClick={playSong}
        >
          <i className="fas fa-play"></i>
        </button>
        <button onClick={nextSong}>
          <i className="fas fa-angle-double-right"></i>
        </button>
        <div className="volume">
          <button
            className="button-volume"
            onClick={() => {
              document.querySelector("#volume").style.width = 20 + "vw";
            }}
            onDoubleClick={() => {
              document.querySelector("#volume").style.width = 0 + "vw";
            }}
          >
            <i className="fas fa-volume-up"></i>
          </button>
          <input
            type="range"
            id="volume"
            max="100"
            min="0"
            onChange={(e) => {
              setVolume(e.target.value / 100);
              audio.volume = volume;
            }}
          />
        </div>
      </div>
      <div className="songs">
        <audio
          src={currentSong.url}
          id="song"
          onTimeUpdate={currentTime}
          onEnded={nextSong}
        ></audio>
        <select className="select-song" onClick={selectSong}>
          {songs.map((song) => (
            <option key={song.id} value={song.title}>
              {song.title}
            </option>
          ))}
        </select>
      </div>
      <div className="info-song">
        <h3>{currentSong.title}</h3>
        <div className="duration-section">
          <div className="duration">
            <div className="now"></div>
          </div>
        </div>
      </div>
      {/* <div className="searcher">
        <input
          type="text"
          onChange={handleInput}
          value={search}
          placeholder="Search"
        />
      </div> */}
    </div>
  );
}
