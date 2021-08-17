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
        if(e.target.name === 'selec') {
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
            <select onChange={e => handleChange(e)} name='selec'>
                <option value='Pending'>Pending</option>
                <option value='Created'>Created</option>
                <option value='Processing'>Processing</option>
                <option value='Complete'>Complete</option>
                <option value='Cancelled'>Cancelled</option>
            </select>
            </div>
            <button onClick={handleChange}>Aprobada</button>
        </div>
        </>
    )
};

export default SaleDetail;
