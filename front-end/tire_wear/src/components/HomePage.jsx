import React from 'react';
import { Link } from 'react-router-dom';
import welcomeImg from '../images/maintenance.svg';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col w-[600px] ml-14">
        <h1 className="text-5xl font-bold">Welcome to Tire Wear Prediction</h1>

        <p className="mt-4 w-[350px] text-xl font-serif text-gray-300">
          Machine LearningExplore the future of tire care with our Machine
          Learning-based Tire Wear Prediction. Drive confidently as advanced
          algorithms anticipate and optimize tire health. Welcome to a smarter,
          safer journey on the road ahead.
        </p>
        <Link to="/predict">
          <button className="mt-4 border-none bg-indigo-700 p-3 w-[50%] text-xl font-bold uppercase shadow-lg button-regular">
            Get Started
          </button>
        </Link>
      </div>

      <div className="w-[580px] mr-[100px] image-container">
        <img src={welcomeImg} alt="welcome image" className="animated-image" />
      </div>
    </div>
  );
};

export default HomePage;
