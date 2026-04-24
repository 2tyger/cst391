import { Request, Response } from 'express';
import * as service from '../services/prayerRequestService';
import { PrayerRequest } from '../models/PrayerRequest';

// handle get all requests
export const getAllRequests = async (_req: Request, res: Response) => {
  try {
    const requests = await service.getAllRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve prayer requests' });
  }
};

// handle get request by id
export const getRequestById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const request = await service.getRequestById(id);

    if (!request) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve prayer request' });
  }
};

// handle create request
export const createRequest = async (req: Request, res: Response) => {
  try {
    const newRequest: PrayerRequest = req.body;
    const insertId = await service.createRequest(newRequest);

    res.status(201).json({
      id: insertId,
      message: 'Prayer request created successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create prayer request' });
  }
};

// handle update request
export const updateRequest = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedRequest: PrayerRequest = req.body;

    const success = await service.updateRequest(id, updatedRequest);

    if (!success) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }

    res.json({ message: 'Prayer request updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update prayer request' });
  }
};

// handle delete request
export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const success = await service.deleteRequest(id);

    if (!success) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }

    res.json({ message: 'Prayer request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete prayer request' });
  }
};

// handle mark as answered
export const markRequestAnswered = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const success = await service.answerRequest(id);

    if (!success) {
      return res.status(404).json({ message: 'Prayer request not found' });
    }

    res.json({ message: 'Prayer request marked as answered' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark prayer request as answered' });
  }
};