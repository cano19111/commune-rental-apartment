import { useJsApiLoader, GoogleMap, MarkerF } from '@react-google-maps/api';
import React, { useEffect } from 'react';

interface GoogleMapProps {
    lat: number;
    lng: number;
}

const GoogleMapF: React.FC<GoogleMapProps> = ({ lat, lng }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'rent-apartment',
        googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAP,
        libraries: ['maps', 'places'],
    });
    const googleMapRemap = () => {
        const langID = 'en-US';
        const mapCanvasSelector = '#map-canvas';
        const mapCanvas = document.querySelector(mapCanvasSelector);
        if (mapCanvas instanceof HTMLElement) {
            const lastDiv = mapCanvas.querySelector('>div:last-of-type');
            if (lastDiv instanceof HTMLElement) {
                lastDiv.style.display = 'none';
            }
        }

        const googleImages = document.querySelectorAll(`img[src*="maps.googleapis.com/maps/vt?"]:not(.gmf)`);
        googleImages.forEach((image) => {
            const imageUrl = image.getAttribute('src');
            const urlArray = imageUrl?.split('!') || [];
            let newUrl = '';
            let newC = 0;

            for (let i = 0; i < 1000; i++) {
                if (urlArray[i] === '2s' + langID) {
                    newC = i - 3;
                    break;
                }
            }
            for (let i = 0; i < newC + 1; i++) {
                newUrl += urlArray[i] + '!';
            }
            image.setAttribute('src', newUrl);
            image.classList.add('gmf');
        });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            googleMapRemap();
        }, 1);

        return () => clearInterval(intervalId);
    }, []);
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
