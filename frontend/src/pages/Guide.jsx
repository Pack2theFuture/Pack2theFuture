import React from 'react';
import GuideHeader from './Guideheader';
import Footer from '../components/Footer2';

export default function Guide() {
  return (
    <>
    <GuideHeader Title="이용가이드"/>
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      <img
        src="/guide.png"
        alt="이용 가이드"
        className="w-full h-auto object-contain"
      />
    </div>
    <Footer/>
    </>
  );
}

