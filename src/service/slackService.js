import axios from './axiosService';
import streamifier  from 'streamifier';
import FormData from 'form-data' ;

import { getAccessTokenUrl, getChannelsUrl, postMessageUrl, uploadImageUrl } from '../config/url';
import { getQueryString, bufferToStream } from '../utils/util';
require('dotenv').config();

export const sendMessage = async body => {
  return axios.post(postMessageUrl,body,{
    headers: {
      'Authorization': `Bearer ${process.env['ACCESS_TOKEN']}`,
      'Content-Type':'application/json'
    }
  });
};

export const getChannels = async () => {
  return axios.get(getChannelsUrl,{
    headers: {
      'Authorization': `Bearer ${process.env['ACCESS_TOKEN']}`
    }
  });
}

export const uploadImage = async body => {
  let bodyFormData = new FormData();
  bodyFormData.append('file',body.file.buffer, body.file.originalname);
  bodyFormData.append('channels', body.channels);

  return axios({
    method: 'POST',
    url:uploadImageUrl,
    data:bodyFormData,
    headers: {
        'Authorization': `Bearer ${process.env['ACCESS_TOKEN']}`,
        'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}`      }
  });
};

export const getAccessToken = async (code) => {
  const body = getQueryString({
    client_id: process.env['CLIENT_ID'],
    client_secret: process.env['CLIENT_SECRET'],
    code: code,
  });

  return axios.post(getAccessTokenUrl, body);
};
