'use client';

import { useState, useEffect } from 'react';
import TitleSection from './components/TitleSection';
import CameraSection from './components/CameraSection';
import RatingsSection from './components/RatingsSection';
import { RefreshCw } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Slider from './components/Slider';
import Numbers from './components/Numbers';

// import Globe from "./components/Globe"
import Globe2 from './components/Globe2';

const reviews = [
  {
    name: 'Alice',
    text: 'Great app! Helped me understand my products better.',
  },
  { name: 'Bob', text: 'The globe feature is amazing!' },
  { name: 'Charlie', text: 'Clean UI and simple to use.' },
  { name: 'Charlie', text: 'Clean UI and simple to use.' },
  { name: 'Charlie', text: 'Clean UI and simple to use.' },
  { name: 'Charlie', text: 'Clean UI and simple to use.' },
];

function ScrollFadeIn({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true, 
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [image, setImage] = useState(null);
  const [sustainabilityRating, setSustainabilityRating] = useState(null);
  const [socialGoodRating, setSocialGoodRating] = useState(null);
  const [barcode, setBarcode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTakePicture = (capturedImage, detectedBarcode) => {
    setImage(capturedImage);
    setBarcode(detectedBarcode);
    setIsLoading(true);

    // Simulate fetching ratings with a delay
    setTimeout(() => {
      setSustainabilityRating(8.5);
      setSocialGoodRating(7.2);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4'>
      {/* <TitleSection />
      <CameraSection image={image} onTakePicture={handleTakePicture} isLoading={isLoading} /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TitleSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <CameraSection
          image={image}
          onTakePicture={handleTakePicture}
          isLoading={isLoading}
        />
      </motion.div>
      {barcode && !isLoading && <Globe2 />}{' '}
      {/* Render the globe only after barcode is scanned */}
      {image && !isLoading && (
        <>

<ScrollFadeIn>
    <Numbers fact1="1000 Plastic Bags Used" fact2="5000 Tons Emitted" />
</ScrollFadeIn>
          <ScrollFadeIn>
            
            <RatingsSection
              sustainabilityRating={sustainabilityRating}
              socialGoodRating={socialGoodRating}
            />
          </ScrollFadeIn>

          <ScrollFadeIn>
            <div className='mt-10 w-full'>
              <h2 className='text-xl font-bold text-green-800 text-center mb-4'>
                What users are saying
              </h2>

              <Slider reviews={reviews} />
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <div className='mt-4 text-green-800 font-semibold text-center'>
              📦 Detected Barcode: <span className='font-mono'>{barcode}</span>
            </div>
          </ScrollFadeIn>
        </>
      )}
      {isLoading && (
        <div className='mt-8 flex flex-col items-center'>
          <RefreshCw className='w-10 h-10 text-green-700 animate-spin' />
          <p className='mt-2 text-green-800 font-medium'>
            Analyzing product...
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
