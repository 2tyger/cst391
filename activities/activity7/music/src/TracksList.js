import React from 'react';
import TrackTitle from './TrackTitle';

const TracksList = (props) => {
  return (
    <div className='list-group'>
      {props.tracks.map((track) => (
        <TrackTitle
          key={track.id}
          track={track}
          isSelected={track.id === props.selectedTrackId}
          onSelect={props.onSelectTrack}
        />
      ))}
    </div>
  );
};

export default TracksList;