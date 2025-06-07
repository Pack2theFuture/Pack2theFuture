import { useNavigate, Link } from "react-router-dom";

export default function SlideMenu({ isOpen, onClose, userInfo }) {
  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      //const res = await fetch("https://backend-do9t.onrender.com/api/logout/", {
      const res = await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        alert("로그아웃 되었습니다.");
        onClose();
        window.location.reload();
      } else {
        alert("로그아웃 실패");
      }
    } catch (err) {
      alert("로그아웃 중 오류 발생");
    }
    console.log(res.status);
    const data = await res.json();
    console.log(data);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/2 max-w-sm bg-[#faf7f0] shadow-lg z-[9999] transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* 닫기 버튼 */}
      <button onClick={onClose} className="absolute top-4 right-4 text-xl">
        ✕
      </button>

      <div className="px-6 pt-20 pb-10 text-black space-y-10 h-full flex flex-col justify-between">
        <div>
          {/* 유저 정보 */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 bg-gray-200 rounded-full" />
            <div className="text-lg font-semibold">
              {userInfo ? `${userInfo.username}님` : "로그인필요"}
            </div>
            {userInfo ? (
              <Link to="/mypage" className="text-sm text-gray-500 hover:underline">
                마이페이지
              </Link>
            ) : (
              <Link to="/login" className="text-sm text-gray-500 hover:underline">
                로그인
              </Link>
            )}
          </div>

          {/* 메뉴 그룹 */}
          <div className="flex justify-between items-center mb-2 mt-10">
            <div className="font-bold text-xl mb-2">About</div>
            <button
              className="text-left text-gray-700 text-base pr-20"
              onClick={() => {
                navigate("/brand");
                onClose();
              }}
            >
              팩투더퓨처
            </button>
          </div>

          <div>
            <div className="mb-4">
              <div className="font-bold text-xl mb-2">Notice</div>
              <div className="flex flex-col text-left text-gray-700 text-base space-y-1 pl-5">
                <button onClick={() => { navigate("/notice"); onClose(); }}>
                  공지사항
                </button>
                <button onClick={() => { navigate("/faq"); onClose(); }}>
                  자주 묻는 질문
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-xl mb-2">Store</div>
            <a href="https://refeely.com" target="_blank" rel="noopener noreferrer">
              <button
                className="text-left text-gray-700 text-base pr-20"
                onClick={onClose}
              >
                re:feely mall
              </button>
            </a>
          </div>

          <div>
            <div className="font-bold text-xl">Membership</div>
          </div>
        </div>

        {/* 하단 로그아웃 */}
        {userInfo && (
          <div className="flex justify-center">
            <button
              className="text-red-500 text-base font-semibold underline hover:text-red-700 transition"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
