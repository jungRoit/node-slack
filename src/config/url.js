require('dotenv').config();
const slackBaseUrl = 'https://slack.com/api';

export const clientRedirectUrl = `https://slack.com/oauth/v2/authorize?scope=incoming-webhook,commands,channels:read,chat:write&client_id=${process.env['CLIENT_ID']}`;

export const postMessageUrl = `${slackBaseUrl}/chat.postMessage`;
export const getAccessTokenUrl = `${slackBaseUrl}/oauth.v2.access`;
export const getChannelsUrl = `${slackBaseUrl}/conversations.list`;
