'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slider = ({ reviews }) => {
  const carouselRef = useRef(null);
  const scrollAmount = 280;

  const extendedReviews = [...reviews, ...reviews]; 

  const scroll = (direction) => {
    const container = carouselRef.current;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = carouselRef.current;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        container.scrollTo({ left: 0, behavior: 'instant' });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 mt-8">
      {/* Navigation */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-100 text-green-800 p-2 rounded-full shadow"
        onClick={() => scroll('left')}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-100 text-green-800 p-2 rounded-full shadow"
        onClick={() => scroll('right')}
      >
        <ChevronRight />
      </button>

      {/* Carousel */}
      <motion.div
        ref={carouselRef}
        className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-6 py-6 px-2"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
      >
        {extendedReviews.map((review, index) => (
          <motion.div
            key={index}
            className="min-w-[260px] max-w-xs flex-shrink-0 bg-white rounded-2xl shadow-md p-6 border border-green-100 hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-gray-700 text-sm mb-4">"{review.Review}"</p>
            <a
              href={review.Source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 text-sm font-semibold text-right block hover:underline"
            >
              [Source]
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slider;
