import { Router } from 'express';
import * as slackService from '../service/slackService';
import { clientRedirectUrl } from '../config/url';
import BadRequest from '../error/BadRequest';

const slackController = Router();

slackController.post('/post', async (req, res, next) => {
  try {
    const {data:channels} = await slackService.getChannels();
    console.log('data',channels);
    res.status(200).send(channels);
  } catch (error) {
    console.log(' err', error);
    next(error);
  }
});

slackController.get('/authorize', async (req, res, next) => {
  try {
    console.log('Received scope', req.query.code);
    const { data } = await slackService.getAccessToken(req.query.code);
    console.log('resp', data);
    if (!data.ok) {
      throw new BadRequest({
        message: data.error,
        details: '',
        code: 401,
      });
    }
    res
      .status(200)
      .json({
        message: 'success',
        tokenType: data.token_type,
        accessToken: data.access_token,
      });
  } catch (error) {
    console.log('err', error);
    next(error);
  }
});

slackController.get('/getscope', (req, res) => {
  res.status(200).json({ message: 'success', redirectUrl: clientRedirectUrl });
});

export default slackController;
