import { Component } from '@angular/core';
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
export class Music {
  query = '';
  tracks: any[] = [];
  searchDone = false;

  currentTrack: any = null; // ✅ поточний трек для нижнього плеєра
  isPlaying = false;

  constructor(private musicService: MusicService) {}

  onSearch() {
    const searchTerm = this.query.trim();
    if (!searchTerm) {
      this.tracks = [];
      this.searchDone = true;
      return;
    }

    this.musicService.searchTracks(searchTerm).subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.searchDone = true;
        console.log('🎵 Знайдені треки:', tracks);
      },
      error: (err) => {
        console.error('❌ Помилка під час пошуку:', err);
        this.tracks = [];
        this.searchDone = true;
      }
    });
  }

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
