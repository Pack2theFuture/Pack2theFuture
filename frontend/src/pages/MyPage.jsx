import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function MyPage() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/home");
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col mt-16">
        <h2>Mypage 영역입니다</h2>
        <button onClick={()=> logout()}>로그아웃</button>
      </main>
      <Footer />
    </>
  );
}
