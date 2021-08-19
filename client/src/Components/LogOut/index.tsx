import './logout.css';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';

import { useAuth0 } from "@auth0/auth0-react";
  
const Logout = () => {

const { logout } = useAuth0();
const { user } = useAuth0<{ name: string }>();  
logout();

    return (
        <div className='form-register'>
            <div><h1>Come back soon {user?.name}!!!</h1></div>
        </div> );
};

export default Logout;