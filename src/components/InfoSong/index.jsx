import * as React from 'react'
import { useStore } from '../../store'

export default function InfoSong() {
  const [{ currentSong }] = useStore()

  return (
    <div className="info-song">
      <h3>{currentSong.title}</h3>
      <div className="duration-section">
        <div className="duration">
          <div className="now"></div>
        </div>
      </div>
    </div>
  )
}
