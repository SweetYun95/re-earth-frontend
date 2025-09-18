import { useEffect, useState } from 'react'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'

import './MapComponent.scss'

export default function MapComponent({ position, setPosition, data }) {
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
      data && (
         <Map center={position} style={{ width: '100%', height: '400px' }} level={3}>
            <CustomOverlayMap position={position}>
               <div className="marker" />
               <div className="marker-shadow" />
               <div className="spot"></div>
            </CustomOverlayMap>
         </Map>
      )
   )
}
