import React from 'react';
import GuideHeader from './Guideheader'; 

export default function Guide() {
  return (
    <div className="min-h-screen bg-white px-6 pt-10">
      <GuideHeader />
      <img
        src="/guide.png"
        alt="이용 가이드"
        className="w-full h-auto object-contain"
      />
    </div>
  );
}

