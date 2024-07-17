import { Router } from "express";
import {
  GetCourse,
  findCourseById,
  courseCreate,
  courseDelete,
  courseUpdate,
} from "../controllers/course/course.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";

const router = Router();

router.get("/", GetCourse);

router.get("/:id", findCourseById);

router.post(
  "/",
  [
    check("name", "Name it's not valid").isString(),
    check("desc", "Desc it's not valid").isString(),
    check("information", "Desc it's not valid").isString(),
    check("docs", "Desc it's not valid").isString(),
    check("person_id", "person_id it's not valid").isString(),
    validateFields,
  ],
  courseCreate
);

router.delete("/:id", courseDelete);

router.put("/:id", courseUpdate);

export default router;
