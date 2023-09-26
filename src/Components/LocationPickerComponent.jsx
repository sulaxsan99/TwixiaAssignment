import React, { useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import './style.css'
import FormComponent from './FormComponent';
import axios from 'axios';
export default function LocationPickerComponent() {
    const api = process.env.REACT_APP_GOOGLE_API_KEY
    const [lat, setlat] = useState('');
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: api,
    });
    const center = useMemo(() => ({ lat: 6.932864332522504, lng: 79.85162500380228 }), []);
    const [clickedLocation, setClickedLocation] = useState(null);
    const handleMapClick = async (event) => {
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();
        try {
const api = 'AIzaSyADUByO6T5hXegxXoBB0eb6zzEzsuZHZaE'
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api}`
            );
            console.log(response)
            if (response.data.results.length > 0) {
                const address = response.data.results[0].formatted_address;
                //   setClickedLocation({ latitude, longitude, address });
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
        setClickedLocation({ latitude, longitude });
    };
    useEffect(() => {
        
        // eslint-disable-next-line no-lone-blocks
        {
            clickedLocation && (
                setlat(clickedLocation.latitude)
            )
        }
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'row', }}>
            <div className="map-container">
            <h2 className=''>Mark Your Location Here</h2>
                {!isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <GoogleMap
                        mapContainerClassName="map"
                        center={center}
                        zoom={10}
                        onClick={handleMapClick}
                    >
                        {clickedLocation && (
                            <Marker
                                position={{ lat: clickedLocation.latitude, lng: clickedLocation.longitude }}
                            />
                        )}
                    </GoogleMap>
                )}


            </div>

            {/* {clickedLocation && (
                <div>
                    <h3>Clicked Location Information:</h3>
                    <p>Latitude: {clickedLocation.latitude}</p>
                    <p>Longitude: {clickedLocation.longitude}</p>
                    <p>Address: {clickedLocation.address}</p>

                </div>

            )} */}

            <FormComponent
                Latitude={clickedLocation && (clickedLocation.latitude)}
                Longitude={clickedLocation && (clickedLocation.longitude)}
                Address={clickedLocation && (clickedLocation.address)}
            />
        </div>

    )
}
// AIzaSyCzp5bSyz3dW7MwZQ1Eik_9tR2K9vfv-1E