import { useEffect, useState, useRef } from "react";
import BarcodeScanner from "./BarcodeScanner";

function KakaoMap() {
  const [selectedBin, setSelectedBin] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [polyline, setPolyline] = useState(null);
  const [insideCircle, setInsideCircle] = useState(false);
  const watchIdRef = useRef(null);
  const circleRef = useRef(null);
  const [bins, setBins] = useState([]);
  const [scannedMap, setScannedMap] = useState({});
  const isScanned = selectedBin ? scannedMap[selectedBin.id] || false : false;
  const markerImageRef = useRef(null);
  const [lastScannedBin, setLastScannedBin] = useState(null);
  const [liveDistance, setLiveDistance] = useState(null);
  
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

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

        const markerImage2 = new window.kakao.maps.MarkerImage(
  "/character.png",
  new window.kakao.maps.Size(40, 40),
  { offset: new window.kakao.maps.Point(20, 40) }
);
markerImageRef.current = markerImage2;

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
          map: mapInstance,
        });
        setUserMarker(marker);

        // 수거함 마커 추가 (예시)
        // const bins = [
        //   {
        //     id: 1,
        //     lat: 37.568,
        //     lng: 127.043,
        //     name: "어바웃엠협동조합",
        //     time: "?",
        //     point: "500p",
        //   },
        //   {
        //     id: 2,
        //     lat: 37.574,
        //     lng: 127.048,
        //     name: "공방 꽃피는 삼월에",
        //     time: "10:30 ~ 20:00",
        //     point: "500p",
        //   },
        //             {
        //     id: 3,
        //     lat: 37.551,
        //     lng: 127.026,
        //     name: "한살림 금호매장",
        //     time: "10:00 ~ 20:00",
        //     point: "500p",
        //   },
        //   {
        //     id: 4,
        //     lat: 37.561,
        //     lng: 127.045,
        //     name: "사근동 주민센터",
        //     time: "24시간",
        //     point: "500p",
        //   },
        //             {
        //     id: 5,
        //     lat: 37.558,
        //     lng: 127.036,
        //     name: "행당 제1동 주민센터",
        //     time: "24시간",
        //     point: "500p",
        //   },
        //             {
        //     id: 6,
        //     lat: 37.561,
        //     lng: 127.031,
        //     name: "왕십리 제2동 주민센터",
        //     time: "24시간",
        //     point: "500p",
        //   },
        //   {id: 7,
        //     lat: 37.558,
        //     lng: 127.036,
        //     name: "행당 제2동 주민센터",
        //     time: "24시간",
        //     point: "500p",
        //   },
        //     {id: 8,
        //     lat: 37.562,
        //     lng: 127.036,
        //     name: "성동구청",
        //     time: "24시간",
        //     point: "500p",
        //   },
        //   {
        //     id: 9,
        //     lat: 37.559,
        //     lng: 127.034,
        //     name: "성동구립도서관",
        //     time: "월요일, 공휴일: 09:00 ~ 19:00/ 화~일: 07:00~22:00",
        //     point: "500p",
        //   },
        //             {
        //     id: 10,
        //     lat: 37.555,
        //     lng: 127.046,
        //     name: "한양대 제2공학관",
        //     time: "월요일, 공휴일: 09:00 ~ 19:00/ 화~일: 07:00~22:00",
        //     point: "500p",
        //   },
          // {
          //   id: 10,
          //   lat: 37.561,
          //   lng: 127.045,
          //   name: "사근동주민센터",
          //   time: "평일 09:00 ~ 18:00",
          //   point: "500p",
          // },
          // {
          //   id: 11,
          //   lat: 37.558,
          //   lng: 127.036,
          //   name: "행당 제1동 주민센터",
          //   time: "평일 09:00 ~ 18:00",
          //   point: "500p",
          // },
          // {
          //   id: 12,
          //   lat: 37.561,
          //   lng: 127.031,
          //   name: "왕십리 제 2동 주민센터",
          //   time: "24시간",
          //   point: "500p",
          // },
          // {
          //   id: 13,
          //   lat: 37.377,
          //   lng: 126.648,
          //   name: "APT",
          //   time: "09:00 ~ 18:00",
          //   point: "500p",
          // },
          // {
          //   id: 14,
          //   lat: 37.378,
          //   lng: 126.649,
          //   name: "송도어린이공원",
          //   time: "09:00 ~ 18:00",
          //   point: "500p",
          // }
        //];

      // 1. 서버에 현재 위치 POST 요청해서 bins 데이터 받아오기
      const locationData = {
        latitude: lat,
        longitude: lng,
      };

      fetch("http://localhost:8000/api/location/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ 전체 응답 객체:", data);
    console.log("✅ data.data:", data.data);
    console.log("✅ data.data[0]:", data.data?.[0]);
    console.log("✅ data.data[0] JSON:", JSON.stringify(data.data?.[0], null, 2));
          const nearbyBins = data.data.filter((bin) => {
    const distance = getDistanceFromLatLonInKm(lat, lng, bin.latitude, bin.longitude);
    return distance <= 2; // 2km 이하만 통과
  });
    
    const updatedBins = nearbyBins.map((bin) => { 
          const distance = getDistanceFromLatLonInKm(lat,lng,bin.latitude, bin.longitude);
          return{
            ...bin,
            lat:bin.latitude,
            lng:bin.longitude,
            distance: `${distance.toFixed(2)} km`,
            point: `500p`,
          }
        });
        setBins(updatedBins);
        console.log("✅ updatedBins:", updatedBins);

        updatedBins.forEach(bin => {
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

          const infoWindow = new window.kakao.maps.InfoWindow({
  content: `<div style="
      position: relative;
      background: white;
      padding: 12px 16px;
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      font-size: 13px;
      line-height: 1.6;
      width: max-content;
      max-width: 250px;
    ">
      <div style="font-weight: bold; margin-bottom: 6px;">${bin.name}</div>
      <div>운영시간: ${bin.opening_hour}</div>
      <div>거리: ${bin.distance}</div>
      <div>예상 지급 포인트: ${bin.point}</div>
            <!-- 말풍선 꼬리 부분 -->
      <div style="
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid white;
      "></div>
      </div>`,
  removable: false,
});

          window.kakao.maps.event.addListener(trashMarker, "mouseover", () => {
          console.log("mouseover", bin);
            infoWindow.open(mapInstance, trashMarker);
});

          window.kakao.maps.event.addListener(trashMarker, "mouseout", () => {
          infoWindow.close();
});

          window.kakao.maps.event.addListener(trashMarker, "click", () => {
            setSelectedBin({ ...bin, scanned: false });
            if (circleRef.current) circleRef.current.setMap(null);
            const circle = new window.kakao.maps.Circle({
              center: binPosition,
              radius: 100,
              strokeWeight: 1,
              strokeColor: '#007BFF',
              strokeOpacity: 0.5,
              fillColor: '#007BFF',
              fillOpacity: 0.3,
              map: mapInstance,
            });
            circleRef.current = circle;
          });
        });
      })
      .catch(error => {
        console.error("🚫 수거함 데이터 요청 실패:", error);
    });
  });
}else{
      alert("Geolocation을 지원하지 않는 브라우저입니다.");
    }};

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
    console.log("🛰 watchPosition 등록 조건:", map, userMarker, selectedBin);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("📍 위치 업데이트 감지:", lat, lng); // ✅ 로그 위치

        const newPosition = new window.kakao.maps.LatLng(lat, lng);
        if (userMarker) {
          userMarker.setPosition(newPosition);
        }
        if (selectedBin && circleRef.current) {
          const dist = getDistanceFromLatLonInKm(
            lat,
            lng,
            selectedBin.lat,
            selectedBin.lng
          );
          console.log("📏 현재 수거함까지 거리 (m):", dist * 1000);
          setInsideCircle(dist * 1000 <= 100);

          setLiveDistance(dist.toFixed(2) + " km"); // ✅ 실시간 거리 업데이
          if (dist * 1000 <= 100) {
            console.log("✅ 반경 안에 있음!");
            setInsideCircle(true);
          } else {
            console.log("❌ 반경 밖에 있음!");
            setInsideCircle(false);
          }
        }
      },
      (error) => {
        console.error("🚫 위치 추적 에러:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 10000
      }
    );
  }
}, [map, userMarker, selectedBin]);

