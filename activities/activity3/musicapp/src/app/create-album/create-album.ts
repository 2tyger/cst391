import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MusicService } from '../service/music-service';
import { Album } from '../models/album';
import { Track } from '../models/track';

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-album.html',
  styleUrl: './create-album.css'
})
export class CreateAlbum {
  album: Album = {
    album_id: 0,
    artist_id: 0,
    artist: '',
    title: '',
    description: '',
    year: 2025,
    image: '',
    tracks: []
  };

  tracksText = '';

  constructor(
    private service: MusicService,
    private router: Router
  ) {}

  onSubmit() {
    const parsedTracks: Track[] = this.tracksText
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((line, index) => ({
        track_number: index + 1,
        title: line.trim(),
        lyrics: ''
      }));

    this.album.tracks = parsedTracks;

    this.service.createAlbum(this.album);

    this.router.navigate(['list-artists'], {
      queryParams: { data: new Date() }
    });
  }
}