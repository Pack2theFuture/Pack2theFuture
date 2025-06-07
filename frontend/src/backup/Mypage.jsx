import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const EcoTrackingApp = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [treeAnimation, setTreeAnimation] = useState('');

    useEffect(() => {
          //fetch('https://backend-do9t.onrender.com/api/user-info/', {
          fetch('http://localhost:8000/api/user-info/', {
            method: 'GET',
            credentials: 'include' // 세션 쿠키 포함
        })
            .then(response => {
                if (!response.ok) {
                    console.log("사용자 정보를 불러오는 데 실패했습니다.");
                    throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
                }
                return response.json();
            })
            .then(data => {
                console.log("setUserData(data);");
                console.log("data : ", data)
                setUserData(data);
            })
            .catch(error => {
                console.error('Error:', error);
                console.log('Error:', error);
            });
    }, []);

// login 안될 때 임시 대체 코드
// useEffect(() => {
//     const dummyUser = {
//         id: "홍길동",
//         total_collect_amount: 68.5,
//         total_carbon_reduction: 23.7,
//         points: 1280,
//     };
//     setUserData(dummyUser);
// }, []);



    const getTreeEmoji = () => {
        if (!userData) return '🌱';
        if (userData.total_collect_amount >= 100) return '🌳';
        if (userData.total_collect_amount >= 50) return '🌲';
        return '🌱';
    };

    const handleTreeClick = () => {
        setTreeAnimation('animate-bounce');
        setTimeout(() => setTreeAnimation(''), 500);
    };

    const navigateTo = (section) => {
        const messages = {
            'collection': '수거내역 페이지로 이동합니다.',
            'barcode': '바코드 내역 페이지로 이동합니다.',
            'customer-center': '고객센터로 연결합니다.'
        };
        alert(messages[section] || '해당 페이지로 이동합니다.');
    };

    if (!userData) {
        return <div className="text-center mt-20 text-gray-600">사용자 정보를 불러오는 중...</div>;
    }

    return (
        <div className="max-w-sm mx-auto bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center p-4 bg-white border-b">
                <button onClick={() => navigate(-1)} className="absolute top-4 right-16">
                    <img src="/back.png" alt="뒤로가기" className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-semibold text-gray-800">마이페이지</h1>
            </div>

            <div className="bg-white p-5 flex items-center justify-between border-b">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl text-gray-500">
                            👤
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800">{userData.id}님</div>
                        <div className="text-sm text-gray-600">환경실천자</div>
                    </div>
                </div>
            </div>

            <div className="bg-green-100 p-8 text-center my-2" onDoubleClick={handleTreeClick}>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">푸른숲 나무</h2>
                <p className="text-sm text-gray-600 mb-8">수거해 주신 쓰레기 순환 나무가 자라요</p>
                <div className="flex justify-center mb-8">
                    <div className={`text-6xl cursor-pointer hover:scale-110 transition-transform ${treeAnimation}`} style={{ animation: 'sway 3s ease-in-out infinite' }}>
                        {getTreeEmoji()}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5">
                    <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">총 적립 수거량</div>
                        <div className="text-lg font-semibold text-gray-800">{userData.total_collect_amount.toFixed(1)} kg</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">총 탄소 절감량</div>
                        <div className="text-lg font-semibold text-gray-800">{userData.total_carbon_reduction.toFixed(1)} kg</div>
                    </div>
                </div>
            </div>

            <div className="bg-white mx-5 p-5 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-800">내 포인트</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-800">{userData.points.toFixed(0)}p</span>
                </div>
            </div>

            <div className="bg-white mx-5 mt-5 rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigateTo('collection')}>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-800">수거내역</span>
                    </div>
                    <span className="text-gray-400">{'>'}</span>
                </div>

                <div className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigateTo('barcode')}>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-800">바코드 내역</span>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400">{'>'}</span>
                </div>

                <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigateTo('customer-center')}>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-800">고객센터</span>
                    </div>
                    <span className="text-gray-400">{'>'}</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes sway {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(2deg); }
                }
            `}</style>
        </div>
    );
};

export default EcoTrackingApp;
