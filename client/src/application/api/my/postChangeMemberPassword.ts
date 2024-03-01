import axios from 'axios';

export const postChangeMemberPassword = async (token: string | null, postToServer) => {
  if (token) {
    const response = await axios.post('http://localhost:8080/api/members/change/pw', postToServer, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  throw new Error('Token in not valid');
};
