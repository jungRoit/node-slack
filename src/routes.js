import express from 'express';
import {genericErrorHandler} from './middlewares/errorHandler';

const Router = express.Router();

Router.get('/', (req, res, next) => {
  res.json({ message: 'welcome to the API' });
});


Router.use(genericErrorHandler);

export default Router;
