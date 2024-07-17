import { response, request } from "express";
import bcryptjs from "bcryptjs";
import { pool } from "../../db/config.js";
import { handleErrors } from "../../errors/handleErrors.js";
// import { verificarEmail } from "../helpers/dbValidators.js/index.js";

export const userGetUsers = async (req = request, res = response) => {
  const { limit = 5 } = req.query;
  const client = await pool.connect();
  try {
    const clients = await client.query(`SELECT * FROM "person" LIMIT $1`, [
      limit,
    ]);

    await client.end();

    res.json(clients.rows);
  } catch (error) {
    handleErrors(error);
  }
};

export const findUserById = async (req, res = Response) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT * FROM "person" WHERE id = $1`, [
      id.toString(),
    ]);

    await client.end();

    res.json(result.rows);
  } catch (error) {
    handleErrors(error, res);
  }
};

export const userUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { name, last_name, email, password, gender } = req.body;
  const client = await pool.connect();
  let passwordHash;

  if (password) {
    //Hacer el hash de la contraseña o encriptarla
    const salt = bcryptjs.genSaltSync(15);
    passwordHash = bcryptjs.hashSync(password, salt);
  }
  try {
    const result = await client.query(
      `UPDATE "person"
      SET 
          name = COALESCE($2, name),
          last_name = COALESCE($3, last_name),
          email = COALESCE($4, email),
          password = COALESCE($5, password),
          gender = COALESCE($6, gender)
      WHERE id = $1;`,
      [id, name, last_name, email, passwordHash, gender]
    );

    res.json(result);
  } catch (err) {
    handleErrors(err, res);
  }
};

export const userCreate = async (req, res = response) => {
  const { id, name, last_name, email, password, rol, gender } = req.body;

  try {
    const client = await pool.connect();

    //Hacer el hash de la contraseña o encriptarla
    const salt = bcryptjs.genSaltSync(15);
    const passwordHash = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    const result = await client.query(
      `INSERT INTO person(id, name, last_name, email, password, gender, role_id) VALUES($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        name.toUpperCase(),
        last_name.toUpperCase(),
        email.toUpperCase(),
        passwordHash,
        gender,
        rol,
      ]
    );

    await client.end();

    res.json(req.body);
  } catch (error) {
    handleErrors(error, res);
  }
};

export const usuarioDelete = async (req, res = response) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();

    try {
      const result = await client.query(`DELETE FROM "person" WHERE id = $1`, [
        id,
      ]);

      res.json({
        userDelete: id,
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
