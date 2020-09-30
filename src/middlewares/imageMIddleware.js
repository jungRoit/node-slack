import  multer from 'multer';
import BadRequest from '../error/BadRequest';
import { getExtention } from '../utils/util';

function getMulterOptions(storage, maxFileSize, validFileExtensions) {
  return {
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter: function(req, file, cb) {
      if (!validFileExtensions.length) cb(null, true);
      else if (validFileExtensions.includes(getExtention(file.originalname))) cb(null, true);
      else
        cb(
          new BadRequest({
            message:'Invalid file format',
            details:`Invalid file format! Only ${validFileExtensions} formats are allowed!`,
            code: 400
          
          })
        );
    }
  };
}

export function parseMultiPartFormData(req, res, next) {
  const multerStorage = multer.memoryStorage();
  const multerOptions = getMulterOptions(multerStorage, 5000000, ['jpg', 'png', 'jpeg']);

  const mutlerInstance = multer(multerOptions).single('file');
  
  mutlerInstance(req, res, async err => {
    if (err) {
      return next(err);
    }

    if(!req.body.channels) {
     return next( new BadRequest({
        message: 'Missing Required FIeld: channels',
          details: `Request body must include channels field.`,
          code: 400,
      }))
    }

    if(typeof req.body.channels !== 'string') {
      return next( new BadRequest({
        message: 'Type Mispatch: channels',
          details: `channels is of type String. it should have comma-separated list of channels.`,
          code: 400,
      }))
    }
    
    if (!req.file) {
      return next(new BadRequest({
        message:'Image not available',
        details:'No image is attached with the request',
        code: 400
      }));
    }
    next();
  });
}
