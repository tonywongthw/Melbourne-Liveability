// manually upload .shp file, no backend fetch,  needs ./shapefile.js
import React, {useState} from 'react';
import { TileLayer, useMap, MapContainer, Marker, Popup, LayerGroup, LayersControl } from 'react-leaflet';
import './map.css';
import Shapefile from './shapefile';

const Map1 = () => {
    const [geodata, setGeodata] = useState({});

    const handleFile = (e) => {
        var reader = new FileReader();
        var file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = function (buffer) {
          console.log("loading data...", file.name)
          console.log(buffer.target.result)
          setGeodata( {data: buffer.target.result, name: file.name });
        }
    }

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

        <div>
            Upload ShapeFile (.shp): <input type="file" accept=".shp" onChange={handleFile} className="inputfile" />
        </div>

        <div id="map1" style={{height: '100%'}}>
            <MapContainer center={[-37.813, 144.963]} zoom={9} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl position='topright'>
                    <LayersControl.Overlay name='Overlay Suburbs'>
                        <Shapefile data={geodata.data} />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='Markers'>
                        <LayerGroup>
                            <Marker position={[-37.823364, 144.95633]}>
                                <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>

            </MapContainer>
        </div>
        </>
    )
}

export default Map1;