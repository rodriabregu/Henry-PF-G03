import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';


const SelectCategory=(props:any)=>{

    const {path}=props;

    const [elements,setelements]=useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/${path}`)
            .then(resp=>{
                setelements(resp.data);
            })
    },[])

    return(
        <select>
            {elements?elements.map((c:any)=><option value={c.id}>{c.name}</option>):''}
        </select>
    )
}


export default SelectCategory;