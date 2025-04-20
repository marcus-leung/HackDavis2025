'use client';

import { useState } from 'react';
import RatingModal from './RatingModal';
import { X } from 'lucide-react';

export default function RatingCircle({
  label,
  rating,
  color = 'green',
  description,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCircleClick = () => {
    setIsModalOpen(true);
    console.log('Circle clicked');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const percentage = (rating / 10) * 100;

  // Determine color based on rating
  const getColorClass = () => {
    if (color === 'green') {
      return {
        border: 'border-green-500',
        fill: 'bg-green-500',
        text: 'text-green-800',
      };
    } else {
      return {
        border: 'border-amber-500',
        fill: 'bg-amber-500',
        text: 'text-amber-800',
      };
    }
  };

  const colorClass = getColorClass();

  return (
    <div className='relative flex flex-col items-center'>
      {/* Circle Container */}
      <div
        className={`w-28 h-28 rounded-full ${colorClass.border} border-4 flex items-center justify-center cursor-pointer transition-all transform hover:scale-110 shadow-md z-10`}
        onClick={handleCircleClick}
      >
        <div className='text-center'>
          <span className='text-2xl font-bold'>{rating}</span>
          <span className='text-lg font-medium'>/10</span>
        </div>
      </div>

      {/* Circular progress indicator */}
      <svg
        className='absolute top-0 left-0 w-28 h-28 -rotate-90 z-0'
        viewBox='0 0 100 100'
      >
        <circle
          cx='50'
          cy='50'
          r='46'
          fill='transparent'
          stroke='#e5e7eb'
          strokeWidth='8'
        />
        <circle
          cx='50'
          cy='50'
          r='46'
          fill='transparent'
          stroke={color === 'green' ? '#22c55e' : '#f59e0b'}
          strokeWidth='8'
          strokeDasharray={`${percentage * 2.89}, 1000`}
        />
      </svg>

      <p className={`mt-2 font-medium ${colorClass.text}`}>{label}</p>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border-2 border-green-100'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold text-green-800'>
                {label} Rating
              </h2>
              <button
                onClick={handleCloseModal}
                className='p-1 rounded-full hover:bg-gray-100'
              >
                <X className='w-5 h-5 text-gray-500' />
              </button>
            </div>

            <div className='flex justify-center my-6'>
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${
                  color === 'green' ? 'border-green-500' : 'border-amber-500'
                }`}
              >
                <span className='text-2xl font-bold'>{rating}/10</span>
              </div>
            </div>

            <div className='mb-4'>
              <h3 className='font-semibold text-gray-700 mb-1'>Description:</h3>
              <p className='text-gray-600'>{description}</p>
            </div>

            <div className='mb-6'>
              <h3 className='font-semibold text-gray-700 mb-1'>Analysis:</h3>
              <p className='text-gray-600'>
                {rating >= 8
                  ? 'Excellent. This product demonstrates exceptional ethical standards.'
                  : rating >= 6
                  ? 'Good. This product meets most ethical criteria but has room for improvement.'
                  : rating >= 4
                  ? 'Average. This product meets basic ethical standards.'
                  : 'Below average. This product has significant ethical concerns.'}
              </p>
            </div>

            <button
              onClick={handleCloseModal}
              className={`w-full py-3 px-4 rounded-lg shadow-md transition font-medium ${
                color === 'green'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
