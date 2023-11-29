import axios from 'axios';

export const postTripLocationToServer = async(token: string | null, postToServer) => {
    if(token){
        const response = await axios.post("http://localhost:8080/api/saveLocation",postToServer,{
            headers: {'Authorization': `Bearer ${token}` }
        }) 
        return response;
    }
    throw new Error('Token is Not Defined');
}