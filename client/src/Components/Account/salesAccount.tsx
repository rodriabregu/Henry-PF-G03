import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { getSales } from '../../Redux/Actions/Sales/getSale';
import moment from 'moment';
import './salesAccount.css';

const SalesAccount = () => {
  const dispatch = useDispatch();
  const allSales: any = useSelector<any>(s => s.sales);
  const { user } = useAuth0<{ name: string, picture?: string, email: string, nickname: string, sub: string }>();
  const filterUser = allSales?.filter((f: any) => f.userId === user?.sub);

  useEffect(() => {
    dispatch(getSales())
  }, []);

  return (
    <div className='salesAccountcss'>
      {
        filterUser?.map((f: any) => {
          return (
            <>
              <div className='s-details'>
                {<span>Date: {moment(f.date).format("DD-MM-YYYY HH:mm")}</span>}
                {f.items?.map((x: any) => {
                  return (
                    <div>
                      <NavLink to={`/product/${x.productId}`}>
                        <span>{x.productName}{<br />}</span>
                      </NavLink>
                      <span>Price: {x.salePrice}{<br />}</span>
                      <span>Units: {x.units}</span>
                    </div>
                  )
                })}
                <span>State: {f.state}</span>
                {f.state === 'Pending' &&
                  <NavLink to='/destiny/0'>
                    <button
                      onClick={() => dispatch({
                        type: "URL_PAGO",
                        payload: f.url_pago
                      })}
                      className='btn-backhome'
                    >Continue</button>
                  </NavLink>
                }
              </div>
            </>
          )
        })
      }
    </div>
  )
};

export default SalesAccount;