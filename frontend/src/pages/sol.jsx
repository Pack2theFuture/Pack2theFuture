import { useEffect } from "react";

function Sol() {
    useEffect(() => {
        const lat = 37.554722;
        const lng = 127.046667;
        console.log("현재 위치 (POST 전):", lat, lng);

        const locationData = {
            latitude: lat,
            longitude: lng,
        };

        // Django로 POST 요청 보내기
        fetch("http://backend-do9t.onrender.com/api/location/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(locationData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("서버 응답 (현위치 주고 근처 거점):", data);
            })
            .catch((error) => {
                console.error("에러:", error);
            });



        // 선택한 거점 id 보내기 
        const id = 1;
        fetch(`http://backend-do9t.onrender.com/api/collections/${id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(locationData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("서버 응답 (선택 거점 주고 거점 정보 받기):", data);
            })
            .catch((error) => {
                console.error("에러 (log):", error);
            });


        // 여기뭐냐 그 출발하기 버튼 
        const center_id = 1
        const collection_amount = 3
        const start_latitude = "37.554722"
        const start_longitute = "127.046667"

        const DepartData = {
            center_id: center_id,
            collection_amount: collection_amount,
            start_latitude: start_latitude,
            start_longitute: start_longitute
        };

        fetch("http://backend-do9t.onrender.com/api/depart/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(DepartData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("서버 응답 (출발하기):", data);
            })
            .catch((error) => {
                console.error("에러:", error);
            });


        // 여기뭐냐 그 도착하기 버튼
        const lat1 = "37.554722";
        const lng1 = "127.046667";
        const ArriveData = {
            user_latitude: lat1,
            user_longitude: lng1,
        };


        fetch("http://backend-do9t.onrender.com/api/arrive/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ArriveData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("서버 응답 (도착버튼):", data);
            })
            .catch((error) => {
                console.error("에러:", error);
            });



    }, []);

    return (
        <div>
            <h1>지도 페이지</h1>
        </div>
    );
}

export default Sol;



