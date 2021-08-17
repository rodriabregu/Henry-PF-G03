import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSales } from '../../Redux/Actions/Sales/getSale';

const SaleDetail = () => {
    /* const [local, setLocal] = useState<any>([]) */
    const { id } = useParams<any>();
    const dispatch = useDispatch()
    const allSales:any = useSelector<any>(s => s?.sales)
    /* setLocal(allSales) */
    const renderSale = allSales?.find((r:any) => r?.id == id); //Preguntar a Angel, types no funcan
    
    useEffect(() => {
        dispatch(getSales())
    }, [])

    return (
        <div>
            <span>{renderSale?.id}</span>
            <span>{renderSale?.state}</span>
        </div>
    )
}

export default SaleDetail;