useEffect(() => {
  if (
    selectedBin === null &&
    lastScannedBin &&
    scannedMap[lastScannedBin.id] === true &&
    insideCircle
  ) {
    console.log("✅ 반경 진입으로 모달 다시 열림!");
    setSelectedBin(lastScannedBin);
  }
}, [insideCircle, selectedBin, lastScannedBin, scannedMap]);

  return (
    <>
      <div id="map" className="w-full h-screen"></div>
      {selectedBin && (
        <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50 max-h-[40vh] overflow-y-auto">
          <div className="flex justify-between items-center px-4 pt-4">
            <div className="font-bold text-lg">{selectedBin.name}</div>
            <button onClick={() => setSelectedBin(null)} className="text-xl">
              ×
            </button>
          </div>
          <div className="px-4 pb-4 flex items-start gap-4">
            {/* 왼쪽 : 텍스트 정보 */}
            <div className="flex-1">
            <p className="text-sm text-gray-500">서울특별시 성동구</p>
            <p className="mt-2">운영시간: {selectedBin.opening_hour || "-"}</p>
            <p>현재 위치로부터의 거리 : {liveDistance || selectedBin.distance || "-"}</p>
            <p>예상지급포인트: {selectedBin.point || "-"}</p>
            </div>
            <img
              src={selectedBin.imageUrl || "/default.jpg"}
              alt="장소 이미지"
              className="w-32 h-24 rounded-lg object-cover"
            />
            </div>
            {!scanning && (
              <button
                onClick={() => {
                  console.log("버튼 클릭됨",{scannedCode, selectedBin});
                if (scannedCode) {
                  console.log("handleRoute 호출됨!");
                  setScanning(false); // ✅ 바코드 스캐너 닫기
                    // ✅ 캐릭터 마커 이미지로 변경
  if (userMarker && markerImageRef.current) {
    userMarker.setImage(markerImageRef.current);
  }
                  //handleRoute(); // ✅ 경로 표시만
                  setSelectedBin(null);  // ✅ 팝업 닫기
                } else {
                  setScanning(true); // ✅ 바코드 스캐너 열기
                }
          }}
                className={`mt-4 w-full ${
                  isScanned && insideCircle ? "bg-blue-500 text-white" : isScanned ? "bg-green-500 text-white" : "bg-green-200 text-black"
                } rounded-xl py-2 text-sm`}
              >
                {isScanned && insideCircle ? "도착하기" : isScanned ? "스캔한 종이팩 버리러 가기" : "종이팩 버리러 가기"}
              </button>
            )}
            {scanning && (
              <BarcodeScanner
                onDetected={(code) => {
                  console.log("스캔된 바코드:", code);
                  console.log("setScanning(false) 호출됨!");
                  setScanning(false);
                  setScannedCode(code);
                  setScannedMap((prev) => ({
      ...prev,
      [selectedBin.id]: true, // ✅ 해당 수거함만 스캔 완료 표시
    }));
    setLastScannedBin(selectedBin); // ✅ 마지막 스캔된 수거함 저장
                }}
                onClose={() => setScanning(false)}
              />
            )}
          </div>

      )}
    </>
  );
}

export default KakaoMap;