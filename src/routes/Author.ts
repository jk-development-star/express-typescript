import express from 'express';
import createAuthor from '../controller/Author';

const router = express.Router();

router.post('/create', createAuthor);

export default router;
