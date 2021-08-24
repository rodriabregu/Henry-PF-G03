import axios from 'axios'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredProducts } from '../../Redux/Actions/Products/getFilteredProducts';
import { clearFilters } from '../../Redux/Actions/Products/clearFilters';
import { product, state, user } from '../../typesApp'
import { IInfo } from "../../Data/index";
import { NavLink as Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { AiFillStar } from 'react-icons/ai'
import SearchBar from '../SearchBar/SearchBar';
import SelectCategory from '../Products/SelectCategory';
/* import AddCart from '../Cart'; PENDIENTE DE SOLVENTAR IMPLEMENTACION TS*/
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth0<{ isAuthenticated: boolean }>();
  //const { user } = useAuth0<{ name: string, picture?: string, email: string, nickname: string, sub: string }>();
  const products: product[] = useSelector((s: state) => s.products);
  const productDetail: any = useSelector<any>(s => s.productsDetail);
  const user: user = useSelector((s: state) => s.user)

  const [filterp, setFilterp] = useState<product[]>([]);
  const [favs, setFavs] = useState<any>([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, /* _setitemsPerPage */] = useState(12);
  const [pageNumberLimit, /* _setpageNumberLimit */] = useState(8);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(8);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (e: any) => {
    setcurrentPage(Number(e.target.id));
  };

  const selectChange = (e: any) => {
    setcurrentPage(1)
    dispatch(getFilteredProducts(e.target.value))
  };

  const handleFilter = () => {
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
  };

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
  };

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

  const addFav = async (productId: number) => {
    try {
      let resp = await axios.post(`http://localhost:3001/api/favs`, { productId, userId: user.id })
      setFavs({ ...favs, productId })
    } catch (e) {
      console.log(e.response)
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  };

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  };

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
            filterp?.map((e: product, index: number) => {
              return (
                <div className='imgproducts' key={index}>
                  <Link style={{ textDecoration: 'none', color: '#000000' }} to={`/product/${e.id}`}>
                    <div className='name' >{e.name}</div>
                    <div>${e.price}.00</div>
                    <img src={e.photos ? e.photos[0].url : ''} height='200px' width='200px' alt={e.name} />
                  </Link>
                  <div>
                    {
                      isAuthenticated ?
                        <button style={{ textDecoration: 'none' }} className='btn-fav' id={`${e.id}`} onClick={(e: any) => addFav(e.target.id)}>Add to favs <AiFillStar /></button>
                        :
                        <Link to='/login'>
                          <button style={{ textDecoration: 'none' }} className='btn-fav' id={`${e.id}`} onClick={(e: any) => addFav(e.target.id)}>Add to favs <AiFillStar /></button>
                        </Link>
                    }
                  </div>
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
  };

  useEffect(() => {
    setFilterp(products);
  }, [products]);

  return (
    <div>
      <div className='search-bar'>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className='filters'>
        <SelectCategory onChange={selectChange} path='categories' />
        <button onClick={handleFilter}>Set Filters</button>
      </div>
      <div className='pageNumbers'>
        {currentPage > 1 ? <button onClick={handlePrevbtn}>Prev</button> : ""}
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <button onClick={handleNextbtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
          Next
        </button>
      </div>
      {renderProduct(currentItems)}
      <div className='pageNumbers'>
        {currentPage > 1 ? <button onClick={handlePrevbtn}>Prev</button> : ""}
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <button onClick={handleNextbtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;