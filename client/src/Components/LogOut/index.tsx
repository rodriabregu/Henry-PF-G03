import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import config from '../../../src/config';
import axios from "axios";
import './logout.css';

const Logout = () => {
  const { logout } = useAuth0();
  const { user } = useAuth0();

  logout();
  useEffect(() => {
    return () => {
      axios.get(
        `http://${config.REACT_APP_API_URL}:${config.port}/api/cart/${user?.sub}`
      )
    }
  }, []);

  localStorage.clear();

  return (
    <div className='form-register'>
      <h1>Come back soon {user?.name}!</h1>
    </div>
  );
};

export default Logout;