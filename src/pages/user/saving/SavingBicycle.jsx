import { useState, useRef } from "react";
import { rideBicycle } from "../../../api/savingApi";
import MapComponent from "../../../components/map/MapComponent";
import "./Saving.scss";
import { useNavigate } from "react-router-dom";

function SavingBicycle() {
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.978 });
  const [path, setPath] = useState([]);
  const [isTracking, setIsTracking] = useState(false);

  const watchIdRef = useRef(null);
  const navigate = useNavigate();

  // 경로 기록 시작
  const startTracking = () => {
    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          setIsTracking(true);

          console.log("기록 중인가요?:", isTracking);

          const { latitude, longitude } = pos.coords;
          setPosition({ lat: latitude, lng: longitude });
          setPath((prev) => [...prev, { lat: latitude, lng: longitude }]);
        },
        (err) => console.error("경로 트래킹 에러:", err),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
      );
    } else {
      alert("GPS를 지원하지 않는 브라우저예요");
    }
  };
  // 경로 기록 종료 - 데이터 전송
  const stopTracking = async () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    const distanceKm = calcDistance(path); // 경로 기반 거리(km) 계산
    try {
      const res = await rideBicycle({ userId: 1, bikeId: 4, distanceKm });
      console.log("기록된 데이터:", res.data);
      setIsTracking(false);
      alert("기록이 완료되었어요! 포인트 지급 페이지로 이동할게요.");
      navigate("/saving/point", { state: { result: res.data } });
    } catch (err) {
      console.error("서버 기록 실패:", err);
    }
  };

  console.log("기록 중인가요?:", isTracking);

  // 두 좌표 사이 거리(km) 계산 (Haversine 공식)
  const calcDistance = (points) => {
    if (points.length < 2) return 0;
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      total += haversine(points[i - 1], points[i]);
    }
    return total;
  };

  const haversine = (p1, p2) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((p1.lat * Math.PI) / 180) *
        Math.cos((p2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <section id="main1">
      <div className="container" id="area">
        <h2>따릉이</h2>
        <div className="mt-20 map bicycle">
          <MapComponent setPosition={setPosition} position={position} />
          {!isTracking ? (
            <button
              className="btn main2 default mt-80"
              onClick={startTracking}
              disabled={isTracking}
            >
              따릉이 출발하기
            </button>
          ) : (
            <button
              className="btn main1 default mt-80"
              onClick={stopTracking}
              disabled={!isTracking}
            >
              기록 종료
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default SavingBicycle;
