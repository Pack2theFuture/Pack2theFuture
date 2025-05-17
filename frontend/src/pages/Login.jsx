import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직 (예시)
    navigate('/home'); // 로그인 성공 시 home으로 이동
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
