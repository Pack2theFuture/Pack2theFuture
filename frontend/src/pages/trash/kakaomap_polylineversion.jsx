import { useEffect, useState, useRef } from "react";
import BarcodeScanner from "./BarcodeScanner";

function KakaoMap() {
  const [selectedBin, setSelectedBin] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;
    script.onload = () => window.kakao.maps.load(initMap);
    document.head.appendChild(script);

    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
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

        // 수거함 마커 추가 (예시)
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
          const trashBinImage = new window.kakao.maps.MarkerImage(
            "/trashbin.png",
            new window.kakao.maps.Size(40, 40),
            { offset: new window.kakao.maps.Point(20, 40) }
          );

          const trashMarker = new window.kakao.maps.Marker({
            position: binPosition,
            image: trashBinImage,
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

  const handleRoute = async () => {
    console.log("handleRoute 시작됨!");
    if (!selectedBin || !map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const response = await fetch(
          `https://apis-navi.kakaomobility.com/v1/directions?origin=${lng},${lat}&destination=${selectedBin.lng},${selectedBin.lat}&priority=TIME`,
          {
            headers: {
              Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
            },
          }
        );
//** 요청실패 체크 로직 추가*/
        if (!response.ok) {
  const text = await response.text();
  console.error("🚫 경로 API 요청 실패:", response.status, text);
  return;
}

        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          console.log("🔍 sections", data.routes[0].sections);
          const path = [];
          data.routes[0].sections.forEach(section => {
            section.roads.forEach(road => {
              for (let i = 0; i < road.vertexes.length; i += 2) {
                path.push(
                  new window.kakao.maps.LatLng(
                    road.vertexes[i + 1],
                    road.vertexes[i]
                  )
                );
              }
            });
          });

          if (polyline) {
            polyline.setMap(null);
          }

          const newPolyline = new window.kakao.maps.Polyline({
            path,
            strokeWeight: 5,
            strokeColor: "#00aaff",
            strokeOpacity: 0.7,
            strokeStyle: "solid",
          });

          newPolyline.setMap(map);
          setPolyline(newPolyline);
        }
      });
    }
  };


  useEffect(() => {
    if (map) {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      watchIdRef.current = navigator.geolocation.watchPosition(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const newPosition = new window.kakao.maps.LatLng(lat, lng);
        if (userMarker) {
          userMarker.setPosition(newPosition);
        }
      });
    }
  }, [map, userMarker]);

  return (
    <>
      <div id="map" className="w-full h-screen"></div>
      {selectedBin && (
        <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50">
          <div className="flex justify-between items-center px-4 pt-4">
            <div className="font-bold text-lg">{selectedBin.name}</div>
            <button onClick={() => setSelectedBin(null)} className="text-xl">
              ×
            </button>
          </div>
          <div className="px-4 pb-4">
            <p className="text-sm text-gray-500">서울특별시 성동구</p>
            <p className="mt-2">운영시간: {selectedBin.time || "-"}</p>
            <p>예상지급포인트: {selectedBin.point || "-"}</p>
          </div>
          <div className="px-4 pb-4">
            <img
              src={selectedBin.imageUrl || "/default.jpg"}
              alt="장소 이미지"
              className="w-full rounded-lg object-cover h-40"
            />
            {!scanning && (
              <button
                onClick={() => {
                  console.log("버튼 클릭됨",{scannedCode, selectedBin});
    if (scannedCode) {
      console.log("~~🚀 handleRoute 호출됨!");
      setScanning(false); // ✅ 바코드 스캐너 닫기
      handleRoute(); // ✅ 경로 표시만
    } else {
      setScanning(true); // ✅ 바코드 스캐너 열기
    }
  }}
                className={`mt-4 w-full ${
                  scannedCode ? "bg-green-500 text-white" : "bg-green-200 text-black"
                } rounded-xl py-2 text-sm`}
              >
                {scannedCode ? "스캔한 종이팩 버리러 가기" : "종이팩 버리러 가기"}
              </button>
            )}
            {scanning && (
              <BarcodeScanner
                onDetected={code => {
                  console.log("스캔된 바코드:", code);
                  setScanning(false);
                  setScannedCode(code);
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
