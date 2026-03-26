"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.markRequestAnswered = exports.deleteRequest = exports.updateRequest = exports.createRequest = exports.getRequestById = exports.getAllRequests = void 0;
const service = __importStar(require("../services/prayerRequestService"));
// handle get all requests
const getAllRequests = async (_req, res) => {
    try {
        const requests = await service.getAllRequests();
        res.json(requests);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve prayer requests' });
    }
};
exports.getAllRequests = getAllRequests;
// handle get request by id
const getRequestById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const request = await service.getRequestById(id);
        if (!request) {
            return res.status(404).json({ message: 'Prayer request not found' });
        }
        res.json(request);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve prayer request' });
    }
};
exports.getRequestById = getRequestById;
// handle create request
const createRequest = async (req, res) => {
    try {
        const newRequest = req.body;
        const insertId = await service.createRequest(newRequest);
        res.status(201).json({
            id: insertId,
            message: 'Prayer request created successfully'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create prayer request' });
    }
};
exports.createRequest = createRequest;
// handle update request
const updateRequest = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const updatedRequest = req.body;
        const success = await service.updateRequest(id, updatedRequest);
        if (!success) {
            return res.status(404).json({ message: 'Prayer request not found' });
        }
        res.json({ message: 'Prayer request updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update prayer request' });
    }
};
exports.updateRequest = updateRequest;
// handle delete request
const deleteRequest = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const success = await service.deleteRequest(id);
        if (!success) {
            return res.status(404).json({ message: 'Prayer request not found' });
        }
        res.json({ message: 'Prayer request deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete prayer request' });
    }
};
exports.deleteRequest = deleteRequest;
// handle mark as answered
const markRequestAnswered = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const success = await service.answerRequest(id);
        if (!success) {
            return res.status(404).json({ message: 'Prayer request not found' });
        }
        res.json({ message: 'Prayer request marked as answered' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to mark prayer request as answered' });
    }
};
exports.markRequestAnswered = markRequestAnswered;
