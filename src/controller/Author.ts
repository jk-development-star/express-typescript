import { RequestHandler } from "express";
import Author from "../model/Author";
import { duplicateEmailError, validationError } from "../errors/Errors";
import createHttpError from "http-errors";

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
  try {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const skip: number = parseInt(req.query.skip as string) || 0;
    await Author.find()
      .limit(limit)
      .skip(skip)
      .then((authors) => res.status(200).json({ authors }))
      .catch((error) => res.status(400).json(createHttpError(error.message)));
  } catch (error) {
    next(error);
  }
};

export { createAuthor, getAllAuthors };
