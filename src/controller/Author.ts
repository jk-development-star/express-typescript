import { NextFunction, Request, Response } from "express";
import Author from "../model/Author";
import { handleErrors } from "../errors/Errors";

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Author.create(req.body)
    .then((author) => res.status(201).json({ author }))
    .catch((error) => res.status(500).json(handleErrors(error)));
};

const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Author.find({})
    .then((authors) => res.status(200).json({ authors }))
    .catch((error) => console.log(error));
};

export { createAuthor, getAllAuthors };
