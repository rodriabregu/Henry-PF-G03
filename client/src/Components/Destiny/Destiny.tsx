import { useState } from 'react';
import { updateCart } from '../../Redux/Actions/Cart/updateCart';
import { useDispatch, useSelector } from 'react-redux';
import Geocode from 'react-geocode';
import { state, user } from '../../typesApp'
import Map from './Map';
import axios from 'axios';
import './Destiny.css';

Geocode.setApiKey('AIzaSyBeDbO4AKXkxGq42frll9RTIKIYZCj-TEA');
Geocode.setLanguage('en');
Geocode.setRegion('es');

function Destiny() {
  const dispatch = useDispatch()
  const url_pago = useSelector((state: state) => state.url_pago);
  const user: user = useSelector((state: state) => state.user)
  const [input, setInput] = useState({
    address: '',
    lat: 0,
    lng: 0,
    view: false,
    especifications: '',
    formatted_address: '',
    fullName: '',
    dni: '',
  });


  const handleChange = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Geocode.fromAddress(input.address)
      .then((resp) => {
        const { lat, lng } = resp.results[0].geometry.location;
        const { formatted_address } = resp.results[0];
        setInput({
          ...input,
          lat,
          lng,
          view: true,
          formatted_address,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const sendData = () => {
    const preferenceId = /pref_id=.+/g.exec(url_pago)
    const body = {
      localAddress: input.address,
      mapAddress: input.formatted_address,
      description: input.especifications,
      fullName: input.fullName,
      dni: input.dni,
      preferenceId:
        preferenceId && preferenceId[0].replace("pref_id=", "")
    };
    // {localAddress,mapAddress,description,fullName,dni,saleId}=req.body;
    if (url_pago) {
      axios
      .post('http://localhost:3001/api/destiny', body)
      .then((resp) => console.log(resp))
      .catch((err) => console.error(err));
      dispatch(updateCart([],user.id))
    }
  };

  return (
    <div className='destiny-container'>
      <div className='destiny-form'>
        <div className='cont-div'>
          <h1>Shipping Address </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Address: </label>
              <input type='text' required onChange={handleChange} name='address' />
            </div>
            <div className='text-especif'>
              <label>Especifications: (floor, departament)</label>
              <textarea
                onChange={handleChange}
                required
                name='especifications'></textarea>
            </div>
            <div>
              <label>Full Name:</label>
              <input type='text' required onChange={handleChange} name='fullName' />
            </div>
            <div>
              <label>ID/Passport:</label>
              <input type='text' required onChange={handleChange} name='dni' />
            </div>
            <div>
              <input className='soy-btn' type='submit' required value='Ok'></input>
            </div>
          </form>
        </div>
      </div>

      {input.view && (
        <>
          <Map lat={input.lat} lng={input.lng} />
          <div className='data-confirm'>
            <h3>Data</h3>
            <p>{input.formatted_address}</p>
            {url_pago &&
              (<a style={{ textDecoration: 'none' }} href={url_pago}>
                <button className='btn-map' onClick={sendData}>
                  Confirm purchase
                </button>
              </a>)
            }
            {/* <button>NO</button> */}
          </div>
        </>
      )}
    </div>
  );
}

export default Destiny;
