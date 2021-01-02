import React from "react";

export default function InfoSong({ currentSong }) {
  return (
    <div className="info-song">
      <h3>{currentSong.title}</h3>
      <div className="duration-section">
        <div className="duration">
          <div className="now"></div>
        </div>
      </div>
    </div>
  );
}
