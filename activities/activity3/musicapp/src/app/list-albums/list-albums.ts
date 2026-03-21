import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService } from '../service/music-service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
import { DisplayAlbum } from '../display-album/display-album';

@Component({
  selector: 'app-list-albums',
  standalone: true,
  imports: [CommonModule, DisplayAlbum],
  templateUrl: './list-albums.html',
  styleUrl: './list-albums.css'
})
export class ListAlbums implements OnInit {
  @Input() artist!: Artist;

  albums: Album[] = [];
  selectedAlbum: Album | null = null;

  constructor(private service: MusicService) {}

  ngOnInit() {
    this.albums = this.service.getAlbumsOfArtist(this.artist.artist);
  }

  onSelectAlbum(album: Album) {
    this.selectedAlbum = album;
  }
}