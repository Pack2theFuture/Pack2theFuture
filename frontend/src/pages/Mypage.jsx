import React, { useState, useEffect } from 'react';
import { Home, Settings, Trophy, Flame, Package, Smartphone, Headphones } from 'lucide-react';

const EcoTrackingApp = () => {
    const [userData, setUserData] = useState({
        name: '홍길동',
        totalCollection: 0,
        treeCollection: 0,
        points: 500,
        level: 1
    });

    const [treeAnimation, setTreeAnimation] = useState('');

    // 나무 모양 결정
    const getTreeEmoji = () => {
        if (userData.totalCollection >= 100) return '🌳';
        if (userData.totalCollection >= 50) return '🌲';
        return '🌱';
    };

    // 프로필 편집
    const editProfile = () => {
        const newName = prompt('새로운 이름을 입력하세요:', userData.name);
        if (newName && newName.trim()) {
            setUserData(prev => ({ ...prev, name: newName.trim() }));
        }
    };

    // 네비게이션
    const navigateTo = (section) => {
        const messages = {
            'collection': '수거내역 페이지로 이동합니다.',
            'barcode': '바코드 내역 페이지로 이동합니다.',
            'customer-center': '고객센터로 연결합니다.'
        };
        alert(messages[section] || '해당 페이지로 이동합니다.');
    };

    // 나무 클릭 처리
    const handleTreeClick = () => {
        setTreeAnimation('animate-bounce');
        setUserData(prev => ({ ...prev, points: prev.points + 5 }));

        setTimeout(() => setTreeAnimation(''), 500);
    };

    // 수거량 증가 시뮬레이션
    const simulateCollection = () => {
        setUserData(prev => ({
            ...prev,
            totalCollection: prev.totalCollection + Math.floor(Math.random() * 10) + 1,
            treeCollection: prev.treeCollection + Math.floor(Math.random() * 5) + 1,
            points: prev.points + Math.floor(Math.random() * 50) + 10
        }));
    };

    // 자동 포인트 증가 (데모용)
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() < 0.1) {
                setUserData(prev => ({ ...prev, points: prev.points + 1 }));
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-sm mx-auto bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-white border-b">
                <Home
                    className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => alert('홈으로 이동합니다.')}
                />
                <h1 className="text-lg font-semibold text-gray-800">마이페이지</h1>
                <Settings
                    className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors"
                    onClick={() => alert('설정 페이지로 이동합니다.')}
                />
            </div>

            {/* Profile Section */}
            <div className="bg-white p-5 flex items-center justify-between border-b">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl text-gray-500">
                            👤
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                            <Trophy className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800">{userData.name}님</div>
                        <div className="text-sm text-gray-600">환경실천자</div>
                    </div>
                </div>
                <button
                    onClick={editProfile}
                    className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
                >
                    편집
                </button>
            </div>

            {/* Forest Section */}
            <div
                className="bg-green-100 p-8 text-center my-2"
                onDoubleClick={simulateCollection}
            >
                <h2 className="text-lg font-semibold text-gray-800 mb-2">푸른숲 나무</h2>
                <p className="text-sm text-gray-600 mb-8">수거해 주신 쓰레기 순환 나무가 자라요</p>

                <div className="flex justify-center mb-8">
                    <div
                        className={`text-6xl cursor-pointer hover:scale-110 transition-transform ${treeAnimation}`}
                        onClick={handleTreeClick}
                        style={{
                            animation: 'sway 3s ease-in-out infinite'
                        }}
                    >
                        {getTreeEmoji()}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5">
                    <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">총 적립 수거량</div>
                        <div className="text-lg font-semibold text-gray-800">{userData.totalCollection} kg</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">총 나무 수거량</div>
                        <div className="text-lg font-semibold text-gray-800">{userData.treeCollection} kg</div>
                    </div>
                </div>
            </div>

            {/* Points Section */}
            <div className="bg-white mx-5 p-5 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-800">내 포인트</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-800">{userData.points}p</span>
                </div>
            </div>

            {/* Menu Section */}
            <div className="bg-white mx-5 mt-5 rounded-lg shadow-sm overflow-hidden">
                <div
                    className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => navigateTo('collection')}
                >
                    <div className="flex items-center gap-4">
                        <Package className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">수거내역</span>
                    </div>
                    <span className="text-gray-400">{'>'}</span>
                </div>

                <div
                    className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => navigateTo('barcode')}
                >
                    <div className="flex items-center gap-4">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-800">바코드 내역</span>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400">{'>'}</span>
                </div>

                <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => navigateTo('customer-center')}
                >
                    <div className="flex items-center gap-4">
                        <Headphones className="w-5 h-5 text-gray-600" />
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