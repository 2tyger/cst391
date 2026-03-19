import pool from '../config/db';
import { PrayerRequest } from '../models/PrayerRequest';

// get all prayer requests from the database
export const findAll = async (): Promise<PrayerRequest[]> => {
  const [rows] = await pool.query('SELECT * FROM prayer_requests ORDER BY id ASC');
  return rows as PrayerRequest[];
};

// get a single prayer request by id
export const findById = async (id: number): Promise<PrayerRequest | null> => {
  const [rows] = await pool.query('SELECT * FROM prayer_requests WHERE id = ?', [id]);
  const results = rows as PrayerRequest[];
  return results.length > 0 ? results[0] : null;
};

// get a single prayer request by id
export const create = async (request: PrayerRequest): Promise<number> => {
  const [result]: any = await pool.query(
    `INSERT INTO prayer_requests (title, description, category, dateSubmitted, isAnswered, priorityLevel)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      request.title,
      request.description,
      request.category,
      request.dateSubmitted,
      request.isAnswered,
      request.priorityLevel
    ]
  );
  // return the id of the new record
  return result.insertId;
};

// update an existing prayer request
export const update = async (id: number, request: PrayerRequest): Promise<boolean> => {
  const [result]: any = await pool.query(
    `UPDATE prayer_requests
     SET title = ?, description = ?, category = ?, dateSubmitted = ?, isAnswered = ?, priorityLevel = ?
     WHERE id = ?`,
    [
      request.title,
      request.description,
      request.category,
      request.dateSubmitted,
      request.isAnswered,
      request.priorityLevel,
      id
    ]
  );
  // return true if a row was updated
  return result.affectedRows > 0;
};

// delete a prayer request by id
export const remove = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.query(
    'DELETE FROM prayer_requests WHERE id = ?',
    [id]
  );
  // return true if a row was deleted
  return result.affectedRows > 0;
};

// return true if a row was deleted
export const markAnswered = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.query(
    'UPDATE prayer_requests SET isAnswered = true WHERE id = ?',
    [id]
  );
  // return true if the update worked
  return result.affectedRows > 0;
};