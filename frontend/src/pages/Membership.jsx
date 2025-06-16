import React from 'react';
import GuideHeader from './Guideheader';
import Footer from '../components/Footer2';

export default function Membership() {
  return (
    <>
    <GuideHeader Title="Membership"/>
    <div className="min-h-screen bg-gray-100 px-6 py-6">
      <img
        src="/membership.png"
        alt="브랜드"
        className="w-full h-auto object-contain"
      />
    </div>
    <Footer/>
    </>
  );
}