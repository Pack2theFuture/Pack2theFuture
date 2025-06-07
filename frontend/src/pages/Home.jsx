import Header from "../components/Header";
import Main from "../components/Main";
// import Footer from "../components/Footer";
import { useEffect, useState } from "react";


function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("https://backend-do9t.onrender.com/api/session-check/", {
      method: "GET",
      credentials: "include",  // 세션 쿠키 포함!
    })
      .then(res => res.json())
      .then(data => setIsAuthenticated(data.is_authenticated));
  }, []);

  // 로그인 상태 로딩 중
  if (isAuthenticated === null) return <div>Loading...</div>;

  // 미로그인 시
  if (!isAuthenticated) return <div>로그인 해주세요</div>;

  // 로그인 시
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default Home;
