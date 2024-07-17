import { response, request } from "express";
import { pool } from "../../db/config.js";
import { handleErrors } from "../../errors/handleErrors.js";

export const GetCourse = async (req = request, res = response) => {
  const { limit = 5 } = req.query;
  const client = await pool.connect();
  try {
    const clients = await client.query(`SELECT * FROM "course" LIMIT $1`, [
      limit,
    ]);

    await client.end();

    res.json(clients.rows);
  } catch (error) {
    handleErrors(error);
  }
};

export const findCourseById = async (req, res = Response) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT * FROM "course" WHERE id = $1`, [
      Number(id),
    ]);

    await client.end();

    res.json(result.rows);
  } catch (error) {
    handleErrors(error, res);
  }
};

export const courseUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { name, desc, information, docs, person_id } = req.body;
  const client = await pool.connect();

  try {
    const result = await client.query(
      `UPDATE "course"
      SET 
          name = COALESCE($2, name),
          "desc" = COALESCE($3, "desc"),
          information = COALESCE($4, information),
          docs = COALESCE($5, docs),
          person_id = COALESCE($6, person_id)
      WHERE id = $1;`,
      [id, name, desc, information, docs, person_id]
    );

    res.json(result);
  } catch (err) {
    handleErrors(err, res);
  }
};

export const courseCreate = async (req, res = response) => {
  const { name, desc, information, docs, person_id } = req.body;
  const client = await pool.connect();

  // Guardar en DB
  try {
    const result = await client.query(
      `INSERT INTO course(name, "desc", information, docs, person_id) VALUES($1, $2, $3, $4, $5)`,
      [
        name.toUpperCase(),
        desc.toUpperCase(),
        information.toUpperCase(),
        docs.toUpperCase(),
        person_id.toUpperCase(),
      ]
    );

    await client.end();

    res.json(req.body);
  } catch (error) {
    handleErrors(error, res);
  }
};

export const courseDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();

    try {
      const result = await client.query(`DELETE FROM "course" WHERE id = $1`, [
        id,
      ]);

      res.json({
        courseDelete: id,
      });
    } catch (error) {
      handleErrors(error, res);
    } finally {
      client.release();
    }
  } catch (error) {
    handleErrors(error, res);
  }
};
