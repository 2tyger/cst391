// this service manages all music data for the application
// it loads initial data from a json file and provides methods
// to retrieve, add, update, and delete albums

import { Injectable } from '@angular/core';
import * as exampledata from '../../data/sample-music-data.json';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  // this holds all album data loaded from the json file
  albums: Album[] = (exampledata as any).default ?? (exampledata as any);

  constructor() {}

  // returns a unique list of artists based on the albums array
  getArtists(): Artist[] {
    const artists: Artist[] = [];

    for (const album of this.albums) {
      const exists = artists.find(a => a.artist === album.artist);
      if (!exists) {
        artists.push({
          artist_id: album.artist_id,
          artist: album.artist
        });
      }
    }

    return artists;
  }

  // returns all albums that belong to a specific artist
  getAlbumsOfArtist(artist: string): Album[] {
    return this.albums.filter(album => album.artist === artist);
  }

  // returns a single album based on artist and album id
  // returns null if no matching album is found
  getAlbum(artist: string, id: number): Album | null {
    const foundAlbum = this.albums.find(
      album => album.artist === artist && album.album_id === id
    );

    return foundAlbum ?? null;
  }

  // creates a new album and adds it to the albums array
  // generates a new album_id automatically
  // returns the new album id if successful, or -1 if an error occurs
  createAlbum(album: Album): number {
    try {
      const maxId = this.albums.length > 0
        ? Math.max(...this.albums.map(a => a.album_id))
        : 0;

      album.album_id = maxId + 1;
      this.albums.push(album);

      return album.album_id;
    } catch {
      return -1;
    }
  }

  // updates an existing album based on album_id
  // replaces the old album with the updated one
  // returns 0 if successful, -1 if the album is not found
  updateAlbum(album: Album): number {
    const index = this.albums.findIndex(a => a.album_id === album.album_id);

    if (index !== -1) {
      this.albums.splice(index, 1, album);
      return 0;
    }

    return -1;
  }

  // deletes an album using both id and artist
  // returns 0 if successful, -1 if the album is not found
  deleteAlbum(id: number, artist: string): number {
    const index = this.albums.findIndex(
      album => album.album_id === id && album.artist === artist
    );

    if (index !== -1) {
      this.albums.splice(index, 1);
      return 0;
    }

    return -1;
  }
}