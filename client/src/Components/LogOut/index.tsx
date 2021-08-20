import { useAuth0 } from "@auth0/auth0-react";
import './logout.css';

const Logout = () => {
const { logout } = useAuth0();
const { user } = useAuth0();

logout();

    return (
        <div className='form-register'>
            <h1>Come back soon {user?.name}!</h1>
        </div> 
    );
};

export default Logout;