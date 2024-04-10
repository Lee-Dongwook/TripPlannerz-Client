/* eslint-disable no-undef */
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'qs';

const app = express();
dotenv.config();

const kakao = {
  CLIENT_ID: process.env.KAKAO_ID,
  REDIRECT_URI: process.env.REDIRECT_URI,
};

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/oauth/callback/kakao', async (req, res) => {
  let token;
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: kakao.CLIENT_ID,
        redirect_uri: kakao.REDIRECT_URI,
        code: req.query.code,
      }),
    });
    token = response.data.access_token;
  } catch (error) {
    res.json(error.response.data);
    return;
  }

  try {
    const url = 'https://kapi.kakao.com/v2/user/me';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const userInfoResponse = await axios.get(url, { headers });
    const { nickname, profile_image: img } = userInfoResponse.data.properties;
    res.send({ message: `${nickname}님 반갑습니다!`, img });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
