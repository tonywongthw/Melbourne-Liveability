// works with ./map1.js, no use for ./map.js
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet'
import shp from 'shpjs'

const Shapefile = (props) => {
  const [ geoJSONData, setGeoJSONData ] = useState(null)
  const { data, ...geoJSONProps} = props


  useEffect(() => {
    async function fetchData() {
      const response = await shp(props.data);
      setGeoJSONData(response);
      console.log("data loaded...")
    }
    fetchData();
  }, [props.data]);


 return (
  <GeoJSON key = {Math.random()} data = {geoJSONData} {...geoJSONProps}/>
  )

}

export default Shapefile;