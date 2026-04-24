import axios from 'axios';
import {
  normalizePrayerRequest
} from '../models/prayerRequest';
import type { PrayerRequest, PrayerRequestPayload } from '../models/prayerRequest';

const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/requests';

export async function getRequests(): Promise<PrayerRequest[]> {
  const response = await axios.get(baseUrl);
  return response.data.map(normalizePrayerRequest);
}

export async function getRequestById(id: number): Promise<PrayerRequest> {
  const response = await axios.get(`${baseUrl}/${id}`);
  return normalizePrayerRequest(response.data);
}

export async function createRequest(payload: PrayerRequestPayload): Promise<void> {
  await axios.post(baseUrl, payload);
}

export async function updateRequest(id: number, payload: PrayerRequestPayload): Promise<void> {
  await axios.put(`${baseUrl}/${id}`, payload);
}

export async function deleteRequest(id: number): Promise<void> {
  await axios.delete(`${baseUrl}/${id}`);
}