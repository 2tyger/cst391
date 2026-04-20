import { PrayerRequest } from '../models/PrayerRequest';
import * as repository from '../repositories/prayerRequestRepository';

// get all requests (calls repository)
export const getAllRequests = async (): Promise<PrayerRequest[]> => {
  return await repository.findAll();
};

// get a single request by id
export const getRequestById = async (id: number): Promise<PrayerRequest | null> => {
  return await repository.findById(id);
};

// create a new request
export const createRequest = async (request: PrayerRequest): Promise<number> => {
  return await repository.create(request);
};

// update an existing request
export const updateRequest = async (id: number, request: PrayerRequest): Promise<boolean> => {
  return await repository.update(id, request);
};

// delete a request
export const deleteRequest = async (id: number): Promise<boolean> => {
  return await repository.remove(id);
};

// mark request as answered
export const answerRequest = async (id: number): Promise<boolean> => {
  return await repository.markAnswered(id);
};