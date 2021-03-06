import axios from 'axios';
import { useState, useEffect } from "react";
import config from '../../../src/config';
import './CreateProducts.css';

const SelectCategory = (props:any) => {
    const { path } = props;
    const [elements, setelements] = useState([{ id:0, name:"" }]);

    useEffect(()=>{
        axios.get(`http://${config.REACT_APP_API_URL}:3001/api/${path}`)
            .then(resp=>{
                setelements(resp.data);
            })
    }, [path]);

    return(
        <select className={props.className} name={props.name} onChange={props.onChange}>
            {elements ? [{id:0, name:""}, ...elements].map( (c:any, index:any) => <option key={index} id={c.id}>{c.name}</option>) : '' }
        </select>
    )
};

export default SelectCategory;