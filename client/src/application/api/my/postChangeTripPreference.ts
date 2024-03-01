import axios from 'axios';

export const postChangeTripPreference = async (token: string | null, postToServer) => {
  if (token) {
    const response = await axios.post(
      'http://localhost:8080/api/trip/accompany/requestList',
      postToServer,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  }

  throw new Error('Token in not valid');
};
