import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSales } from '../../Redux/Actions/Sales/getSale';
import { putSale } from '../../Redux/Actions/Sales/putSale';

const SaleDetail = () => {
    const [select, setSelect] = useState<any>([])
    const { id } = useParams<any>();
    const dispatch = useDispatch()
    const allSales:any = useSelector<any>(s => s?.sales)
    const renderSale = allSales?.find((r:any) => r?.id == id); //Preguntar a Angel, types no funcan

    const objetito = {
        saleId: id,
        newState: select
    };

    const handleChange = (e:any) => {
        if(e.target.name === 'select') {
            setSelect(e.target.value)
        } else {
            dispatch(putSale(objetito))
            window.location.reload()
        }
    };

    useEffect(() => {
        dispatch(getSales())
    }, []);


    return (
        <>
        <div>
            <span>{renderSale?.id}</span>
            <span>{renderSale?.state}</span>
            <span>{renderSale?.userId}</span>
            <div>
            {
            renderSale?.state === 'Pending' ?
            <select onChange={e => handleChange(e)} name='select'>
                <option value='Created'>Created</option>
                <option value='Cancelled'>Cancelled</option>
            </select>
            : renderSale?.state === 'Created' ?
            <select onChange={e => handleChange(e)} name='select'>
                <option value='---'>State:</option>
                <option value='Processing'>Processing</option>
                <option value='Cancelled'>Cancelled</option>
            </select>
            : renderSale?.state === 'Processing' ?
            <select onChange={e => handleChange(e)} name='select'>
                <option value='---'>State:</option>
                <option value='Complete'>Complete</option>
                <option value='Cancelled'>Cancelled</option>
            </select>
            : renderSale?.state === 'Complete' ?
            <select onChange={e => handleChange(e)} name='select'>
                <option value='---'>Cancel?</option>
                <option value='Cancelled'>Yes</option>
                <option value='---'>No</option>
            </select>
            : ''
            }
            </div>
            <button onClick={handleChange}>Change state</button>
        </div>
        </>
    )
};

export default SaleDetail;