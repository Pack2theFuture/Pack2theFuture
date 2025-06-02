import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black font-sans pb-20">
      {/* 공지 배너 */}
      <div className="bg-[#FFF7EC] mx-4 mt-4 px-4 py-2 text-sm rounded-full flex items-center justify-center shadow">
        <span className="mr-2">📢</span>
        오늘의 소식 | 리필리 100% 할인!! 세기의…
      </div>

      {/* 리필리 제품 이미지 (링크) */}
      <section className="mt-4 mx-4 relative">
        <a href="https://refeely.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="/refilly.png"
            alt="리필리 제품"
            className="rounded-xl w-full cursor-pointer"
          />
        </a>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
          1 / 7
        </div>
      </section>

      {/* 버튼 2개 */}
      <section className="grid grid-cols-2 gap-4 mt-6 mx-4">
        {/* 버리러 가기 → /map으로 이동 */}
        <div
          className="bg-[#D4E6C3] p-4 rounded-xl flex flex-col items-center shadow cursor-pointer"
          onClick={() => navigate("/map")}
        >
          <div className="text-3xl">🗺️</div>
          <p className="mt-2 font-medium text-sm">버리러 가기</p>
        </div>

        {/* 이용 가이드 (클릭 기능 없음) */}
        <div className="bg-[#D4E6C3] p-4 rounded-xl flex flex-col items-center shadow">
          <div className="text-3xl">📓</div>
          <p className="mt-2 font-medium text-sm">이용 가이드</p>
        </div>
      </section>

      {/* 멤버십 가입 버튼 */}
      <section className="mt-4 mx-4">
        <button className="w-full bg-[#FDE8A6] text-black py-3 rounded-full font-medium shadow flex items-center justify-center gap-2">
          <img src="/Splash_logo.png" alt="로고" className="w-5 h-5" />
          팩투더퓨처 멤버십 가입하기
        </button>
      </section>

      {/* 콜라보 섹션 (rice → 링크 연결됨) */}
      <section className="mt-10 mx-4">
        <h2 className="font-bold text-lg mb-2">팩투더퓨처 X 리필리 콜라보 !</h2>
        <a href="https://refeely.com/category/%EC%A0%84%EC%B2%B4/58/" target="_blank" rel="noopener noreferrer">
          <img src="/rice.png" alt="밥 짓자" className="rounded-xl w-full cursor-pointer" />
        </a>
        <p className="mt-2 text-sm">맛난 쌀로 밥 지어 먹자</p>
      </section>

      {/* NFC 이미지 클릭 시 링크 연결 */}
      <section className="mt-10 mx-4">
        <h2 className="font-bold text-lg">Project 0: 인투더퓨처</h2>
        <p className="text-sm text-gray-600 mt-1">간단하게 팩투더퓨처에 들어오고 싶다면? NFC 키링 이벤트!</p>
        <div className="mt-2 rounded-xl overflow-hidden">
          <a href="https://noplasticsunday.com/51/?idx=26" target="_blank" rel="noopener noreferrer">
            <img src="/NFC.png" alt="NFC 키링" className="w-full cursor-pointer" />
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <p className="text-center text-xs mt-10 text-gray-400">© PACK TO THE FUTURE</p>
    </div>
  );
};

export default Main;
