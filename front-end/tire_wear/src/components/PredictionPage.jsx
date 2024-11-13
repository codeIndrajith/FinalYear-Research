import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import tire from '../images/tire2.jpg';
import tireMaintences from '../images/man.svg';
import toast from 'react-hot-toast';

const PredictionPage = () => {
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get('http://localhost:5000/predict');

        const model = await tf.loadGraphModel(response.data.modelPath);
        setModel(model);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchModel();
  }, []);

  useEffect(() => {
    if (predictionResult !== null) {
      navigate('/results', { state: { predictionResult } });
    }
  }, [predictionResult]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const loadImage = async (url) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    return new Promise((resolve, reject) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0, 150, 150);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const normalizedTensor = tf.tidy(() => {
          const tensor = tf.browser.fromPixels(imageData);
          return tensor.expandDims(0).toFloat().div(tf.scalar(255));
        });

        resolve(normalizedTensor);
      };

      img.onerror = (err) => reject(err);
      img.src = url;
    });
  };

  const handleSubmit = async () => {
    if (!model || !selectedImage) {
     toast.error('Image not selected')
      return;
    }

    try {
      const imageTensor = await loadImage(selectedImage);
      const predictions = await model.predict(imageTensor).data();
      const value = predictions;
      setPredictionResult(value);
      toast.success("Prediction success")
      // navigate('/results', { state: { predictionResult } });
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Error making prediction.')
    }
  };

  return (
    <div className="w-[100%] h-[90%] flex items-center justify-center bg-black">
      {/* Wallpaper section */}
      <div className="w-full h-[100vh] mb-5 p-2">
        <div className="flex justify-center items-center w-full h-full p-4">
          <img src={tire} alt="tire wallpaper" className="w-[70%]" />
        </div>
      </div>

      {/* upload image section */}
      <div className="p-8 w-full h-full flex justify-center items-center mb-12">
        <div className="flex flex-col justify-center items-center w-full h-[90%] p-3">
          <h2 className="font-semibold text-white uppercase text-4xl">
            Upload Tire Image
          </h2>

          <img src={tireMaintences} alt="maintenceMan" className="w-[40%]" />

          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageUpload}
            className="px-2 border-none bg-transparent focus:outline-none focus:ring focus:border-blue-300"
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full mt-4 rounded-md"
              style={{ maxHeight: '200px', maxWidth: '200px' }}
            />
          )}
          <button
            onClick={handleSubmit}
            className="mt-4 border-none bg-indigo-700 p-3 text-xl font-bold uppercase shadow-lg button-regular"
          >
            Predict
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
