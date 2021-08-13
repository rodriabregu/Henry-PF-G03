import axios from 'axios';
import { useState, useEffect } from "react";
import './CreateProducts.css';

const SelectCategory = (props:any) => {
    const { path } = props;
    const [elements, setelements] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/${path}`)
            .then(resp=>{
                setelements(resp.data);
            })
    }, [path])
    return(
        <select className={props.className} name={props.name} onChange={props.onChange}>
            {elements ? elements.map( (c:any) => <option id={c.id}>{c.name}</option>) : '' }
        </select>
    )
};

export default SelectCategory;