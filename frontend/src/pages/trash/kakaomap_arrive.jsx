import { useEffect, useState, useRef } from "react";
import BarcodeScanner from "./BarcodeScanner";

function KakaoMap() {
  const [selectedBin, setSelectedBin] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(initMap);
    document.head.appendChild(script);

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const initMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);

        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const markerImage = new window.kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
          new window.kakao.maps.Size(40, 40),
          { offset: new window.kakao.maps.Point(20, 40) }
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
          map: mapInstance,
        });
        setUserMarker(marker);

        const bins = [
          {
            id: 1,
            lat: 37.568,
            lng: 127.043,
            name: "어바웃엠협동조합",
            time: "?",
            point: "500p",
          },
          {
            id: 2,
            lat: 37.574,
            lng: 127.048,
            name: "공방 꽃피는 삼월에",
            time: "10:30 ~ 20:00",
            point: "500p",
          },
          {
            id: 3,
            lat: 37.561,
            lng: 127.031,
            name: "왕십리 제 2동 주민센터",
            time: "24시간",
            point: "500p",
          },
        ];

        bins.forEach(bin => {
          const binPosition = new window.kakao.maps.LatLng(bin.lat, bin.lng);
          const trashMarker = new window.kakao.maps.Marker({
            position: binPosition,
            map: mapInstance,
          });
          window.kakao.maps.event.addListener(trashMarker, "click", () => {
            setSelectedBin(bin);
          });
        });
      });
    } else {
      alert("Geolocation을 지원하지 않는 브라우저입니다.");
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert("위치 추적을 지원하지 않습니다.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const position = new window.kakao.maps.LatLng(latitude, longitude);
        setCurrentPosition({ lat: latitude, lng: longitude });
        if (userMarker) userMarker.setPosition(position);
        if (map) map.setCenter(position);
      },
      (err) => {
        console.error("위치 추적 실패:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
    setWatchId(id);
  };

  const confirmArrival = async () => {
    if (!currentPosition) {
      alert("위치 정보가 준비되지 않았습니다.");
      return;
    }

    const response = await fetch("https://backend-do9t.onrender.com/api/confirm-arrival", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        latitude: currentPosition.lat,
        longitude: currentPosition.lng,
        binId: selectedBin?.id || null,
      }),
    });
    const result = await response.json();
    if (result.success) {
      alert("도착 인증 완료!");
    } else {
      alert("수거함 근처가 아닙니다.");
    }
  };

  return (
    <>
      <div id="map" className="w-full h-screen"></div>
      {selectedBin && (
        <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50">
          <div className="flex justify-between items-center px-4 pt-4">
            <div className="font-bold text-lg">{selectedBin.name}</div>
            <button onClick={() => setSelectedBin(null)} className="text-xl">×</button>
          </div>
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-500">서울특별시 성동구</p>
            <p className="mt-2">운영시간: {selectedBin.time || '-'}</p>
            <p>예상지급포인트: {selectedBin.point || '-'}</p>
          </div>
          <div className="px-4 pb-4">
            {!watchId && (
              <button
                onClick={startTracking}
                className="w-full bg-green-500 text-white rounded-xl py-2 text-sm"
              >
                쓰레기 버리러 가기
              </button>
            )}
            {watchId && (
              <button
                onClick={confirmArrival}
                className="w-full bg-blue-500 text-white rounded-xl py-2 text-sm"
              >
                도착하기
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default KakaoMap;
