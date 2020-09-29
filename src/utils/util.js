export const  getQueryString =(data) => {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export const getChannelByName = (channels, name) => {
  return channels.find(channel => channel.name === name);
}