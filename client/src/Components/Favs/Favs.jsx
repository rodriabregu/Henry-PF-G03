import axios from 'axios'
import { useEffect ,useState } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import './Favs.css'
import config from './config';

const Favs=()=>{
    const [favs,setFavs]=useState();
    const user=useSelector(s => s.user)

    const removeFav = async (productId) => {        
//        await axios(`http://localhost:3001/api/favs`, {
        await axios(`http://${config.REACT_APP_API_URL}:${config.port}/api/favs`, {
            method:'delete',
            data: {
                userId:user.id,
                productId
            }
        })
        .then(() => {
            setFavs(favs.filter(f => f.id != productId))
        })
    };

    useEffect(()=>{
        console.log('trayendo datos del usuario con id ',user.id)
//        axios.get(`http://localhost:3001/api/favs/${user.id}`)
        axios.get(`http://${config.REACT_APP_API_URL}:${config.port}/api/favs/${user.id}`)
        .then( resp => {
                setFavs(resp.data);
            })
    },[]);

    return(
        <div className='wishlist'>
            <h1>My wishlist <AiFillStar/> My favs</h1>
        {
        favs <= 0 &&
            <div className='cardempty'>
                <div className='emptyfavs'>
                    <h3>Your favorites list is empty, stop by & <Link to='/home'>see the latest news</Link>!</h3>
                </div>
            </div>
        }
            <div className='cards-container'>        
        { favs ? 
            (
                favs?.map( p =>
                    <div className='card-fav'>
                        <Link to={`/product/${p.id}`}><h4>{p.name}</h4></Link>
                        <div className='btn-div'>
                            <img src={p.photos[0].url} alt={p.name} width='150px' height='150px' />
                            <div className='price-btn'>
                                <p>Price: ${p.price}</p>
                                <button className='remove-fav' id={p.id} onClick={(e) => removeFav(e.target.id)}> Remove </button>
                            </div>
                        </div>
                    </div>
                )
                ) : <h3>Loading...</h3>
            }
            </div>
        </div>
    )
};

export default Favs;