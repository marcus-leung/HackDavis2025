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
import axios from 'axios';
import Globe2 from './components/Globe2';

async function fetchCompanyNameFromBarcode(barcode) {
  try {
    const response = await axios.post(
      'https://3be3-2600-387-f-4b15-00-6.ngrok-free.app/barcode',
      { id_code: barcode },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'insomnia/10.0.0',
        },
      }
    );
    return response.data?.company_name || 'Unknown Company';
  } catch (error) {
    console.error('Error fetching company name:', error);
    return 'Error fetching company';
  }
}

async function fetchEnvironmentalImpactRating(company) {
  try {
    const response = await axios.post(
      'https://3be3-2600-387-f-4b15-00-6.ngrok-free.app/environmental_impact',
      { company: company, is_gemini: false },
      {
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/10.0.0' },
      }
    );
    return response.data?.environmental_impact || 0;  // Default to 0 if no rating
  } catch (error) {
    console.error('Error fetching environmental impact rating:', error);
    return 0;
  }
}

async function fetchSocialImpactRating(company) {
    try {
      const response = await axios.post(
        'https://3be3-2600-387-f-4b15-00-6.ngrok-free.app/social_impact',
        { company: company, is_gemini: false },
        {
          headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/10.0.0' },
        }
      );
      return response.data?.social_impact || 0; // Default to 0 if no rating is returned
    } catch (error) {
      console.error('Error fetching social impact rating:', error);
      return 0; // Default to 0 if there's an error
    }
  }
  

  async function fetchCompanyInsights(company) {
    try {
      const response = await axios.post(
        'https://3be3-2600-387-f-4b15-00-6.ngrok-free.app/insights',
        { company: company, is_gemini: false }, // second param: data
        {
          headers: { 'Content-Type': 'application/json' } // third param: config
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching company insights:', error);
      return [];
    }
  }
  

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
  const [companyName, setCompanyName] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleTakePicture = async (capturedImage, detectedBarcode) => {
    setImage(capturedImage);
    setBarcode(detectedBarcode);
    setIsLoading(true);

    // Step 1: Get company name from barcode
    const name = await fetchCompanyNameFromBarcode(detectedBarcode);
    setCompanyName(name);
    console.log('Company name:', name);

    // Step 2: Fetch insights using the real company name
    const insights = await fetchCompanyInsights(name);
    setReviews(insights || []);
    console.log('Company insights:', insights);

    // Step 3: Fetch environmental impact (sustainability) rating
    const environmentalImpact = await fetchEnvironmentalImpactRating(name);
    setSustainabilityRating(environmentalImpact);
    console.log('Environmental impact rating:', environmentalImpact);

    // Step 4: Fetch social impact rating
    const socialImpact = await fetchSocialImpactRating(name);
    setSocialGoodRating(socialImpact);
    console.log('Social impact rating:', socialImpact);

    // Step 5: Set hardcoded sustainability rating for now
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4'>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <TitleSection />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
        <CameraSection image={image} onTakePicture={handleTakePicture} isLoading={isLoading} />
      </motion.div>

      {barcode && !isLoading && <Globe2 product={companyName}/>}

      {image && !isLoading && (
        <>
          <ScrollFadeIn>
            <Numbers fact1='1000 Plastic Bags Used' fact2='5000 Tons Emitted' />
          </ScrollFadeIn>
          <ScrollFadeIn>
            <RatingsSection sustainabilityRating={sustainabilityRating} socialGoodRating={socialGoodRating} />
          </ScrollFadeIn>
          <ScrollFadeIn>
            <div className='mt-10 w-full'>
              <h2 className='text-xl font-bold text-green-800 text-center mb-4'>
                What users are saying about {companyName}
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
          <p className='mt-2 text-green-800 font-medium'>Analyzing product...</p>
        </div>
      )}
    </div>
  );
}

export default App;
