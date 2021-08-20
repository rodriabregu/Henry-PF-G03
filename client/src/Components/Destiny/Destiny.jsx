import { useState } from 'react';
import Geocode from 'react-geocode'
import Map from './Map'

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
        formatted_address: ''
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
        console.log(`Enviando data ${input.lat} ${input.lng} ${input.especifications}`)
    }

    return (
        <div>
            <h1>Add your address!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Address</label>
                    <input type="text" required onChange={handleChange} name="address" />
                </div>
                <div>
                    <label>Especifications:</label>
                    <textarea onChange={handleChange} required name='especifications'></textarea>
                </div>
                <div>
                    <input type="submit" required value="Ok"></input>
                </div>
            </form>

            {
                input.view && (
                    <>
                        <Map lat={input.lat} lng={input.lng} />
                        <h3>Data</h3>
                        <p>{input.formatted_address}</p>
                        <p>Is this information correct?</p>
                        <button onClick={sendData}>YES</button>
                        <button>NO</button>
                        
                    </>
                )
            }


        </div>
    )
}

export default Destiny