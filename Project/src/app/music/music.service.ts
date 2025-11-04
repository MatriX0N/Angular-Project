import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = 'https://itunes.apple.com/search';

  constructor(private http: HttpClient) {}

  searchTracks(query: string, limit: number = 10): Observable<any[]> {
    const url = `${this.apiUrl}?term=${encodeURIComponent(query)}&media=music&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      map(response => response.results || [])
    );
  }
}
