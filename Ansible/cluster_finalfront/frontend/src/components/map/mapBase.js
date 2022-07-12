import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TileLayer, useMap, MapContainer, LayersControl, Marker, Popup, GeoJSON } from 'react-leaflet';
import './map.css';
import L from "leaflet";
import './legend.css';
import MapMortgage from './mapMortgage';
import MapHousehold from './mapHousehold';
import MapRent from './mapRent';
import MapFamily from './mapFamily';
import MapPersonal from './mapPersonal';

const MapBase = ({tabNumber}) => {
   

    const [tab, setTab] = useState(tabNumber)
    useEffect(() => {
        if (tabNumber) {
            setTab(tabNumber)
        }
    },[tabNumber])

    const data = useMemo(() => {
        switch(tab) {
            case 1:
                return <MapMortgage/>
            case 2:
                return <MapRent/>
            case 3:
                return <MapFamily/>
            case 4:
                return <MapPersonal/>
            case 5:
                return <MapHousehold/>
        }
    },[tab])


    return(
        <>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        crossorigin=""
        />
        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
            integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
            crossorigin="">
        </script>

        <div id="map" style={{height: '100%'}}>
            <MapContainer center={[-37.813, 144.963]} zoom={10} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data}
            </MapContainer>
        </div>
        </>
    )
}
export default MapBase;