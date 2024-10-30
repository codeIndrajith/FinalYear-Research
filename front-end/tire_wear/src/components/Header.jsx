import React from 'react';

function Header() {
  return (
    <div className="flex justify-end p-2 bg-black text-white font-bold w-full">
      <div className="flex">
        <button className="text-lg">Home</button>
      </div>
      <div className="flex mr-3 ml-14">
        <button className="text-lg">About</button>
      </div>
    </div>
  );
}

export default Header;
