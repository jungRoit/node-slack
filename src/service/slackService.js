import axios from './axiosService';
import { getAccessTokenUrl, getChannelsUrl } from '../config/url';
import { getQueryString } from '../utils/util';
require('dotenv').config();

export const sendMessage = async () => {};

export const getChannels = async () => {
  return axios.get(getChannelsUrl,{
    headers: {
      'Authorization': `Bearer ${process.env['ACCESS_TOKEN']}`
    }
  });
}

export const getAccessToken = async (code) => {
  const body = getQueryString({
    client_id: process.env['CLIENT_ID'],
    client_secret: process.env['CLIENT_SECRET'],
    code: code,
  });

  return axios.post(getAccessTokenUrl, body);
};
