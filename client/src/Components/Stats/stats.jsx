import { useEffect, useState } from "react";
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import config from '../../../src/config';

const Stats = () => {

    const [units, setUnits] = useState([]);
    const [products, setProducts] = useState([]);
    const [amounts, setAmounts] = useState([]);
    const [graph, setGraph] = useState('amount')


    const handleChange = (e) => {
        setGraph(e.target.value)
    }

    useEffect(() => {

        axios.get(`http://${config.REACT_APP_API_URL}:3001/api/stats`)
            .then(resp => {
                setAmounts(resp.data)
                console.log(amounts)
            })

        axios.get(`http://${config.REACT_APP_API_URL}:3001/api/stats/top10`)
            .then(resp => {
                setProducts(resp.data.products)
                setUnits(resp.data.units)
            })
    }, [])


    const dataAmounts = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
        datasets: [{
            label: 'Amounts per month',
            backgroundColor: 'rgba(0,255,0,1)',
            borderColor: 'black',
            borderWith: 1,
            hoverBackgroundColor: 'rgba(0,255,0,0.2)',
            hoverBorderColor: '#FF0000',
            data: amounts
        }]
    }

    const dataProducts = {
        labels: products,
        datasets: [{
            label: 'Top 5 most selled products',
            backgroundColor: 'rgba(0,255,0,1)',
            borderColor: 'black',
            borderWith: 1,
            hoverBackgroundColor: 'rgba(0,255,0,0.2)',
            hoverBorderColor: '#FF0000',
            data: units
        }]
    }

    const opciones = {
        maintainAspectRatio: false,
        responsive: true
    }

    return (
        <div>

            <select onChange={handleChange}>
                <option value="amount">Monthly amounts</option>
                <option value="top">Top 10 products</option>
            </select>
            {
                graph === "amount" ? (
                    <div style={{ width: '80%', height: '400px' }}>
                        <Bar data={dataAmounts} options={opciones} />
                    </div>
                ) : (
                    <div style={{ width: '80%', height: '400px' }}>
                        <Bar data={dataProducts} options={opciones} />
                    </div>
                )
            }
        </div>
    )
}

export default Stats;