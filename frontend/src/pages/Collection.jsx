
import { useNavigate } from 'react-router-dom';
import GuideHeader from './Guideheader';
import Footer from '../components/Footer2';


const dummyData = [
  {
    date: '2025. 05. 01.',
    location: '한양대학교 대운동장',
    point: 500,
    distance: '2km',
    image: '/Gongbang.png',
  },
  {
    date: '2025. 05. 02.',
    location: '서울숲 앞 수거함',
    point: 300,
    distance: '1.5km',
    image: '/seoul_forest.png',
  },
];

export default function Collection() {
  useEffect(() => {
    // 실제 API 주소로 변경 필요
    fetch('https://backend-do9t.onrender.com/api/collection-history/', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log('collection-history:', data.history);
      });
  }, []);

  return (
    <>
      <GuideHeader Title="버리기 내역" />
      <div className="min-h-screen bg-gray-200 px-6 py-2">
        {dummyData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xl p-8 my-5 flex items-center gap-4"
          >
            <img
              src={item.image}
              alt="장소 이미지"
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex flex-col">
              <p className="text-sm font-bold mb-1">{item.date}</p>
              <p className="text-base font-semibold">{item.location}</p>
              <p className="text-sm">획득한 포인트: {item.point}p</p>
              <p className="text-sm">총 이동거리: {item.distance}</p>
            </div>
          </div>
        ))}

      </div>
      <Footer />

    </>
  );
}
