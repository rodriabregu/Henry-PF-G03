import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = ({lat,lng}) => {

    const key = 'AIzaSyBeDbO4AKXkxGq42frll9RTIKIYZCj-TEA';

    const MyMapComponent = withScriptjs(withGoogleMap((props) =>
        <GoogleMap
            //defaultZoom={25}
            zoom={15}
            defaultCenter={{ lat, lng }}
        >
            {props.isMarkerShown && <Marker position={{ lat, lng }} />}
        </GoogleMap>
    ))

    return (
        <>
        <MyMapComponent
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
            key={'AIzaSyBeDbO4AKXkxGq42frll9RTIKIYZCj-TEA'}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
        </>
    )
}

export default Map;