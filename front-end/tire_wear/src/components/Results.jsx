import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const predictionResult = parseFloat(location.state?.predictionResult).toFixed(4);
  const remainingTireLife = (50000 - (50000 * predictionResult)).toFixed(2);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Tire Wear Analysis
        </h2>
        
        <div className="bg-blue-50 p-6 rounded-xl shadow-inner flex flex-col justify-between items-center">
          <p className="text-lg text-gray-600 mb-2">
            Tire wear average
          </p>
          <h2 className="text-4xl font-extrabold text-blue-700 mb-6">
            {predictionResult}%
          </h2>
        </div>

        <div className="mt-8">
          <h3 className="text-lg text-gray-600">Average Tire Life <span className="font-semibold">50,000 KM</span></h3>
          
          <div className="mt-4 p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-white">
              Remaining Tire Life: <span className="text-yellow-300">{remainingTireLife} KM</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
