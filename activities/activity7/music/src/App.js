import React, { useState, useEffect } from 'react';
import './App.css';
import dataSource from './dataSource';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SearchAlbum from './SearchAlbum';
import NavBar from './NavBar';
import NewAlbum from './NewAlbum';
import EditAlbum from './EditAlbum';
import OneAlbum from './OneAlbum';

const App = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [albumList, setAlbumList] = useState([]);
  const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);

  const updateSearchResults = (phrase) => {
    setSearchPhrase(phrase);
  };

  // Setup initialization callback
  useEffect(() => {
    // Update the album list
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    const response = await dataSource.get('/albums');

    setAlbumList(response.data);
  };

  const updateSingleAlbum = (id, navigate, uri) => {
    console.log('Update Single Album = ', id);
    console.log('Update Single Album = ', navigate);
    var indexNumber = 0;
    for (var i = 0; i < albumList.length; ++i) {
      if (albumList[i].id === id) indexNumber = i;
    }
    setCurrentlySelectedAlbumId(indexNumber);
    let path = uri + indexNumber;
    console.log('path', path);
    navigate(path);
  };

  const renderedList = albumList.filter((album) => {
    if (
      album.description.toLowerCase().includes(searchPhrase.toLocaleLowerCase()) ||
      searchPhrase === ''
    ) {
      return true;
    }
    return false;
  });

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <SearchAlbum
              updateSearchResults={updateSearchResults}
              albumList={renderedList}
              updateSingleAlbum={updateSingleAlbum}
            />
          }
        />
        <Route path='/new' element={<NewAlbum />} />
        <Route path='/edit/:albumId' element={<EditAlbum album={albumList[currentlySelectedAlbumId]} />} />
        <Route path='/show/:albumId' element={<OneAlbum album={albumList[currentlySelectedAlbumId]} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
