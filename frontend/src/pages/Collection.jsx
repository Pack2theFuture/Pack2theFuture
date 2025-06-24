
import { useNavigate } from 'react-router-dom';
import GuideHeader from './Guideheader';
import Footer from '../components/Footer2';
import React, { useEffect,useState } from 'react';


export default function Collection() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://backend-do9t.onrender.com/api/collection-history/', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(result => {
        console.log('collection-history:', result.history);
        setData(result.history);
      });
  }, []);

  return (
    <>
      <GuideHeader Title="버리기 내역" />
      <div className="min-h-screen bg-gray-200 px-6 py-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xl p-8 my-5 flex items-center gap-4"
          >
            <img
              // src={item.image}
              src="/character.png"
              alt="장소 이미지"
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex flex-col">
              <p className="text-sm font-bold mb-1">{item.date}</p>
              <p className="text-base font-semibold">{item.center_name}</p>
              <p className="text-sm">획득한 포인트: {item.point}p</p>
              <p className="text-sm">총 이동거리: {item.distance_walk}</p>
            </div>
          </div>
        ))}

      </div>
      <Footer />

    </>
  );
}
