import React from 'react';

const TrackLyrics = (props) => {
  return (
    <div className='card music-panel'>
      <div className='card-body'>
        <h5 className='card-title'>Lyrics for {props.track.title}</h5>
        <p className='card-text'>{props.track.lyrics}</p>
      </div>
    </div>
  );
};

export default TrackLyrics;