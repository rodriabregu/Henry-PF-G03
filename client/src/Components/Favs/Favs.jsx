import React,{useEffect,useState} from 'react';
import axios from 'axios'

const Favs=()=>{
        
    const [favs,setFavs]=useState();
    const [user,setUser]=useState();
    const [idProduct,setIdProduct]=useState();

    useEffect(()=>{

        axios.get(`http://localhost:3001/api/favs/1`)
            .then(resp=>{
                setFavs(resp.data);
            })

    },[favs])

    const removeFav=async(productId)=>{
        await axios.put(`http://localhost:3001/api/favs`,{productId,userId:1})
    }

    return(        
            favs?(
                favs.map(p=>
                    <div>
                        <h4>{p.name}</h4>
                        <img src={p.photos[0].url}/>
                        <p>Price: {p.price}</p>
                        <button id={p.id} onClick={(e)=>removeFav(e.target.id)}>Quitar</button>                        
                    </div>
                )
            ):(
                ''
            )        
    )
}


export default Favs;