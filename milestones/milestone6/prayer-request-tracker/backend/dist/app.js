"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prayerRequestRoutes_1 = __importDefault(require("./routes/prayerRequestRoutes"));
// create express app
const app = (0, express_1.default)();
// enable CORS for all routes
app.use((0, cors_1.default)());
// allow json request bodies
app.use(express_1.default.json());
// register routes under /api
app.use('/api', prayerRequestRoutes_1.default);
exports.default = app;
