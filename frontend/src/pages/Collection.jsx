
import { useNavigate } from 'react-router-dom';
import GuideHeader from './Guideheader';
import Footer from '../components/Footer2';
import React, { useEffect } from 'react';


const dummyData = [
  {
    date: '2025. 06. 01.',
    location: '공방 꽃피는 삼월에',
    point: 280,
    distance: '2.8km',
    image: '/Gongbang.png',
  },
  {
    date: '2025. 05. 26.',
    location: '성동구청_IoT스마트 종이팩 분리배출함',
    point: 120,
    distance: '0.12km',
    image: '/Seongdong.png',
  },
];

export default function Collection() {
  useEffect(() => {
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
