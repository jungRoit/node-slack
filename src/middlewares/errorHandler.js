import BaseError from '../error/BaseError';

export const genericErrorHandler = (Error, req, res, next) => {
  console.log('handler', Error);
  let stack = {};
  
  if (Error.message && Error.code) {
    const error = {
      message: Error.message,
      data: {
        details: Error.details,
      }
    };
    res.status(500).json(error);
  } else {
    const error = {
      message: 'Internal Server Error',
      data: {
        details: Error.toString(),
      }
    };
    res.status(500).json(error);
  }
};
