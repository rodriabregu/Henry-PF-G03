import { useAuth0 } from "@auth0/auth0-react";
import './account.css';

const Account = () => {
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0<{ name: string, picture?: string, email: string, nickname: string }>();  //const {user} = useAuth0()

    return (
        <>
        {   isAuthenticated ?
        <div className='sheetGridAccount'>
            <span><img src={user?.picture} alt='image profile' /></span>
            <span>Name: {user?.name}</span>
            <span>Email: {user?.email}</span>
            <span>Nickname: {user?.nickname}</span>
        </div>
        :
        <div>
            <h1>Redirecting...</h1>
        </div>
        }
        </>
    )
}

export default Account;
