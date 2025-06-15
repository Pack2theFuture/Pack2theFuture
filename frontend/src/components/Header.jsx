import menu from "../assets/menu.png";
import packText from "../assets/pack_text.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
// import { useState } from "react";
import SlideMenu from "../components/SlideMenu";
import { useEffect, useState } from "react";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 로그인 상태 및 유저 정보 확인 API
    fetch("https://backend-do9t.onrender.com/api/session-check/", {
    //fetch("http://localhost:8000/api/session-check/", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.is_authenticated) {
          setUserInfo({
            user_id: data.user_id,
            username: data.user_id
          });
        } else {
          setUserInfo(null);
        }
      });
  }, []);

  return (
    <>
      <header>
        <div className="fixed top-0 left-0 w-full h-17 bg-white border-2 flex justify-between items-center px-8 py-3 z-50">
          <Link to="/home" className="flex items-center gap-3">
          <img
          src={logo}
          className="h-9 w-auto"/>
             <img
              src={packText}
              className="h-auto max-h-10 w-auto max-w-[60%]"
            />
          </Link>

          <button className="flex items-center"
            onClick={() => setMenuOpen(true)}>
            <img src={menu} className="h-7 w-10" />
          </button>
          <SlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} userInfo={userInfo} />
        </div>
      </header>
    </>
  );
}

export default Header;