import express from "express";
import { createAuthor, getAllAuthors } from "../controller/Author";

const router = express.Router();

router.post("/create", createAuthor);
router.get("/authors", getAllAuthors);

export default router;
