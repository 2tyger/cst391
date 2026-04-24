"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// load environment variables from .env file
dotenv_1.default.config();
// create a connection pool to the mysql database
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST, // database host (localhost for this one)
    user: process.env.DB_USER, // database username
    password: process.env.DB_PASSWORD, // database password
    database: process.env.DB_NAME, // database name
    port: Number(process.env.DB_PORT), // database port
});
exports.default = pool;
