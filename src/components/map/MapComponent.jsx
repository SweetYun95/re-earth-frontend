import { useEffect, useRef, useState } from 'react'
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk'

import './MapComponent.scss'

export default function MapComponent({ position, setPosition, data }) {
   const mapRef = useRef()

   useEffect(() => {
      const watchId = navigator.geolocation.watchPosition(
         (pos) => {
            const coords = {
               lat: pos.coords.latitude,
               lng: pos.coords.longitude,
            }
            setPosition(coords)
            console.log(coords)
            console.log(position)
         },
         (err) => console.error('위치 추적 실패:', err),
         { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      )

      return () => navigator.geolocation.clearWatch(watchId)
   }, [setPosition])
   return data ? (
      <Map center={position} style={{ width: '100%', height: '400px' }} level={3}>
         <CustomOverlayMap position={position}>
            <div className="marker" />
            <div className="marker-shadow" />
         </CustomOverlayMap>
         {data.map((spot, index) => {
            const spotPosition = { lat: Number(spot.stationLatitude), lng: Number(spot.stationLongitude) }
            return (
               <CustomOverlayMap position={spotPosition}>
                  <div className="spotmarker">{index}</div>
               </CustomOverlayMap>
            )
         })}
      </Map>
   ) : (
      <Map center={position} style={{ width: '100%', height: '400px' }} level={3}>
         <CustomOverlayMap position={position}>
            <div className="marker" />
            <div className="marker-shadow" />
         </CustomOverlayMap>
      </Map>
   )
}
