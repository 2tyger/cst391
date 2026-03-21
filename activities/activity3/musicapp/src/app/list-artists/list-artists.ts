import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MusicService } from '../service/music-service';
import { Artist } from '../models/artist';
import { ListAlbums } from '../list-albums/list-albums';

@Component({
  selector: 'app-list-artists',
  standalone: true,
  imports: [CommonModule, ListAlbums],
  templateUrl: './list-artists.html',
  styleUrl: './list-artists.css'
})
export class ListArtists implements OnInit {
  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: MusicService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Getting data...', params);
      this.artists = this.service.getArtists();
      this.selectedArtist = null;
    });
  }

  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}