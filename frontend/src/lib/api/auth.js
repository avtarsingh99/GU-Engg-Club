import axios from 'axios';
import { BASE_PROD_URL, BASE_DEV_URL,RETURN_TOKENIZEZ_REQ } from './apiUtil';
const LOGIN_API = async (email, password)=>{
    try{
        const response = await axios.post('https://long-tan-rabbit-kit.cyclic.app/api/auth/login', {
            email,
            password
        });
        localStorage.setItem('token', response.data.accessToken);
        return {
            isError:false,
            data:response.data,
        };
    }catch(error){
        return error.response.data.errorInfo;
    }
}
const VERIFY_TOKEN_API = async ()=>{
    const tokenizedReq = RETURN_TOKENIZEZ_REQ();
    try {
        const response = await tokenizedReq.post(`${BASE_DEV_URL}/auth/verifytoken`);
        return {
            isError:false,
            data:response.data
        }
    } catch (error) {
        return error.response.data.errorInfo
    }
}
export {LOGIN_API, VERIFY_TOKEN_API};