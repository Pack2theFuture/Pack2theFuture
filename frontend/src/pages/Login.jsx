import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch("https://backend-do9t.onrender.com/api/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        alert(data.message);
        localStorage.setItem("user_id", data.user_id);
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("로그인 요청 중 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f0eb] px-6 pt-10">
       <button onClick={() => {
  if (window.history.length > 2) {
    navigate(-1);
  } else {
    navigate('/');
  }
}} className="absolute top-4 right-4"
>
  <img src="/back.png" alt="뒤로가기" className="w-6 h-6 mb-2" />
</button>


      <div className="text-center text-black text-2xl font-semibold leading-snug mb-6">
        <div>우유팩과</div>
        <div>함께하는</div>
        <div>미래</div>
      </div>

      <div className="max-w-sm mx-auto bg-black text-white rounded-2xl p-6">
        <h2 className="text-center text-xl font-bold mb-4">ID로 로그인</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
