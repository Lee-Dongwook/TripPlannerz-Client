import axios from 'axios';

export const postDeleteMemberInfo = async (token: string | null, postToServer) => {
  if (token) {
    const response = await axios.post('http://localhost:8080/api/members/exit', postToServer, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  throw new Error('Token in not valid');
};
