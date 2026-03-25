import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = 'My Music Collection';
  version = '1.0';

  constructor(private router: Router) {}

  displayVersion() {
    alert('Version ' + this.version);
  }

  displayArtistList() {
    console.log('display list here');
    this.router.navigate(['list-artists'], {
      queryParams: { data: new Date() }
    });
  }
}
