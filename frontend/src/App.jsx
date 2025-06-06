
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Map from './pages/Map';
import Sol from './pages/sol';
import Mypage from './pages/Mypage';
import Guide from './pages/Guide'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<Map />} />
        <Route path="/sol" element={<Sol />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/guide" element={<Guide />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;