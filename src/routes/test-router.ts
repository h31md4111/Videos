import { Router } from 'express';
import { clearDB } from './video-router';

export const testRouter = Router();

testRouter.delete('/testing/all-data',(req, res): void => {
clearDB();
res.sendStatus(204);
})
