import { useNavigate } from "react-router-dom";
import box from "../assets/box.png";
import home from "../assets/home.png";
import user_profile from "../assets/user_profile.png"

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50">
      <button onClick={() => navigate('/map')} className="flex flex-col items-center text-sm text-gray-500">
        <img src={box} className="w-6 h-6" />
        <span>수거</span>
      </button>
      <button className="flex flex-col items-center text-sm text-gray-500">
        <img src={home} className="w-6 h-6" />
        <span>홈</span>
      </button>
      <button onClick={() => navigate('/mypage')} className="flex flex-col items-center text-sm text-gray-500">
        <img src={user_profile} className="w-6 h-6" />
        <span>마이페이지</span>
      </button>
    </div>
  );
}

export default Footer;