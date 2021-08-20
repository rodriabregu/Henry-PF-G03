import React,{useEffect,useState} from 'react';
import axios from 'axios'
import {AiFillStar} from 'react-icons/ai'
import './Favs.css'

const Favs=()=>{
        
    const [favs,setFavs]=useState();
    const [user,setUser]=useState();
    const [idProduct,setIdProduct]=useState();

    useEffect(()=>{

        axios.get(`http://localhost:3001/api/favs/1`)
            .then(resp=>{
                setFavs(resp.data);
            })

    },[])

    const removeFav=async(productId)=>{        

        await axios(`http://localhost:3001/api/favs`,{
            method:'delete',
            data:{
                userId:1,
                productId
            }
        }).then(()=>{
            setFavs(favs.filter(f=>f.id!=productId))
        })
    }

    return(     
        <div className='wishlist' >   
            <h1>My wishlist <AiFillStar/> My favs</h1>
            <div className='cards-container'>
                    
           { favs?(
                favs?.map(p=>
                    <div className='card-fav'>
                        <h4>{p.name}</h4>
                        <div className='btn-div' >
                            <img src={p.photos[0].url} alt={p.name} width='150px' height='150px' />
                            <div className='price-btn'>
                            <p>Price: ${p.price}</p>
                            <button className='remove-fav' id={p.id} onClick={(e)=>removeFav(e.target.id)}> Remove </button>
                            </div>
                        </div>
                    </div>
                    
                )
            ):(<h3>Loading...</h3>) 
             }     
            </div> 
            </div> 
    )
}


export default Favs;