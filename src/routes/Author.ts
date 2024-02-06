import express from "express";
import { createAuthor, getAllAuthors } from "../controller/Author";

const router = express.Router();

router.post("/", createAuthor);
router.get("/", getAllAuthors);

export default router;
