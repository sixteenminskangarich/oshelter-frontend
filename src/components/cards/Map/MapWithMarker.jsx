import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const libraries = ['places'];

const MapWithMarker = ({center}) => {
    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAP_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapWithMarker;