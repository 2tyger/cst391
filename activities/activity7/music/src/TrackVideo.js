import React from 'react';

const TrackVideo = (props) => {
  const getEmbedUrl = (videoUrl) => {
    if (!videoUrl) {
      return '';
    }

    const watchUrl = new URL(videoUrl);
    const videoId = watchUrl.searchParams.get('v');

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return videoUrl;
  };

  const videoSource = getEmbedUrl(props.track.videoUrl);

  return (
    <div className='card music-panel'>
      <div className='card-body'>
        <h5 className='card-title'>Video for {props.track.title}</h5>
        {videoSource ? (
          <div className='ratio ratio-16x9'>
            <iframe
              src={videoSource}
              title={`Video for ${props.track.title}`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className='card-text'>No video link is available for this track.</p>
        )}
      </div>
    </div>
  );
};

export default TrackVideo;