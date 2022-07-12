import React, { useState, useEffect, useRef } from 'react';
import { TileLayer, useMap, MapContainer, LayersControl, Marker, Popup, GeoJSON, LayerGroup } from 'react-leaflet';
import './map.css';
import L from "leaflet";
import './legend.css';
import Markers from './markers';
import { getBackend } from '../util';

const MapFamily = () => {
    const [geodata, setGeodata] = useState({});
    const [fetched, setFetched] = useState(false);
    const geoJsonRef = useRef();

    useEffect(() => {
        async function fetchData() {
            const backendIp = await getBackend()
            const result = await fetch(`http://${backendIp}/aurin/geodata`).then((response) => response.json());
            setGeodata(result);
            //console.log(result);
            console.log("geodata fetch done");
            setFetched(true);
        }
        fetchData();
    }, []);

    function getColor(d) {
        return d > 2600 ? '#800026' :
               d > 2400  ? '#BD0026' :
               d > 2200  ? '#E31A1C' :
               d > 2000  ? '#FC4E2A' :
               d > 1800   ? '#FD8D3C' :
               d > 1600   ? '#FEB24C' :
               d > 1400   ? '#FED976' :
                          '#FFEDA0';
    }
    const style = (feature) => {
        return ({
            fillColor: getColor(feature.properties["median_tot_fam_inc_weekly"]),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7
        });
    }
    const highlightFeature = (e) => {
        let layer = e.target;
    
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        console.log(typeof layer.feature.properties);
        //layer.bindPopup(JSON.stringify(layer.feature.properties)).openPopup();
        if (layer.feature.properties) {
            layer.bindPopup(
                "suburb: " + layer.feature.properties["feature_n2"] + "<br .>" + 
                "median total family income weekly: " + layer.feature.properties["median_tot_fam_inc_weekly"], 
                {maxHeight: 200}
            ).openPopup();
        }
    }
    const resetHighlight = (e) => {
        geoJsonRef.current.resetStyle(e.target);
    }
    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        });
    }
    function Legend() {
        const map = useMap();
        useEffect(() => {
            const legend = L.control({ position: "bottomleft" });
            legend.onAdd =  function (map) {
    
            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 1400, 1600, 1800, 2000, 2200, 2400, 2600],
                labels = [];
        
            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }
        
            return div;
        };
        
        legend.addTo(map);
        //Will execute on unmount, or map change
        return () => {
            map.removeControl(legend)
            }
        }, [map]);
    }

    return(
        <>
        {fetched ? 
        <>
        <GeoJSON data={geodata} onEachFeature={onEachFeature} style={style} ref={geoJsonRef}/>
        <Legend />
        <LayersControl position="topright">
            <LayersControl.Overlay name="Top Suburbs with Positive Crypto Tweets by Percentage">
                <Markers selection={"crypto"}/>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Top Suburbs with Positive Covid Tweets by Percentage">
                <Markers selection={"covid"}/>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Top Suburbs with Positive Election Tweets by Percentage">
                <Markers selection={"election"}/>
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Top Suburbs with Positive Housing Tweets by Percentage">
                <Markers selection={"housing"}/>
            </LayersControl.Overlay>
        </LayersControl>
        </> 
        : <></>}
        </>
    )
}
export default MapFamily;