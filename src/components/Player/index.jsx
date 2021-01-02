import * as React from 'react'
import InfoSong from '../InfoSong'
import { useStore } from '../../store'
import SelectSong from '../SelectSong'
import Controls from '../Controls'

export default function Player() {
  const [{ volume, currentSong, audio }, dispatch] = useStore()

  React.useEffect(() => {
    dispatch({
      type: 'SET_AUDIO',
      payload: document.querySelector('#audio'),
    })
  }, [])

  const onLoading = () => {
    audio.volume = volume
  }

  const currentTime = () => {
    document.querySelector('.now').style.width = audio.currentTime + 'px'
  }

  return (
    <div className="audio-wrapper" onLoad={onLoading}>
      <audio
        id="audio"
        src={currentSong.url}
        onTimeUpdate={currentTime}
      ></audio>
      <Controls />
      <SelectSong />
      <InfoSong />
    </div>
  )
}
