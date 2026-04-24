"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAnswered = exports.remove = exports.update = exports.create = exports.findById = exports.findAll = void 0;
const db_1 = __importDefault(require("../config/db"));
// get all prayer requests from the database
const findAll = async () => {
    const [rows] = await db_1.default.query('SELECT * FROM prayer_requests ORDER BY id ASC');
    return rows;
};
exports.findAll = findAll;
// get a single prayer request by id
const findById = async (id) => {
    const [rows] = await db_1.default.query('SELECT * FROM prayer_requests WHERE id = ?', [id]);
    const results = rows;
    return results.length > 0 ? results[0] : null;
};
exports.findById = findById;
// get a single prayer request by id
const create = async (request) => {
    const [result] = await db_1.default.query(`INSERT INTO prayer_requests (title, description, category, dateSubmitted, isAnswered, priorityLevel)
     VALUES (?, ?, ?, ?, ?, ?)`, [
        request.title,
        request.description,
        request.category,
        normalizeDateSubmitted(request.dateSubmitted),
        request.isAnswered,
        request.priorityLevel
    ]);
    // return the id of the new record
    return result.insertId;
};
exports.create = create;
// update an existing prayer request
const update = async (id, request) => {
    const [result] = await db_1.default.query(`UPDATE prayer_requests
     SET title = ?, description = ?, category = ?, dateSubmitted = ?, isAnswered = ?, priorityLevel = ?
     WHERE id = ?`, [
        request.title,
        request.description,
        request.category,
        normalizeDateSubmitted(request.dateSubmitted),
        request.isAnswered,
        request.priorityLevel,
        id
    ]);
    // return true if a row was updated
    return result.affectedRows > 0;
};
exports.update = update;
// delete a prayer request by id
const remove = async (id) => {
    const [result] = await db_1.default.query('DELETE FROM prayer_requests WHERE id = ?', [id]);
    // return true if a row was deleted
    return result.affectedRows > 0;
};
exports.remove = remove;
// return true if a row was deleted
const markAnswered = async (id) => {
    const [result] = await db_1.default.query('UPDATE prayer_requests SET isAnswered = true WHERE id = ?', [id]);
    // return true if the update worked
    return result.affectedRows > 0;
};
exports.markAnswered = markAnswered;
const normalizeDateSubmitted = (dateSubmitted) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateSubmitted)) {
        return dateSubmitted;
    }
    const parsedDate = new Date(dateSubmitted);
    if (Number.isNaN(parsedDate.getTime())) {
        return dateSubmitted;
    }
    const year = parsedDate.getUTCFullYear();
    const month = `${parsedDate.getUTCMonth() + 1}`.padStart(2, '0');
    const day = `${parsedDate.getUTCDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};
