import { useState } from 'react';
import Geocode from 'react-geocode'


Geocode.setApiKey("AIzaSyBeDbO4AKXkxGq42frll9RTIKIYZCj-TEA");
Geocode.setLanguage("en");
Geocode.setRegion("es");

function Destiny() {

    const [input,setInput]=useState({
        address:'',
        lat:0,
        lng:0
    })

    const handleChange=(e)=>{
        setInput({
            ...input,
            address:e.target.value,
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
  
        Geocode.fromAddress(input.address)
            .then(resp=>{
                const { lat, lng } = resp.results[0].geometry.location;
                console.log(lat,lng)
            })
            .catch(e=>{
                console.log(e)
            })
            
    }



    return (

        <div>
            <h1>Add your address!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Address</label>
                    <input type="text" onChange={handleChange} name="address" />
                </div>
                <div>
                    <input type="submit"></input>
                </div>
            </form>


        </div>
    )
}

export default Destiny