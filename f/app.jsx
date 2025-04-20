"use client"

import { useState } from "react"
import TitleSection from "./components/TitleSection"
import CameraSection from "./components/CameraSection"
import RatingsSection from "./components/RatingsSection"
import { RefreshCw } from "lucide-react"

function App() {
  const [image, setImage] = useState(null)
  const [sustainabilityRating, setSustainabilityRating] = useState(null)
  const [socialGoodRating, setSocialGoodRating] = useState(null)
  const [barcode, setBarcode] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTakePicture = (capturedImage, detectedBarcode) => {
    setImage(capturedImage)
    setBarcode(detectedBarcode)
    setIsLoading(true)

    // Simulate fetching ratings with a delay
    setTimeout(() => {
      setSustainabilityRating(8.5)
      setSocialGoodRating(7.2)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-green-100 p-4">
      <TitleSection />
      <CameraSection image={image} onTakePicture={handleTakePicture} isLoading={isLoading} />

      {image && !isLoading && (
        <>
          <RatingsSection sustainabilityRating={sustainabilityRating} socialGoodRating={socialGoodRating} />
          {barcode && (
            <div className="mt-4 text-green-800 font-semibold text-center">
              📦 Detected Barcode: <span className="font-mono">{barcode}</span>
            </div>
          )}
        </>
      )}

      {isLoading && (
        <div className="mt-8 flex flex-col items-center">
          <RefreshCw className="w-10 h-10 text-green-700 animate-spin" />
          <p className="mt-2 text-green-800 font-medium">Analyzing product...</p>
        </div>
      )}
    </div>
  )
}

export default App
