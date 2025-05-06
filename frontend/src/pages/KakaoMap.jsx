import { useEffect } from "react";

function KakaoMap() {
console.log("KAKAO KEY!");
  useEffect(() => {
    //console.log("KAKAO KEY", import.meta.env.VITE_KAKAO_MAP_KEY);
    // 스크립트가 이미 있으면 중복 로딩 방지
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
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);}
        else {
          alert("Geolocation을 지원하지 않는 브라우저입니다.");
          initMap(37.5154, 126.9074); // 영등포역 위도, 경도 기본값
        }
      }
      function successHandler(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("현재 위치:", lat, lng);
        //백엔드에 보낼 JSON 데이터
        const locationDate = {
          latitude: lat,
          longitude: lng,
        }

        fetch("http://localhost:8080/api/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(locationDate),
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("서버 응답:", data);
        })
        .catch((error) =>
          console.error("서버 요청 실패:", error));


        initMap(lat, lng);
      }
  
      function errorHandler(error) {
        console.error(error);
        alert("위치 정보를 가져올 수 없습니다. 기본 위치로 이동합니다.");
        initMap(37.5665, 126.9780); // 실패하면 서울 시청
      }
  
      function initMap(lat, lng) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 🔥 내 위치에 빨간 점 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const markerImage = new window.kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
          new window.kakao.maps.Size(40, 40),     // 사이즈 (살짝 줄였어 보기 좋게)
          {
            offset: new window.kakao.maps.Point(20, 40),   // 마커 기준점 위치
          }
        );
      
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
          map: map,
        });

      //수거함 마커 및 팝업 추가
      // ✅ 임의의 수거함 위치 예시
      const bins = [
        { lat: 37.378, lng: 126.645, name: "한양대학교 대운동장",  time: "18:00~20:00",
          distance: "2km",
          point: "500p"},
        { lat: 37.380, lng: 126.656, name: "수거함 B" },
      ];

      bins.forEach((bin) => {
        const binPosition = new window.kakao.maps.LatLng(bin.lat, bin.lng);

        // ✅ 수거함 마커 생성
        // const binMarker = new window.kakao.maps.Marker({
        //   position: binPosition,
        //   map,
        //   image: new window.kakao.maps.MarkerImage(
        //     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
        //     new window.kakao.maps.Size(40, 40),
        //     { offset: new window.kakao.maps.Point(20, 40) }
        //   ),
        // });

        const trashBinImage = new window.kakao.maps.MarkerImage(
          "/trashbin.png", // 🔥 상대 경로로 지정
          new window.kakao.maps.Size(40, 40),
          { offset: new window.kakao.maps.Point(20, 40) }
        );
        
        const trashMarker = new window.kakao.maps.Marker({
          //position: new window.kakao.maps.LatLng(37.5575, 127.0459), // 수거함 위치
          position: binPosition,
          image: trashBinImage,
          map: map,
        });

        // ✅ hover 시 InfoWindow 스타일 (말풍선)
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
        content: content,
        removable: false
      });

        // ✅ click 시 하단 팝업 (고정)
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
          detailPopup.setMap(map);
        });
      });

      }
    
    }, []);
  
    return (
      <div id="map" className="w-full h-screen"></div>
    );
  }
  
  export default KakaoMap;