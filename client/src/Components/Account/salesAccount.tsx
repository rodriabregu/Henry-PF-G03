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
      <h1>My purchases</h1>
      {
        filterUser?.map((f: any) => {
          return (
            <>
              <div className='s-details'>
                {<span>Date: {moment(f.date).format("DD-MM-YYYY HH:mm")}</span>}
                {f.items?.map((x: any) => {
                  return (
                    <div>
                      <NavLink style={{textDecoration:'none', color:'#cecff1'}} to={`/product/${x.productId}`}>
                        <span>{x.productName}{<br />}</span>
                      </NavLink>
                      <span>Units: {x.units}{<br />}</span>
                      <span>Price: ${x.salePrice}{<br />}</span>
                      { x.units > 1 ? <span>Total Price for item: ${x.units*x.salePrice}{<br />}</span> : ''}
                      {<br />}
                    </div>
                  )
                })}
                <span>State: {f.state}</span>                
              </div>
            </>
          )
        })
      }
    </div>
  )
};

export default SalesAccount;