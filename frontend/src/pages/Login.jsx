import { LOGIN_API } from '../lib/api/auth';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate();
    const handleLogin = async () => {
        const data = await LOGIN_API("rakeshdhariwal61@gmail.com", "newpassword");
        if(!data.isError){
            localStorage.setItem('token', data.token);
            return navigate('/');
        }
        else{
            alert(data.errorMessage);
        }
    }
    return (
        <div>
            <button onClick={handleLogin}>Click me to login</button>
        </div>
    )
}