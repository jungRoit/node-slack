import { Router } from 'express';
import * as slackService from '../service/slackService';

const slackController = Router();

slackController.post('/', async (req, res, next) => {
  try {
    const response = await slackService.sendMessage();
    res.status(200).send(response);
  } catch (error) {
    console.log(' err', error);
    next(error);
  }
});

export default slackController;
