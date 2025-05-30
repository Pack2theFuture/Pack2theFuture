import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // 로그인 처리 로직 (백엔드 연동 전)
    alert('로그인 시도');
    localStorage.setItem('user', JSON.stringify({ email, password }));
    navigate('/home');

//     try {
//       const res = await fetch("https://backend-do9t.onrender.com/api/login/", {
//         //const res = await fetch("http://localhost:8000/api/login/", {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await res.json();

//       if (res.status === 200) {
//         alert(data.message);
//         localStorage.setItem("user_id", data.user_id);
//         navigate("/home");
//         // navigate("/mypage");
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("로그인 요청 중 오류:", error);
//       alert("서버 오류가 발생했습니다.");
//     }
  };

  return (
    <div className="min-h-screen bg-white px-6 pt-10">
      <button className="text-left text-black text-sm mb-4" onClick={() => navigate('/home')}>
        ← 뒤로가기
      </button>

      <div className="text-center text-black text-2xl font-semibold leading-snug mb-6">
        <div>유유팩과</div>
        <div>함께하는</div>
        <div>미래</div>
      </div>

      <div className="max-w-sm mx-auto bg-black text-white rounded-2xl p-6">
        <h2 className="text-center text-xl font-bold mb-4">ID로 로그인</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-full bg-white text-black placeholder-gray-400 outline-none border border-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-full bg-white text-black placeholder-gray-400 outline-none border border-gray-300"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            로그인
          </button>
        </form>
        <div className="text-center text-white mt-4 cursor-pointer text-sm" onClick={() => navigate('/signup')}>
          회원가입
        </div>
      </div>
    </div>
  );
}