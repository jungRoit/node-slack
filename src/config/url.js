 const slackBaseUrl = 'https://slack.com/api';

export const clientRedirectUrl = 'https://slack.com/oauth/v2/authorize?scope=incoming-webhook,commands,channels:read,chat:write&client_id=1397073380212.1387800952277';

export const postMessageUrl = `${slackBaseUrl}/chat.postMessage`;
export const getAccessTokenUrl = `${slackBaseUrl}/oauth.v2.access`;
