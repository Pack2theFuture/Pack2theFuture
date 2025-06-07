import { useNavigate } from 'react-router-dom';

export default function Guideheader({Title}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white w-full flex items-center justify-between px-4 pt-9 pb-5 border-b-[2px] border-b-gray-300 relative">
      <h1 className="text-2xl font-bold mx-auto">{Title}</h1>
      <button
        onClick={() => navigate(-1)}
        className="absolute right-4 pt-1 text-2xl text-gray-700"
        aria-label="닫기"
      >
        <img src="/back.png" alt="뒤로가기" className="w-6 h-6 mb-2" />
      </button>
    </div>
  );
}
