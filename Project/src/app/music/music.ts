import { Component, OnInit } from '@angular/core';
import { MusicService } from './music.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music.html',
  styleUrl: './music.css'
})
export class Music implements OnInit {
  query = '';
  searchDone = false;
  isPlaying = false;
  currentTrack: any = null;

  // 🔥 жанри
  popularTracks: any[] = [];
  rockTracks: any[] = [];
  popTracks: any[] = [];

  // 🆕 результати пошуку
  searchResults: any[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    // жанри завантажуються лише при старті
    this.loadGenre('top hits', 'popularTracks');
    this.loadGenre('rock', 'rockTracks');
    this.loadGenre('pop', 'popTracks');
  }

  /** Завантаження треків за жанром */
  loadGenre(term: string, target: 'popularTracks' | 'rockTracks' | 'popTracks') {
    this.musicService.searchTracks(term, 20).subscribe({
      next: (tracks) => {
        this[target] = tracks.slice(0, 8);
      },
      error: (err) => console.error(`Помилка при завантаженні ${term}:`, err)
    });
  }

  /** 🔍 Пошук */
  onSearch() {
    const searchTerm = this.query.trim();
    if (!searchTerm) {
      this.searchResults = [];
      this.searchDone = false;
      return;
    }

    this.musicService.searchTracks(searchTerm, 25).subscribe({
      next: (tracks) => {
        this.searchResults = tracks;
        this.searchDone = true;
      },
      error: (err) => {
        console.error('❌ Помилка під час пошуку:', err);
        this.searchResults = [];
        this.searchDone = true;
      }
    });
  }

  /** ▶️ Програвання */
  playTrack(track: any) {
    if (this.currentTrack === track && this.isPlaying) {
      this.pauseTrack();
      return;
    }

    this.currentTrack = track;
    this.isPlaying = true;
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    if (audioPlayer) {
      audioPlayer.src = track.previewUrl;
      audioPlayer.play();
    }
  }

  pauseTrack() {
    this.isPlaying = false;
    const audioPlayer = document.getElementById('audio-player') as HTMLAudioElement;
    if (audioPlayer) {
      audioPlayer.pause();
    }
  }

  onAudioEnded() {
    this.isPlaying = false;
  }
}
