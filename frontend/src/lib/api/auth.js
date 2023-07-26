import axios from 'axios';
const LOGIN_API = async (email, password)=>{
    try{
        const response = await axios.post('https://long-tan-rabbit-kit.cyclic.app/api/auth/login', {
            email,
            password
        });
        return {
            isError:false,
            response,
        };
    }catch(error){
        return error.response.data.errorInfo;
    }
}
export {LOGIN_API};