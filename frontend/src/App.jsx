import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';  // ✅ 대소문자 일치
import Home from './pages/Home';
import Login from './pages/Login';

import Signup from './pages/Signup';
import Map from './pages/Map';
import Sol from './pages/sol';  // sol
import Mypage from './pages/Mypage';  // sol

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<Map />} />
        <Route path="/sol" element={<Sol />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
