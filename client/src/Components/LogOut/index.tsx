import { useAuth0 } from "@auth0/auth0-react";
import './logout.css';

const Logout = () => {
const { logout } = useAuth0();
const { user } = useAuth0();
console.log(user);
//const { user } = useAuth0<{ name: string }>();  
    logout();

    return (
        <div className='form-register'>
            <div><h1>Come back soon {user?.name}!</h1></div>
        </div> );
};

export default Logout;