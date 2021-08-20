import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSales } from '../../Redux/Actions/Sales/getSale';
import { useAuth0 } from "@auth0/auth0-react";

const SalesAccount = () => {
    const dispatch = useDispatch()
    const allSales:any = useSelector<any>(s => s.sales)
    const { id } = useParams<any>();
    const { isAuthenticated } = useAuth0();
    const { user } = useAuth0<{ name: string, picture?: string, email: string, nickname: string, sub: string }>();
    
    const filterUser = allSales?.filter((f:any) => f.userId === user?.sub);

    useEffect( () => {
        dispatch(getSales())
    }, []);

    return (
        <div>
            {
                filterUser.map((f:any) => {
                    return ( 
                        <>
                        <div>
                            <span>{f}</span>             
                            <span>{f.items}</span>             
                            <span>{f.state}</span>
                        </div>             
                        </>
                    )
                })
            }
        </div>
    )
};

export default SalesAccount;