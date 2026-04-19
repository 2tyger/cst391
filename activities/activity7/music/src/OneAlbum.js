import React, { useEffect, useState } from 'react';
import TracksList from './TracksList';
import TrackLyrics from './TrackLyrics';
import TrackVideo from './TrackVideo';

const OneAlbum = (props) => {
  const album = props.album;
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  useEffect(() => {
    if (album && album.tracks.length > 0) {
      setSelectedTrackId(album.tracks[0].id);
    }
  }, [album]);

  if (!album) {
    return (
      <div className='container'>
        <h2>Album not found</h2>
      </div>
    );
  }

  const selectedTrack =
    album.tracks.find((track) => track.id === selectedTrackId) ?? album.tracks[0];

  return (
    <div className='container py-4'>
      <h2 className='mb-4'>Album Details for {album.title}</h2>
      <div className='row'>
        <div className='col-sm-4 col-lg-3'>
          <div className='card'>
            <img
              src={album.image}
              className='card-img-top'
              alt={album.title}
            />
            <div className='card-body'>
              <h5 className='card-title'>{album.title}</h5>
              <p className='card-text'>{album.description}</p>
              <TracksList
                tracks={album.tracks}
                selectedTrackId={selectedTrack.id}
                onSelectTrack={setSelectedTrackId}
              />
            </div>
          </div>
        </div>
        <div className='col-sm-8 col-lg-9'>
          <TrackLyrics track={selectedTrack} />
          <TrackVideo track={selectedTrack} />
        </div>
      </div>
    </div>
  );
};

export default OneAlbum;