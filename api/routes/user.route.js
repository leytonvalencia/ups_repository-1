import express  from "express";
import {deleteUser, getClerkUser, getUser} from "../controller/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken ,deleteUser)
router.get("/:id",getUser)
router.get("/clerkUser/:id",getClerkUser)

export default router;