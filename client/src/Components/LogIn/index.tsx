import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { PostUser } from '../../Redux/Actions/Users/postUser';
import './login.css';


const Login = () => {
    const dispatch = useDispatch();
    const { loginWithRedirect, user } = useAuth0();
    /* const isNew = true; */

    const userObj = {
        "id": user?.sub,
        "userName": user?.nickname,
        "email": user?.email,
        "firstName": user?.name,
        "lastName": user?.nickname,
        "hashPasword": user?.password_hash,
        "isNew": false,
    };

    loginWithRedirect();
    dispatch(PostUser(userObj));
    console.log('userObj',userObj)


    return (
        <div className='form-register'>
            <div><h1>LogIn/SingUp in process...</h1></div>
        </div>
    );
};

export default Login;