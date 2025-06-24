import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-300 text-center text-sm text-black pt-6 pb-6">
      <div className="mb-4">
        <p className="font-medium">Team INFO</p>
        <p className="text-center text-xs mt-1 mb-5 text-gray-600">© PACK TO THE FUTURE</p>
      </div>

      <div className="flex justify-center gap-8 text-xs text-gray-700 mt-10">
        <Link to="/terms">이용약관</Link>
        <Link to="/privacy">개인정보처리방침</Link>
        <Link to="/support">고객센터</Link>
      </div>
    </footer>
  );
}
