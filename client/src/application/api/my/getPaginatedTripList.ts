import axios from 'axios';

export const getPaginatedTripList = async (
  token: string | null,
  currentNumber: number,
  order: string
) => {
  if (token) {
    const response = await axios.get(
      `http://localhost:8080/api/trip/tripList?page=${currentNumber}&sortType=${order}&keyWord=`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  }
  throw new Error('Token is Not Defined');
};
