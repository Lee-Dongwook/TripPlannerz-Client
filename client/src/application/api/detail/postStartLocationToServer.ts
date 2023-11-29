import axios from 'axios';

export const postStartLocationToServer = async(token: string | null, postToServer) => {
    if(token){
        const response = await axios.post("http://localhost:8080/api/optimizeRoute", postToServer,{
            headers: {'Authorization': `Bearer ${token}` }
        }) 
        return response;
    }
    throw new Error('Token is Not Defined');
}