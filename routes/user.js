import { Router } from "express";
import {
  userGetUsers,
  userUpdate,
  userCreate,
  findUserById,
  usuarioDelete,
} from "../controllers/user/user.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { verifyPassword } from "../helpers/dbValidators.js";

const router = Router();

router.get("/", userGetUsers);

router.get("/:id", findUserById);

router.post(
  "/",
  [
    check("id").isLength(8),
    check("name", "Name it's not valid").isString(),
    check("last_name", "Last_name it's not valid").isString(),
    check("email", "Email it's not valid").isEmail(),
    check("password", "Password it's not valid").custom(verifyPassword),
    check("rol").isIn([1, 2]),
    check("gender", "It's not a valid gender").isBoolean(),
    validateFields,
  ],
  userCreate
);

router.delete("/:id", usuarioDelete);

router.put("/:id", userUpdate);

export default router;
