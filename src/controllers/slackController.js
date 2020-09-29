import { Router } from 'express';
import * as slackService from '../service/slackService';
import { clientRedirectUrl } from '../config/url';
import BadRequest from '../error/BadRequest';
import {generateUUID} from '../utils/uuid';
import {getChannelByName} from '../utils/util';
import { validatePostImageBody } from '../middlewares/validation';

const slackController = Router();

slackController.post('/post-image', validatePostImageBody, async (req, res, next) => {
  try {
    const { body } = req;
    const { data } = await slackService.getChannels();
    if(!data.ok) {
      throw new BadRequest({
        message: 'Slack Error: getting channels data',
        details: response.data.error || 'Invalid Payload',
        code: 400,
      });
    }

    const channel = getChannelByName(data.channels, body.channelName);
    if(!channel) {
      throw new BadRequest({
        message: 'Channel Doesn\'t exist',
        details: `${body.channelName} is not a valid channel name`,
        code: 400,
      })
    }
    const response = await slackService.sendMessage({
      channel: channel.id,
      blocks: [
        {
          type: 'image',
          title: {
            type: 'plain_text',
            text: body.text || '',
          },
          block_id: generateUUID(),
          image_url: body.imageUrl,
          alt_text: body.altText || '',
        },
      ],
    });
    if(!response.data.ok) {
      throw new BadRequest({
        message: 'Slack Error: sending message',
        details: response.data.error || 'Invalid Payload',
        code: 400,
      });
    }

    res.status(200).send({message:'success'});
  } catch (error) {
    next(error);
  }
});

slackController.get('/authorize', async (req, res, next) => {
  try {
    const { data } = await slackService.getAccessToken(req.query.code);
    if (!data.ok) {
      throw new BadRequest({
        message: data.error,
        details: '',
        code: 401,
      });
    }
    res.status(200).json({
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
