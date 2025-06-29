import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const EcoTrackingApp = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [treeAnimation, setTreeAnimation] = useState('');

    useEffect(() => {
            fetch('https://backend-do9t.onrender.com/api/user-info/', {
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


    const getTreeContent = () => {
        if (!userData) return {type : 'emoji', content : '🌱'};
        if (userData.total_collect_amount >= 100) return {type: 'image', content : '/Greenkeeper.png'};
        if (userData.total_collect_amount >= 50) return {type : 'emoji', content:'🌲'};
        return { type: 'emoji', content: '🌱' };
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
        <div className="w-full min-h-screen flex flex-col bg-[#f7f7f9]">
            {/* 상단 바 */}
            <div className="w-full flex justify-between items-center p-4 bg-white border-b">
                <button onClick={() => navigate(-1)} className="absolute top-4 right-16">
                    <img src="/back.png" alt="뒤로가기" className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-semibold text-gray-800 w-full text-center">마이페이지</h1>
            </div>
            {/* <GuideHeader Title="마이페이지" /> */}

            {/* 마이페이지 본문 */}
            <main className="flex-1 flex flex-col items-center w-full px-0">
                <div className="w-full">
                    {/* 유저 정보 */}
                    <div className="bg-white p-5 flex items-center border-b w-full">
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

                    {/* 나무 애니메이션 */}
                    <div className="bg-[#acc5a2] p-8 text-center my-2 w-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Green keeper</h2>
                        <p className="text-m text-gray-600 mb-8">수거해 주신 쓰레기 순환 나무가 자라요</p>
                        <div className="flex justify-center mb-8">
                            <div className={`text-6xl cursor-pointer hover:scale-110 transition-transform ${treeAnimation}`} style={{ animation: 'sway 3s ease-in-out infinite' }}>
                                {
                                    (()=>{
                                        const tree = getTreeContent();
                                        if (tree.type ==='emoji'){
                                            return tree.content;
                                        } else {
                                            return <img src={tree.content} alt="Tree" className="w-48 h-48 mx-auto"/>
                                        }
                                    })()
                                }
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <div className="text-center">
                                <div className="text-m font-semibold text-gray-700 mb-1">총 적립 수거량</div>
                                <div className="text-lg font-semibold text-gray-800">{(userData.total_collect_amount*0.3).toFixed(1)} kg</div>
                            </div>
                            <div className="text-center">
                                <div className="text-m font-semibold text-gray-700 mb-1">총 탄소 절감량</div>
                                <div className="text-lg font-semibold text-gray-800">{(userData.total_carbon_reduction*0.26).toFixed(2)} kg</div>
                            </div>
                        </div>
                    </div>

                    {/* 포인트 */}
                    <div className="bg-white p-5 rounded-none shadow-none w-full">
                        <div className="flex justify-between items-center mb-5">
                            <div className="flex items-center gap-1">
                                <img src="/coin.png" alt="코인" className="w-6 h-6" />
                                <span className="text-gray-800">내 포인트</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-800">{userData.points.toFixed(0)}p</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                            </div>
                            <a
                                href="https://refeely.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                            >
                                <img src="/mall.png" alt="코인" className="w-8 h-8" />
                                <span className="text-lg font-semibold text-gray-800"> 포인트 쓰러 가기 &nbsp; &gt; &nbsp;</span>
                            </a>
                        </div>
                    </div>

                    {/* 메뉴 */}
                    <div className="bg-white mt-5 rounded-none shadow-none overflow-hidden w-full">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigate('/collection')}>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-800">버리기 내역</span>
                            </div>
                            <span className="text-gray-400">{'>'}</span>
                        </div>

                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => navigateTo("https://refeely.com/")}>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-800">고객센터</span>
                            </div>
                            <span className="text-gray-400">{'>'}</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* 푸터 */}
            <footer className="bg-[#e8eaed] py-8 px-4 w-full mt-auto">
                <div className="w-full flex flex-col items-center">
                    <div className="text-base font-medium mb-1 text-black">Team INFO</div>
                    <div className="text-sm text-gray-600 mb-4">© PACK TO THE FUTURE</div>
                    <div className="flex flex-row gap-8 text-xs text-gray-700">
                        <a href="#" className="hover:underline">이용약관</a>
                        <a href="#" className="hover:underline">개인정보처리방침</a>
                        <a href="#" className="hover:underline">고객센터</a>
                    </div>
                </div>
            </footer>

            {/* 나무 sway 애니메이션 */}
            <style jsx="true">{`
                @keyframes sway {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(5deg); }
                }
            `}</style>
        </div>
    );
};

export default EcoTrackingApp;
