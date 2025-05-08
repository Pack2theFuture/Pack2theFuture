import { useEffect } from "react";

function Sol() {
    useEffect(() => {
        const lat = 30;
        const lng = 70;
        console.log("현재 위치 (POST 전):", lat, lng);

        const locationData = {
            latitude: lat,
            longitude: lng,
        };

        // Django로 POST 요청 보내기
        fetch("http://localhost:8000/api/location/", {
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
            .catch((error) => {
                console.error("에러:", error);
            });



        // 선택한 거점 id 보내기 
        const id = 223;
        fetch(`http://localhost:8000/api/collections/${id}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(locationData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("서버 응답 (log):", data);
            })
            .catch((error) => {
                console.error("에러 (log):", error);
            });

    }, []);

    return (
        <div>
            <h1>지도 페이지</h1>
        </div>
    );
}

export default Sol;



