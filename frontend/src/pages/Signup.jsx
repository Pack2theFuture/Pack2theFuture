import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('올바른 이메일 형식을 입력하세요.');
      return;
    }

    setError('');

    try {
      const res = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: email.split('@')[0],  // 예: sol@gmail.com → sol
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("회원가입 성공!");
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        alert(data.message || "회원가입 실패");
      }

    } catch (error) {
      console.error("회원가입 중 에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 pt-24">
      <div className="w-full max-w-sm bg-black text-white rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">회원가입</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded bg-white text-black placeholder-gray-400 outline-none border border-gray-300"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded bg-white text-black placeholder-gray-400 outline-none border border-gray-300"
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">회원가입</button>
        </form>
      </div>
    </div>
  );
}
