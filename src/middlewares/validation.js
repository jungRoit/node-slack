import BadRequest from '../error/BadRequest';

export const validatePostImageBody = (req, res, next) => {
  const {body} = req;
  if(!body) {
    next( new BadRequest({
      message: 'Missing Request Body',
        details: `Request body is not included with the request payload`,
        code: 400,
    }))
  }

  if(!body.imageUrl) {
    next( new BadRequest({
      message: 'Missing Required FIeld: imageUrl',
        details: `Request body must include imageUrl field.`,
        code: 400,
    }))
  }

  if(!body.channelName) {
    next( new BadRequest({
      message: 'Missing Required FIeld: channelName',
        details: `Request body must include channelName field.`,
        code: 400,
    }))
  }
  if(typeof body.imageUrl !== 'string') {
    next( new BadRequest({
      message: 'Type Mispatch: imageUrl',
        details: `imageUrl is of type String.`,
        code: 400,
    }))
  }

  if(typeof body.channelName !== 'string') {
    next( new BadRequest({
      message: 'Type Mispatch: channelName',
        details: `channelName is of type String.`,
        code: 400,
    }))
  }

  next();
}