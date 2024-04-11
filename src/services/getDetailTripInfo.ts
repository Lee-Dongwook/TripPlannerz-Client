import axios from 'axios';

export const getDetailTripInfo = async (token: string | null, arr) => {
  if (token) {
    const response = await axios.get(`http://localhost:8080/api/trip/detail/${arr[2]}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }
  throw new Error('Token is Not Defined');
};
