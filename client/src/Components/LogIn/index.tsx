import { useAuth0 } from "@auth0/auth0-react";
import './login.css';

const Login = () => {
    const { loginWithRedirect } = useAuth0();
    loginWithRedirect();
    return (
        <div className='form-register'>
            <div><h1>LogIn/SingUp in process...</h1></div>
        </div>
    );
};

export default Login;