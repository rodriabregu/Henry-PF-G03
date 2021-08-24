import { useState } from 'react';
import Geocode from 'react-geocode'
import Map from './Map'
import axios from 'axios'
import './Destiny.css';

Geocode.setApiKey("AIzaSyBeDbO4AKXkxGq42frll9RTIKIYZCj-TEA");
Geocode.setLanguage("en");
Geocode.setRegion("es");

function Destiny() {

    const [input, setInput] = useState({
        address: '',
        lat: 0,
        lng: 0,
        view: false,
        especifications: '',
        formatted_address: '',
        fullName: '',
        dni: ''
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Geocode.fromAddress(input.address)
            .then(resp => {
                const { lat, lng } = resp.results[0].geometry.location;
                const { formatted_address } = resp.results[0]
                setInput({
                    ...input,
                    lat,
                    lng,
                    view: true,
                    formatted_address
                })
            })
            .catch(e => { console.log(e) })
    }

    const sendData = (e) => {
        const body = {
            localAddress: input.address,
            mapAddress: input.formatted_address,
            description: input.especifications,
            fullName:input.fullName,
            dni:input.dni,
            saleId:1
        }
       // {localAddress,mapAddress,description,fullName,dni,saleId}=req.body;
        axios.post('http://localhost:3001/api/destiny',body)
            .then(resp=>console.log(resp))
            .catch(err=>console.log(err))
    }

    return (
        <div className='destiny-container'>
            <div className='destiny-form'>
                <div className='cont-div'>
            <h1>Shipping Address </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Address: </label>
                    <input type="text" required onChange={handleChange} name="address" />
                </div>
                <div className='text-especif'>
                    <label>Especifications: (floor, departament)</label>
                    <textarea onChange={handleChange} required name='especifications'></textarea>
                </div>
                <div>
                    <label>Full Name:</label>
                    <input type="text" required onChange={handleChange} name="fullName" />
                </div>
                <div>
                    <label>ID/Passport:</label>
                    <input type="text" required onChange={handleChange} name="dni" />
                </div>
                <div>
                    <input className='soy-btn' type="submit" required value="Ok"></input>
                </div>
            </form>
            </div>
            </div>
            {
                input.view && (
                    <>
                        <Map lat={input.lat} lng={input.lng} />
                        <div className='data-confirm'>
                            <h3>Data</h3>
                            <p>{input.formatted_address}</p>
                            <p>Is this information correct?</p>
                            <button className='btn-map' onClick={sendData}>YES</button>
                            {/* <button>NO</button> */}
                        </div>

                    </>
                )
            }


        </div>
    )
}

export default Destiny