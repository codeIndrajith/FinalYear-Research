import React from 'react';
import HomePage from './components/HomePage';
import PredictionPage from './components/PredictionPage';
import Results from './components/Results';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/predict" element={<PredictionPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
