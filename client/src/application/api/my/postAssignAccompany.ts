import axios from 'axios';

export const postAssignAccompany = async(token: string | null, postToServer, check: boolean) => {
    if(token){
        const response = await axios.post(`http://localhost:8080/api/trip/responseAccompany/${check}`, postToServer, {
            headers:{'Authorization': `Bearer ${token}` }
        })
        return response;
    }

    throw new Error('Token in not valid');
}