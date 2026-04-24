"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prayerRequestController_1 = require("../controllers/prayerRequestController");
// create router instance
const router = (0, express_1.Router)();
// define api routes
router.get('/requests', prayerRequestController_1.getAllRequests); // get all requests
router.get('/requests/:id', prayerRequestController_1.getRequestById); // get request by id
router.post('/requests', prayerRequestController_1.createRequest); // create new request
router.put('/requests/:id', prayerRequestController_1.updateRequest); // update request
router.delete('/requests/:id', prayerRequestController_1.deleteRequest); // delete request
router.patch('/requests/:id/answer', prayerRequestController_1.markRequestAnswered); // mark as answered
exports.default = router;
