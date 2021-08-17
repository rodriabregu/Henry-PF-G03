import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/Products/getProducts';
import { getFilteredProducts } from '../../Redux/Actions/Products/getFilteredProducts';
import { clearFilters } from '../../Redux/Actions/Products/clearFilters';
import { IInfo } from "../../Data/index";
import { NavLink as Link } from 'react-router-dom';
/* import AddCart from '../Cart'; */
import SearchBar from '../SearchBar/SearchBar';
import SelectCategory from '../Products/SelectCategory';
import './Pagination.css';

interface ProductsCart {
    name: any;
    id: number;
    price: any;
    size: any;
    review: any;
    img: any;
    photos: any;
    stock: any;
    brand: any;
    description: any;
    categories: any;
}

const Pagination = () => {
    const dispatch = useDispatch();

    const products: any = useSelector<any>(s => s.products);
    const productDetail: any = useSelector<any>(s => s.productsDetail);
    const [filterp, setFilterp] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, _setitemsPerPage] = useState(10);

    const [pageNumberLimit, _setpageNumberLimit] = useState(8);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(8);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    /* const [category,setCategory] = useState(''); */

    const handleClick = (e: any) => {
        setcurrentPage(Number(e.target.id));
    };

    const selectChange = (e:any) => {
        setcurrentPage(1)
        dispatch(getFilteredProducts(e.target.value))
    };

    const handleFilter=()=>{
        dispatch(clearFilters())
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

    function onSearch(value: any) {
        const filtrados = products.filter(
            (p: any) => p.name ? p.name.toLowerCase().includes(value) : '' || p.brand ? p.brand.name.toLowerCase().includes(value) : '');
            setcurrentPage(1)
            setFilterp(filtrados);
    }

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
                                        <h2>{e.name.toUpperCase()}</h2>
                                        <h3>${e.price}.00</h3>
                                        <img src={e.img} alt={e.name} />
                                    </Link>
                                </div>
                            )
                        })
                        :
                        filterp?.map((e: ProductsCart, index: number) => {
                            return (
                                <div className='imgproducts' key={index}>
                                    <Link style={{ textDecoration: 'none', color: '#000000' }} to={`/product/${e.id}`}>
                                        <div className='name'>{e.name}</div>
                                        <div>${e.price}.00</div>
                                        <img src={e.photos?e.photos[0].url:''} alt={e.name} />
                                    </Link>
                                    {/* <AddCart 
                                    id={e.id}
                                    name={e.name}
                                    photo={e.photos} 
                                    stock={e.stock} 
                                    price={e.price}
                                    brand={e.brand}
                                    description={e.description}
                                    categories={e.categories}
                                    /> */}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
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
                <SearchBar onSearch={onSearch} />
            </div>
                <div className='filters'>
                    <SelectCategory onChange={selectChange} path='categories'/>
                    
                        {/* <select onChange={selectChange}>
                            <option>Accesories</option>
                            <option>Kids</option>
                            <option>Men</option>
                            <option>Women</option>
                        </select> */}
                        <button onClick={handleFilter}>Set Filters</button>
                </div>  
            <div className='pageNumbers'>
                {currentPage > 1 ? <button onClick={handlePrevbtn}>Prev</button> : ""}
{/*                 <button
                    onClick={handlePrevbtn}
                    disabled={currentPage === pages[0] ? true : false}>
                        Prev
                </button> */}
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                <button
                    onClick={handleNextbtn}
                    disabled={currentPage === pages[pages.length - 1] ? true : false}>
                        Next
                </button>
            </div>
            {renderProduct(currentItems)}
        </div>
    );
};

export default Pagination;