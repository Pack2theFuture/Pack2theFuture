import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://backend-do9t.onrender.com/api/login/", {
        //const res = await fetch("http://localhost:8000/api/login/", {
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
        // navigate("/mypage");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("로그인 요청 중 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 pt-24">
      <div className="w-full max-w-sm bg-black text-white rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">로그인</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded bg-white text-black placeholder-gray-400 outline-none border border-gray-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded bg-white text-black placeholder-gray-400 outline-none border border-gray-300"
          />

          <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            로그인
          </button>
        </form>

        {/* 🔻 회원가입 버튼 */}
        <button
          onClick={() => navigate('/signup')}
          className="mt-4 text-blue-300 underline hover:text-blue-500"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
