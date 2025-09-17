import React, { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

export default function MapComponent({ position, setPosition }) {
   useEffect(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
         const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
         }
         setPosition(coords)
      })
   }, [])

   return (
      <Map center={position} style={{ width: '100%', height: '400px' }} level={3}>
         <MapMarker position={position}>
            <div className="map--myLoaction">내 위치</div>
         </MapMarker>
      </Map>
   )
}
