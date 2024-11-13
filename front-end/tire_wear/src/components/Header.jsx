import React from 'react';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end p-2 bg-black text-white font-bold w-full">
      <div className="flex">
        <button className="text-lg" onClick={() => navigate('/sign-in')}>Sign In</button>
      </div>
      <div className="flex mr-3 ml-14">
        <button className="text-lg" onClick={() => navigate('/sign-up')}>Sign Up</button>
      </div>
    </div>
  );
}

export default Header;
