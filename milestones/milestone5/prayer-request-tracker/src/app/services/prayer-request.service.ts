import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  normalizeDateSubmitted,
  normalizePrayerRequest,
  PrayerRequest,
  PrayerRequestPayload
} from '../models/prayer-request.model';

interface CreatePrayerRequestResponse {
  id: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrayerRequestService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/requests';

  getRequests(): Observable<PrayerRequest[]> {
    return this.http
      .get<PrayerRequest[]>(this.apiUrl)
      .pipe(map((requests) => requests.map((request) => normalizePrayerRequest(request))));
  }

  getRequestById(id: number): Observable<PrayerRequest> {
    return this.http
      .get<PrayerRequest>(`${this.apiUrl}/${id}`)
      .pipe(map((request) => normalizePrayerRequest(request)));
  }

  createRequest(payload: PrayerRequestPayload): Observable<number> {
    return this.http
      .post<CreatePrayerRequestResponse>(this.apiUrl, this.normalizePayload(payload))
      .pipe(map((response) => response.id));
  }

  updateRequest(id: number, payload: PrayerRequestPayload): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, this.normalizePayload(payload));
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  markAnswered(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/answer`, {});
  }

  private normalizePayload(payload: PrayerRequestPayload): PrayerRequestPayload {
    return {
      ...payload,
      dateSubmitted: normalizeDateSubmitted(payload.dateSubmitted)
    };
  }
}