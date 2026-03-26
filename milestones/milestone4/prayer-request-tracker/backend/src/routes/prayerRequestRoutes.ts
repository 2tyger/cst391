import { Router } from 'express';
import {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  markRequestAnswered
} from '../controllers/prayerRequestController';

// create router instance
const router = Router();

// define api routes
router.get('/requests', getAllRequests); // get all requests
router.get('/requests/:id', getRequestById); // get request by id
router.post('/requests', createRequest); // create new request
router.put('/requests/:id', updateRequest); // update request
router.delete('/requests/:id', deleteRequest); // delete request
router.patch('/requests/:id/answer', markRequestAnswered); // mark as answered

export default router;