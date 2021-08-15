import axios from 'axios';
import { useState, useEffect } from "react";
import './CreateProducts.css';
import config from '../../../src/config';

const SelectCategory = (props:any) => {
    const { path } = props;
    const [elements, setelements] = useState([]);

    useEffect(()=>{
        axios.get(`http://${config.REACT_APP_API_URL}:3001/api/${path}`)
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