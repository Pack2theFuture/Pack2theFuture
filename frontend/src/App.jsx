import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';  // ✅ 대소문자 일치
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';  // ✅ 너가 추가
import KakaoMap from './pages/KakaoMap';
import Sol from './pages/sol'; // 기존 팀원 코드 유지
import MyPage from './pages/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* ✅ 너가 추가 */}
        <Route path="/map" element={<KakaoMap />} />
        <Route path="/sol" element={<Sol />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
