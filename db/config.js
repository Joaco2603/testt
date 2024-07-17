import pg from "pg";
import { handleErrors } from "../errors/handleErrors.js";

export let pool = null;


export const DBConnection = async () => {
  try {
    const { Pool } = pg;

    const poolConnection = await new Pool({
      connectionString: process.env.NEON_CONNECTION,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    console.log(`DB Connect`)

    pool = poolConnection;

    return;
  } catch (error) {
    handleErrors(error);
  }
};
