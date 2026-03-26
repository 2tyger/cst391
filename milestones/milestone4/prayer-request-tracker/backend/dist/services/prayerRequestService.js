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
exports.answerRequest = exports.deleteRequest = exports.updateRequest = exports.createRequest = exports.getRequestById = exports.getAllRequests = void 0;
const repository = __importStar(require("../repositories/prayerRequestRepository"));
// get all requests (calls repository)
const getAllRequests = async () => {
    return await repository.findAll();
};
exports.getAllRequests = getAllRequests;
// get a single request by id
const getRequestById = async (id) => {
    return await repository.findById(id);
};
exports.getRequestById = getRequestById;
// create a new request
const createRequest = async (request) => {
    return await repository.create(request);
};
exports.createRequest = createRequest;
// update an existing request
const updateRequest = async (id, request) => {
    return await repository.update(id, request);
};
exports.updateRequest = updateRequest;
// delete a request
const deleteRequest = async (id) => {
    return await repository.remove(id);
};
exports.deleteRequest = deleteRequest;
// mark request as answered
const answerRequest = async (id) => {
    return await repository.markAnswered(id);
};
exports.answerRequest = answerRequest;
