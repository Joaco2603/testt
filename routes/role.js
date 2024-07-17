import { Router } from "express";
import {
  roleCreate,
  GetRoles,
  findRoleById,
  roleDelete,
  roleUpdate,
} from "../controllers/role/role.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.get("/", GetRoles);

router.get("/:id", findRoleById);

router.post(
  "/",
  [
    check("name", "Name it's not valid").isString(),
    check("desc", "Desc it's not valid").isString(),
    validateFields,
  ],
  roleCreate
);

router.delete("/:id", roleDelete);

router.put("/:id", roleUpdate);

export default router;
