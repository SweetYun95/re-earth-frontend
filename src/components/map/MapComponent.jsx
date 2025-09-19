import { useEffect, useRef } from "react";
import { Map, CustomOverlayMap, Polyline } from "react-kakao-maps-sdk";

import "./MapComponent.scss";

export default function   MapComponent({
  position,
  setPosition,
  data,
  isTracking,
  path,
}) {
  const mapRef = useRef();

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(coords);
      },
      (err) => console.error("위치 추적 실패:", err),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [setPosition]);
  return (
    <Map center={position} style={{ width: "100%", height: "400px" }} level={3}>
      <CustomOverlayMap position={position}>
        <div className="marker" />
        <div className="marker-shadow" />
      </CustomOverlayMap>
      {data &&
        data.map((spot, index) => {
          const spotPosition = {
            lat: Number(spot.stationLatitude),
            lng: Number(spot.stationLongitude),
          };
          return (
            <CustomOverlayMap position={spotPosition}>
              <div className="spotmarker">{index}</div>
            </CustomOverlayMap>
          );
        })}
      {isTracking && (
        <Polyline
          path={[path.map((p) => new window.kakao.maps.LatLng(p.lat, p.lng))]}
          strokeWeight={5} // 두께
          strokeColor={"#3c82f6"} // 색상
          strokeOpacity={0.8}
          strokeStyle={"solid"}
        />
      )}
    </Map>
  );
}
