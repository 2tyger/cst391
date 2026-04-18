import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const AlbumList = (props) => {
  const navigate = useNavigate();

  const handleSelectionOne = (albumId) => {
    console.log('Selected ID is ' + albumId);
    props.onClick(albumId, navigate);
  };

  console.log('props albumList', props);
  const albums = props.albumList.map((album) => {
    return (
      <Card
        key={album.id}
        albumId={album.id}
        albumTitle={album.title}
        albumDescription={album.description}
        buttonText="OK"
        imageURL={album.image}
        onClick={handleSelectionOne}
      />
    );
  });

  return <div className='container'>{albums}</div>;
};

export default AlbumList;