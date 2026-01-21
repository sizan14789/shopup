import pool from "./connectPool.js";

export const health = (_req, res) => {
  res.sendStatus(200);
};

export const supabase = async (_req, res) => {
  await pool.query(`SELECT * FROM product WHERE id < 0`);
  res.sendStatus(200);
};
