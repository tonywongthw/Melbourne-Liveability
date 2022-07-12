import React, { useState, useEffect } from "react";
import { TileLayer, useMap, MapContainer, LayersControl, Marker, Popup, GeoJSON, LayerGroup } from 'react-leaflet';
import './map.css';

const Markers = ({selection}) => {
    const [markerdata, setMarkerdata] = useState([]);
    const [fetched, setFetched] = useState(false);
    console.log(selection);

    useEffect(() => {
        async function fetchData() {
            const result = await fetch("http://172.26.128.201:30003/testGetTopic/" + selection).then((response) => response.json());
            setMarkerdata(result["features"]);
            console.log(result);
            console.log("markerdata fetch done");
            setFetched(true);
        }
        fetchData();
    }, []);

    if (fetched) {
        var endpos = 10;
        if (markerdata.length < 10) {
            endpos = markerdata.length;
        }
        const popuptext = [];
        const position = [];
        for (var i = 0; i < endpos; i++) {
            popuptext[i] = "suburb: " + markerdata[i]["properties"]["feature_n2"] + ", positive percentage: " + markerdata[i]["properties"]["positive_percent"];
            position[i] = [markerdata[i]["geometry"]["coordinates"][1], markerdata[i]["geometry"]["coordinates"][0]];
        }

        return (
            <LayerGroup>
                <Marker position={position[0]}>
                    <Popup>{popuptext[0]}</Popup>
                </Marker>
                <Marker position={position[1]}>
                    <Popup>{popuptext[1]}</Popup>
                </Marker>
                <Marker position={position[2]}>
                    <Popup>{popuptext[2]}</Popup>
                </Marker>
                <Marker position={position[3]}>
                    <Popup>{popuptext[3]}</Popup>
                </Marker>
                <Marker position={position[4]}>
                    <Popup>{popuptext[4]}</Popup>
                </Marker>
                <Marker position={position[5]}>
                    <Popup>{popuptext[5]}</Popup>
                </Marker>
                <Marker position={position[6]}>
                    <Popup>{popuptext[6]}</Popup>
                </Marker>
                <Marker position={position[7]}>
                    <Popup>{popuptext[7]}</Popup>
                </Marker>
                <Marker position={position[8]}>
                    <Popup>{popuptext[8]}</Popup>
                </Marker>
                <Marker position={position[9]}>
                    <Popup>{popuptext[9]}</Popup>
                </Marker>
            </LayerGroup>
        )
    }
}

export default Markers;
