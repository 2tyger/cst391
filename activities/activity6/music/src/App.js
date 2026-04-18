import React, { useState, useEffect } from 'react';
import './App.css';
import dataSource from './dataSource';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SearchAlbum from './SearchAlbum';
import NavBar from './NavBar';
import NewAlbum from './NewAlbum';
import OneAlbum from './OneAlbum';

const App = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [albumList, setAlbumList] = useState([]);

  const updateSearchResults = (phrase) => {
    console.log('phrase is ' + phrase);
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

  const updateSingleAlbum = (id, navigate) => {
    console.log('Update Single Album = ', id);
    console.log('Update Single Album = ', navigate);
    console.log('update path', '/show/' + id);
    navigate('/show/' + id);
  };

  console.log('albumList', albumList);
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
        <Route path='/show/:albumId' element={<OneAlbum albumList={albumList} />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
