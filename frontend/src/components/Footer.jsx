import { useNavigate } from "react-router-dom";
import box from "../assets/box.png";
import home from "../assets/home.png";
import user_profile from "../assets/user_profile.png"

function Footer() {
  const navigate = useNavigate();

  const handleMyPageClick = async () => {
    console.log("마이페이지 버튼 클릭됨"); // 확인용 로그
    console.log(localStorage.getItem("user")); // 확인용 로그

    const user = localStorage.getItem("user");
    if (user) {
      console.log("로그인된 사용자 → 마이페이지로 이동");
      navigate("/mypage");
    } else {
      console.log("비로그인 상태 → 로그인 화면으로 이동");
      navigate("/login");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50">
      <button onClick = {()=> navigate('/map')}className="flex flex-col items-center text-sm text-gray-500">
        <img src={box} className="w-6 h-6" />
        <span>수거</span>
      </button>
      <button className="flex flex-col items-center text-sm text-gray-500" onClick={()=> navigate('/home')}>
        <img src={home} className="w-6 h-6" />
        <span>홈</span>
      </button>
      <button className="flex flex-col items-center text-sm text-gray-500" onClick={handleMyPageClick}>
        <img src={user_profile} className="w-6 h-6" />
        <span>마이페이지</span>
      </button>
    </div>
  );
}

export default Footer;