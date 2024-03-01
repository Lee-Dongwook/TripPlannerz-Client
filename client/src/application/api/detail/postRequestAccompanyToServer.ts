import axios from 'axios';

export const postRequestAccompanyToServer = async (token: string | null, postToServer) => {
  if (token) {
    const response = await axios.post('http://localhost:8080/api/trip/postComment', postToServer, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }
  throw new Error('Token is Not Defined');
};
