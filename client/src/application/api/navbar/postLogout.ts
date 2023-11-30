import axios from 'axios';

export const postLogout = async(token: string | null) => {

    if(token){
        const postToData = {
            token: token
        }

        const response = await axios.post('http://localhost:8080/api/members/logout', postToData, {
            headers: { 'Authorization': `Bearer ${token}` }
        })

        return response;
    }

    throw new Error('Token is not valid');
}