import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private host = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  public getArtists(callback: (artists: Artist[]) => void): void {
    this.http.get<Artist[]>(this.host + '/artists')
      .subscribe((artists: Artist[]) => {
        callback(artists);
      });
  }

  public getAlbums(callback: (albums: Album[]) => void): void {
    this.http.get<Album[]>(this.host + '/albums')
      .subscribe((albums: Album[]) => {
        callback(albums);
      });
  }

  public getAlbumsOfArtist(artistName: string, callback: (albums: Album[]) => void): void {
    const request = this.host + '/albums/' + artistName;
    console.log('request', request);

    this.http.get<Album[]>(request)
      .subscribe((albums: Album[]) => {
        console.log('have albums', albums);
        callback(albums);
      });
  }

  public createAlbum(album: Album, callback: () => void): void {
    this.http.post<Album>(this.host + '/albums', album)
      .subscribe(() => {
        callback();
      });
  }

  public updateAlbum(album: Album, callback: () => void): void {
    this.http.put<Album>(this.host + '/albums', album)
      .subscribe(() => {
        callback();
      });
  }

  public deleteAlbum(id: number, callback: () => void): void {
    this.http.delete(this.host + '/albums/' + id)
      .subscribe(() => {
        callback();
      });
  }
}