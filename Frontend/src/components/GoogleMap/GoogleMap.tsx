import React, { useEffect } from 'react';
import { useJsApiLoader, GoogleMap, OverlayView } from '@react-google-maps/api';
import icons from '@/utils/icons';
const { HiHome } = icons;

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

    const getPixelPositionOffset = (width: number, height: number) => ({
        x: -(width / 2) - 20,
        y: -(height / 2) - 35,
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
        const userAgent = navigator.userAgent;
        const isChrome = /Chrome/.test(userAgent) && !/Edg/.test(userAgent);

        if (!isChrome) {
            const intervalId = setInterval(() => {
                googleMapRemap();
            }, 1);

            return () => clearInterval(intervalId);
        }
    }, []);
    return isLoaded ? (
        <div className="shadow-md">
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
                <OverlayView
                    position={{ lat: lat, lng: lng }}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={getPixelPositionOffset}
                >
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-400 rounded-full">
                        <i className="mb-1">
                            <HiHome size={30} color="#fff" />
                        </i>
                    </div>
                </OverlayView>
            </GoogleMap>
        </div>
    ) : (
        <></>
    );
};

export default GoogleMapF;
