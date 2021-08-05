import { /* useState, */ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { getProducts } from '../../Redux/Actions/getProducts';
import { IInfo } from "../../Data/index";
import './home.css';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const products:any = useSelector<any>((state) => state.products);
  const productDetail = useSelector((s:any) => s.productsDetail);
/*   const categories = useSelector((s:any) => s.categories);             //filtrado de categories
  const [filter, setFilter] = useState([]); */                            //filtrado de categories


/*   const handleFilterCategories = (e:any) => {                          //filtrado de categories
    setFilter(e.target.value)                                             //filtrado de categories
  } */                                                                    //filtrado de categories

  useEffect(() => {
    dispatch(getProducts);
  }, []);

  return (
    <div>
      <div className='sheetGrid'>
{/*       <select onChange={e => handleFilterCategories(e)} >
        { categories && categories.length > 0 ? categories.map((c:string) => { /// Done para mapeado del filtrado de categories
          return (                                                             /// Done para mapeado del filtrado de categories
            <option key={c.id} value={c.name}>{c.name}</option>                /// Done para mapeado del filtrado de categories
          )                                                                    /// Done para mapeado del filtrado de categories
        }) : null}                                                             /// Done para mapeado del filtrado de categories
      </select> */}
      { productDetail?.length >= 1 ? 
      productDetail?.map((e:IInfo,index:number) =>{
        return (
          <div className='imgproducts'  key={index}>
            <Link style={{ textDecoration: 'none', color: '#FFF'}} to={`/product/${e.id}`}>
            <h1>{e.name.toUpperCase()}</h1>
            <h2>${e.price}.00</h2>
            <img src={e.img} alt={e.name} />
            </Link>
          </div>
        )}) 
        :
        products?.map((e:IInfo,index:number) =>{
          return (
            <div className='imgproducts' key={index}>
              <Link style={{ textDecoration: 'none', color: '#FFF'}} to={`/product/${e.id}`}>
              <div>{e.name.toUpperCase()}</div>
              <div>${e.price}.00</div>
              <img src={e.img} alt={e.name} />
              </Link>
            </div>
          )}) 
      }
      </div>
      
    </div>
  );
};

export default Home;
