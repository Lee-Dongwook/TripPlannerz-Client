import axios from 'axios';

export const postVerifyMemberPassword = async (token: string | null, postToServer) => {
  if (token) {
    const response = await axios.post('http://localhost:8080/api/members/verify/pw', postToServer, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  throw new Error('Token in not valid');
};
