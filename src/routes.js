import express from 'express';
import slackController from './controllers/slackController';
import {genericErrorHandler} from './middlewares/errorHandler';

const Router = express.Router();

Router.get('/', (req, res, next) => {
  res.json({ message: 'welcome to the API' });
});


Router.use('/slack',slackController);
Router.use(genericErrorHandler);

export default Router;
