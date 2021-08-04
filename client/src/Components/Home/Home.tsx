import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/getProducts';
import { getProductsDetail } from '../../Redux/Actions/getProductsDetail';
import {IInfo} from "../../Data/index";
import { VscSearch } from 'react-icons/vsc';
/* import SearchBar from '../SearchBar/SearchBar'; */

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const products:any = useSelector<any>((state) => state.products);
  const productDetail = useSelector((s:any) => s.productsDetail)
  console.log('Product detail', productDetail)

  const handleChange = (e:any) => {
    setTitle(e.target.value)
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
        dispatch(getProductsDetail(dispatch, title));
        console.log('Dispatch getPD', dispatch(getProductsDetail(dispatch, title)))
  };

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  return (
    <div>
      {/* <SearchBar/> */}
      <div>
      <form onSubmit={ e => handleSubmit(e)}>
        <input type="text"
        autoComplete="off"
        value={title}
        onChange={e => handleChange(e)}    
        placeholder='Find product'  
        />
        <button type='submit'>
          Search <VscSearch/>
        </button>
      </form>
    </div>
      { productDetail?.length >= 1 ? 
      productDetail?.map((e:IInfo,index:number) =>{
        return (
          <div key={index}>
            <h1>{e.id}</h1>
            <img src={e.img} alt={e.name} />
          </div>
        )}) 
        :
        products?.map((e:IInfo,index:number) =>{
          return (
            <div key={index}>
              <h1>{e.name}</h1>
              <img src={e.img} alt={e.name} />
            </div>
          )}) 
      }
    </div>
  );
};

export default Home;
