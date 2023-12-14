import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api';
import React from 'react';

interface GoogleMapProps {
    lat: number;
    lng: number;
}

const GoogleMapF: React.FC<GoogleMapProps> = ({ lat, lng }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'rent-apartment',
        googleMapsApiKey: 'AIzaSyBqip7J60tcOjwbuPv7qege_NMoQoFyNag',
        libraries: ['maps', 'places'],
    });

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                width: '100%',
                height: '480px',
                borderRadius: '10px',
            }}
            center={{
                lat: lat,
                lng: lng,
            }}
            zoom={14}
            options={{
                scrollwheel: false,
            }}
        >
            <MarkerF
                position={{
                    lat: lat,
                    lng: lng,
                }}
            />
        </GoogleMap>
    ) : (
        <></>
    );
};

export default GoogleMapF;
