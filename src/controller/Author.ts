import { RequestHandler } from "express";
import Author from "../model/Author";
import { duplicateEmailError, validationError } from "../errors/Errors";

const createAuthor: RequestHandler = async (req, res, next) => {
  try {
    await Author.create(req.body)
      .then((author) => res.status(201).json({ author }))
      .catch((error: any) => {
        if (error.name === "ValidationError")
          res.status(400).json(validationError(error));
        if (error.code === 11000)
          res.status(409).json(duplicateEmailError(error));
      });
  } catch (error) {
    next(error);
  }
};

const getAllAuthors: RequestHandler = async (req, res, next) => {
  await Author.find({})
    .then((authors) => res.status(200).json({ authors }))
    .catch((error) => console.log(error));
};

export { createAuthor, getAllAuthors };
