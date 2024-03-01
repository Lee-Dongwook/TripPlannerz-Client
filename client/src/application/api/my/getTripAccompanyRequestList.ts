import axios from 'axios';

export const getTripAccompanyRequestList = async (token: string | null) => {
  if (token) {
    const response = await axios.get('http://localhost:8080/api/trip/accompany/requestList', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  throw new Error('Token in not valid');
};
