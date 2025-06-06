import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer2";

const Main = () => {
  //const navigate = useNavigate();

  return (
    <div className="bg-white text-black font-sans pb-0 pt-[60px]">
      {/* 공지 배너 */}
<div className="bg-[#f5f4f2] mx-8 mt-4 px-4 py-2 text-sm rounded-full flex items-center justify-center shadow border border-gray-300">
  <input
    type="text"
    placeholder="📢 오늘의 소식 | 리필리 10% 할인!! 세기의…"
    className="bg-[#f5f4f2] text-sm text-gray-900 placeholder-gray-500 outline-none border-none w-full text-center"
  />
</div>

      {/* 리필리 제품 이미지 */}
      <section className="mt-4 mx-8 relative">
        <a href="https://refeely.com/" target="_blank" rel="noopener noreferrer">
          <img
            src="/refilly.png"
            alt="리필리 제품"
            className="rounded-xl w-full cursor-pointer"
          />
        </a>
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
          1 / 7
        </div>
      </section>

      <section className="grid grid-cols-2 gap-6 mt-6 mx-8 pb-10 border-b-2 border-gray-200">
        {/* 버리러 가기 → /map 이동 */}
         <Link to="/map">
          <img 
          src="/mapImg.png" 
          alt="map" 
          className="aspect-square w-full rounded-xl object-cover"
          />
         </Link>
        {/* 이용 가이드 → /guide 이동 */}
          <Link to="/guide">
          <img 
          src="/guideImg.png" 
          alt="guide" 
          className="aspect-square w-full rounded-xl object-cover"
          />
          </Link>
      </section>

      {/* 멤버십 가입 버튼 → 알림
      <section className="mt-4 mx-4">
        <button
          className="w-full bg-[#FDE8A6] text-black py-3 rounded-full font-medium shadow flex items-center justify-center gap-2"
          onClick={() => navigate("/login")}
        >
          <img src="/Splash_logo.png" alt="로고" className="w-5 h-5" />
          팩투더퓨처 멤버십 가입하기
        </button>
      </section> */}

      {/* 콜라보 섹션 */}
      <section className="mt-10 mx-9">
        <h1 className="font-bold text-center text-2xl mb-3">팩투더퓨처 X 리필리 콜라보 !</h1>
        <div className="mt-2 rounded-xl overflow-hidden">
        <a href="https://refeely.com/category/%EC%A0%84%EC%B2%B4/58/" target="_blank" rel="noopener noreferrer">
          <img src="/rice.png" alt="밥 짓자" className="rounded-xl w-full cursor-pointer" />
        </a>
        </div>
      </section>

      {/* NFC 이미지 클릭 시 링크 */}
      <section className="mt-10 mx-9">
        <h1 className="font-bold text-center text-2xl">Project 0: 인투더퓨처</h1>
        <p className="text-sm text-center text-gray-600 mt-1 mb-3">간단하게 팩투더퓨처에 들어오고 싶다면? NFC 키링 이벤트!</p>
        <div className="mt-2 rounded-xl overflow-hidden">
          <a href="https://noplasticsunday.com/51/?idx=26" target="_blank" rel="noopener noreferrer">
            <img src="/NFC.png" alt="NFC 키링" className="w-full cursor-pointer" />
          </a>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Main;
