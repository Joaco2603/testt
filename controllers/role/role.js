import { response, request } from "express";
import bcryptjs from "bcryptjs";
import { pool } from "../../db/config.js";
import { handleErrors } from "../../errors/handleErrors.js";
// import { verificarEmail } from "../helpers/dbValidators.js/index.js";

export const GetRoles = async (req = request, res = response) => {
  const { limit = 5 } = req.query;
  const client = await pool.connect();
  try {
    const clients = await client.query(`SELECT * FROM "role" LIMIT $1`, [
      limit,
    ]);

    await client.end();

    res.json(clients.rows);
  } catch (error) {
    handleErrors(error);
  }
};

export const findRoleById = async (req, res = Response) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT * FROM "role" WHERE id = $1`, [
      Number(id),
    ]);

    await client.end();

    res.json(result.rows);
  } catch (error) {
    handleErrors(error, res);
  }
};

export const roleUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { name, desc } = req.body;
  const client = await pool.connect();

  try {
    const result = await client.query(
      `UPDATE "role"
      SET 
          name = COALESCE($2, name),
          "desc" = COALESCE($3, "desc")
      WHERE id = $1;`,
      [id, name, desc]
    );

    res.json(result);
  } catch (err) {
    handleErrors(err, res);
  }
};

export const roleCreate = async (req, res = response) => {
  const { name, desc } = req.body;
  const client = await pool.connect();

  // Guardar en DB
  try {
    const result = await client.query(
      `INSERT INTO role(name, "desc") VALUES($1, $2)`,
      [name.toUpperCase(), desc.toUpperCase()]
    );

    await client.end();

    res.json(req.body);
  } catch (error) {
    handleErrors(error, res);
  }
};

export const roleDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();

    try {
      const result = await client.query(`DELETE FROM "role" WHERE id = $1`, [
        id,
      ]);

      res.json({
        roleDelete: id,
      });
    } catch (error) {
      handleErrors(error, res);
    } finally {
      client.release(); // Asegura que la conexión se libere siempre
    }
  } catch (error) {
    // Este catch maneja errores de conexión al pool
    handleErrors(error, res);
  }
};
