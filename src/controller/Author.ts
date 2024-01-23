import { NextFunction, Request, Response } from 'express';
import Author from '../model/Author';
import { handleErrors } from '../errors/Errors';

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Author.create(req.body)
    .then((author) => res.status(201).json({ author }))
    .catch((error) => res.status(500).json(handleErrors(error)));
};

export default createAuthor;
