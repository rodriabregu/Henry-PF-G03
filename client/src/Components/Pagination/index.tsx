import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';
import { IInfo } from "../../Data/index";
import { NavLink as Link } from 'react-router-dom';
import './Pagination.css';
import SearchBar from '../SearchBar/SearchBar';

const Pagination = () => {
    const dispatch = useDispatch();

    const products:any = useSelector<any>(s => s.products);
    const productDetail:any = useSelector<any>(s => s.productsDetail);
    const [filterp, setFilterp] = useState([]);
/*     const [render, setRender] = useState([]); */

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(10);

    const [pageNumberLimit, setpageNumberLimit] = useState(8);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(8);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (e: any) => {
        setcurrentPage(Number(e.target.id));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(filterp.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage; // 8
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; //0

    let currentItems;

    if (Array.isArray(products)) {
        currentItems = filterp.slice(indexOfFirstItem, indexOfLastItem); //0-8
    }

    const renderPageNumbers = pages.map((number: any) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? 'active' : ''}>
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    const renderProduct = (filterp: any) => {
        return (
            <div>
                <div className='sheetGrid'>
                    {productDetail?.length >= 1 ?
                        productDetail?.map((e: IInfo, index: number) => {
                            return (
                                <div className='imgproducts' key={index}>
                                    <Link style={{ textDecoration: 'none', color: '#000000' }} to={`/product/${e.id}`}>
                                        <h1>{e.name.toUpperCase()}</h1>
                                        <h2>${e.price}.00</h2>
                                        <img src={e.img} alt={e.name} />
                                    </Link>
                                </div>
                            )
                        })
                        :
                        filterp?.map((e: IInfo, index: number) => {
                            return (
                                <div className='imgproducts' key={index}>
                                    <Link style={{ textDecoration: 'none', color: '#000000' }} to={`/product/${e.id}`}>
                                        <div>{e.name.toUpperCase()}</div>
                                        <div>${e.price}.00</div>
                                        <img src={e.photos[0].url} alt={e.name} />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    function onSearch(value:any) {
    const filtrados = products.filter(
        (p:any) => p.name.toLowerCase().includes(value) || p.brand.toLowerCase().includes(value)/*  || console.log(p.name.includes(value)) */ );
            setFilterp(filtrados);
    }

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        setFilterp(products);
    }, [products]);

    return (
        <div>
            <div className='search-bar'>
            <SearchBar onSearch={onSearch}/>
            </div>
            <div className='pageNumbers'>
                {/* <li> */}
                    <button
                        onClick={handlePrevbtn}
                        disabled={currentPage === pages[0] ? true : false}>
                        Prev
                    </button>
                {/* </li> */}
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
               {/*  <li> */}
                    <button
                        onClick={handleNextbtn}
                        disabled={currentPage === pages[pages.length - 1] ? true : false}>
                        Next
                    </button>
                {/* </li> */}
            </div>
            
            {renderProduct(currentItems)}
            
        </div>
    );
};

export default Pagination;
