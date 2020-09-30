import stream from 'stream';

export const  getQueryString =(data) => {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export const getChannelByName = (channels, name) => {
  return channels.find(channel => channel.name === name);
}


export function getExtention(fileName) {
  // file.jpg returns .jpg
  let array = fileName.split('.');
  return array[array.length - 1];
}

export function getFileName(fileName) {
  // file.jpg returns file
  let array = fileName.split('.');
  return array[0];
}

export const bufferToStream = (buffer) => {
  const { Duplex } = stream;
  const duplexStream = new Duplex();
  duplexStream.push(buffer);
  // duplexStream.push(null);
  return duplexStream;
}