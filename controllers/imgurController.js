import * as imgurService from '../services/imgurService.js';

const getAccessToken = async (req, res) => {
  const { message, accessToken } = await imgurService.getAccessToken();
  console.log(message);
  console.log(accessToken);
  res.send({ message, accessToken });
}

export default {
  getAccessToken
}