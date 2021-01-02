import * as React from 'react'
import { FaPlay as PlayIcon, FaPause as PauseIcon } from 'react-icons/fa'
import { useStore } from '../../store'

export default function Controls() {
  const [{ currentSong, volume, isPlay, audio, songs }, dispatch] = useStore()

  const prevSong = () => {
    if (!currentSong) return

    let song = songs.find((el) => el.id === currentSong.id - 1)

    if (!song) return

    dispatch({ type: 'CHANGE_SONG', payload: song })
  }

  const nextSong = () => {
    if (audio.currentTime === audio.duration) {
      if (!currentSong) return

      let song = songs.find((el) => el.id === currentSong.id + 1)

      if (!song) return
      dispatch({ type: 'CHANGE_SONG', payload: song })
    }

    if (!currentSong) return

    let song = songs.find((el) => el.id === currentSong.id + 1)

    if (!song) return

    dispatch({ type: 'CHANGE_SONG', payload: song })
  }

  const toggleSong = () => {
    if (!audio || !audio.src || !audio.currentSrc) return

    dispatch({ type: 'TOGGLE_SONG' })
    isPlay ? audio.play() : audio.pause()
  }

  return (
    <div className="actions-section">
      <button onClick={prevSong}>
        <i className="fas fa-angle-double-left"></i>
      </button>
      <button className="button-toggle" onClick={toggleSong}>
        {isPlay ? <PlayIcon /> : <PauseIcon />}
      </button>
      <button onClick={nextSong}>
        <i className="fas fa-angle-double-right"></i>
      </button>
      <div className="volume">
        <button
          className="button-volume"
          onClick={() => {
            document.querySelector('#volume').classList.toggle('active')
          }}
        >
          <i className="fas fa-volume-up"></i>
        </button>
        <input
          type="range"
          id="volume"
          max="100"
          min="0"
          value={volume}
          onChange={(e) => {
            dispatch({
              type: 'CHANGE_VOLUME',
              payload: e.target.value,
            })
            audio.volume = volume / 100
          }}
        />
      </div>
    </div>
  )
}
