import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Music } from "./music/music";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Music],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Project');
}
