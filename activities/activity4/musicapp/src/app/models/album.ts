import { Track } from './track';

export class Album {
  album_id: number = 0;
  artist_id: number = 0;
  artist: string = '';
  title: string = '';
  description: string = '';
  year: number = 0;
  image: string = '';
  tracks: Track[] = [];
}