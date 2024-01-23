import axios from 'axios';

export const getEntireTripList = async(token: string | null, pageNumber: number, order: string = "new", keyWord: string = "" ) => {
    if(token){
        const response = await axios.get(`http://localhost:8080/api/trip/tripList?page=${pageNumber}&sortType=${order}&keyWord=${keyWord}`,{
            headers: {'Authorization': `Bearer ${token}` }
        }) 
        return response;
    }
    throw new Error('Token is Not Defined');
}