import axios from 'axios';

export const getEntireTripList = async(token: string | null) => {

    // 서버 변경에 따른 임시 적용
    const currentNumber = 0;
    const order = "new";

    if(token){
        const response = await axios.get(`http://localhost:8080/api/trip/tripList?page=${currentNumber}&sortType=${order}&keyWord=`,{
            headers: {'Authorization': `Bearer ${token}` }
        }) 
        return response;
    }
    throw new Error('Token is Not Defined');
}