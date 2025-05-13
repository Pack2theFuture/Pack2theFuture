import { useEffect, useState } from "react";
import BarcodeScanner from "./BarcodeScanner";

function KakaoMap() {
  const [selectedBin, setSelectedBin] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => window.kakao.maps.load(loadMap);
      document.head.appendChild(script);
    }

    function loadMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
      } else {
        alert("Geolocation을 지원하지 않는 브라우저입니다.");
        initMap(37.5154, 126.9074);
      }
    }

    function successHandler(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const locationData = {
        latitude: lat,
        longitude: lng,
      };

      fetch("http://localhost:8080/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("서버 응답:", data);
        })
        .catch((error) => console.error("서버 요청 실패:", error));

      initMap(lat, lng);
    }

    function errorHandler(error) {
      console.error(error);
      alert("위치 정보를 가져올 수 없습니다. 기본 위치로 이동합니다.");
      initMap(37.566, 126.978);
    }

    function initMap(lat, lng) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      const markerImage = new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
        new window.kakao.maps.Size(40, 40),
        { offset: new window.kakao.maps.Point(20, 40) }
      );

      new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        map: map,
      });

      const bins = [
        {
          lat: 37.562, lng: 127.038, name: "한양대학교 대운동장", time: "18:00~20:00",
          point: "500p"
        },
        { lat: 37.380, lng: 126.656, name: "수거함 B" },
      ];

      const updatedBins = bins.map((bin) => {
        const dist = getDistanceFromLatLonInKm(lat, lng, bin.lat, bin.lng);
        return {
          ...bin,
          distance: `${dist.toFixed(2)}km`,
        };
      });

      updatedBins.forEach((bin) => {
        const binPosition = new window.kakao.maps.LatLng(bin.lat, bin.lng);
        const trashBinImage = new window.kakao.maps.MarkerImage(
          "/trashbin.png",
          new window.kakao.maps.Size(40, 40),
          { offset: new window.kakao.maps.Point(20, 40) }
        );

        const trashMarker = new window.kakao.maps.Marker({
          position: binPosition,
          image: trashBinImage,
          map: map,
        });

        const content = `
          <div style="
            position: relative;
            background: white;
            padding: 10px 14px;
            border-radius: 10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            font-size: 13px;
            line-height: 1.6;
          ">
            <div style="font-weight: bold; margin-bottom: 5px;">${bin.name}</div>
            <div>운영시간: ${bin.time || "-"}</div>
            <div>현재 위치로부터의 거리: ${bin.distance || "-"}</div>
            <div>예상 지급 포인트: ${bin.point || "-"}</div>
            <div style="
              position: absolute;
              bottom: -10px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 10px solid white;
            "></div>
          </div>
        `;

        const infoWindow = new window.kakao.maps.InfoWindow({
          content,
          removable: false
        });

        const detailPopup = new window.kakao.maps.CustomOverlay({
          content: `<div style="position:absolute; bottom:0; left:0; width:100%; background:#fff; padding:10px; border-top:1px solid #ccc; font-size:14px;">${bin.name} 상세 정보</div>`,
          position: binPosition,
          yAnchor: 1,
          zIndex: 3,
        });

        window.kakao.maps.event.addListener(trashMarker, "mouseover", () => {
          infoWindow.open(map, trashMarker);
        });

        window.kakao.maps.event.addListener(trashMarker, "mouseout", () => {
          infoWindow.close();
        });

        window.kakao.maps.event.addListener(trashMarker, "click", () => {
          setSelectedBin(bin);
          detailPopup.setMap(null);
        });
      });
    }
  }, []);

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
            <p>현재 위치로부터 {selectedBin.distance || '-'}</p>
            <p>예상지급포인트: {selectedBin.point || '-'}</p>
          </div>
          <div className="px-4 pb-4">
            <img
              src={selectedBin.imageUrl || '/default.jpg'}
              alt="장소 이미지"
              className="w-full rounded-lg object-cover h-40"
            />
            {!scanning && (
              <button onClick={() => setScanning(true)} className="mt-4 w-full bg-green-200 text-black rounded-xl py-2 text-sm">
                종이팩 버리러 가기
              </button>
            )}
            {scanning && (
              <BarcodeScanner
                onDetected={(code) => {
                  console.log("스캔된 바코드:", code);
                  // 서버 전송 또는 검증 로직
                  //setScanning(false);
                }}
                onClose={() => setScanning(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default KakaoMap;
