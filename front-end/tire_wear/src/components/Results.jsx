import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const predictionResult = location.state?.predictionResult;

  return (
    <div>
      <h2>Probability of Tire wear : {predictionResult}</h2>
      {/* (other Results component content) */}
    </div>
  );
};

export default Results;
