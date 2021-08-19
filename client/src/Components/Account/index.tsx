import { useAuth0 } from "@auth0/auth0-react";
import './account.css';

const Account = () => {
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0<{ name: string, picture?: string, email: string, nickname: string }>();  //const {user} = useAuth0()


/*  email: "rodrigo_alcino@hotmail.com"
    email_verified: true
    family_name: "Abregu"
    given_name: "Rodrigo"
    locale: "en"
    name: "Rodrigo Abregu"
    nickname: "rodrigo_alcino"
    picture: "https://lh3.googleusercontent.com/a/AATXAJy9VzH8K5FsFDSAajCaoR8Iq6M1j-KDao4_Ns4e=s96-c"
    sub: "google-oauth2|114419829152049596306" */

    return (
        <>
        {   isAuthenticated ?
        <div className='sheetGrid'>
            <img src={user?.picture} alt='image profile' />
            <span>Name: {user?.name}</span>
            <span>Email: {user?.email}</span>
            <span>Nickname: {user?.nickname}</span>
        </div>
        :
        <div>
            <h1>Redirectin...</h1>
        </div>
        }
        </>
    )
}

export default Account;
