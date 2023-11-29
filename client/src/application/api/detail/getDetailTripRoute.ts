import axios from 'axios';

export const getDetailTripRoute = async(token: string | null, id: string) => {
    if(token){
        const response = await axios.get(`http://localhost:8080/api/getRoute?tripUUID=${id}`,{
            headers: {'Authorization': `Bearer ${token}` }
        }) 
        return response;
    }
    throw new Error('Token is Not Defined');
}