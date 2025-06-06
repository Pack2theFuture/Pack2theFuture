import { useNavigate } from 'react-router-dom';

export default function Guideheader() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between px-4 py-3 border-b">
      <h1 className="text-lg font-semibold mx-auto">이용 가이드</h1>
      <button
        onClick={() => navigate(-1)}
        className="absolute right-4 top-3 text-2xl text-gray-700"
        aria-label="닫기"
      >
        <img src="/back.png" alt="뒤로가기" className="w-6 h-6 mb-2" />
      </button>
    </div>
  );
}
