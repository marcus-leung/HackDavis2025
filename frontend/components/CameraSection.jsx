"use client"

import { useEffect, useRef, useState } from "react"
import Webcam from "react-webcam"
import { Camera, RefreshCw, X } from "lucide-react"
import {
  BrowserMultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  NotFoundException,
} from "@zxing/library"

export default function CameraSection({ image, onTakePicture, isLoading }) {
  const webcamRef = useRef(null)
  const videoRef = useRef(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [barcodeError, setBarcodeError] = useState(false)
  const codeReader = useRef(null)

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader(
      new Map([
        [DecodeHintType.POSSIBLE_FORMATS, [
          BarcodeFormat.CODE_128,
          BarcodeFormat.EAN_13,
          BarcodeFormat.UPC_A,
          BarcodeFormat.UPC_E,
          BarcodeFormat.QR_CODE,
        ]]
      ])
    )
    return () => {
      codeReader.current?.reset()
    }
  }, [])

  useEffect(() => {
    if (isCameraActive) {
      startBarcodeScan()
    } else {
      codeReader.current?.reset()
    }
  }, [isCameraActive])

  const startBarcodeScan = () => {
    const attemptScan = () => {
      const videoEl = webcamRef.current?.video
      if (!videoEl || videoEl.readyState !== 4) {
        console.log("📷 Video not ready, retrying...")
        setTimeout(attemptScan, 500)
        return
      }

      console.log("🔍 Starting continuous scan...")
      codeReader.current.decodeFromVideoDevice(
        null,
        videoEl,
        async (result, err) => {
          if (result) {
            const barcode = result.getText()
            console.log("✅ Barcode found:", barcode)

            const screenshot = webcamRef.current.getScreenshot()
            if (screenshot) {
              setBarcodeError(false)
              setPhotoTaken(true)
              setIsCameraActive(false)
              onTakePicture(screenshot, barcode)
              codeReader.current.reset()
            }
          } else if (err && !(err instanceof NotFoundException)) {
            console.error("⚠️ Scan error:", err)
          } else {
            console.log("🔄 Scanning...")
          }
        }
      )
    }

    attemptScan()
  }

  const handleRetakePhoto = () => {
    setPhotoTaken(false)
    setIsCameraActive(true)
    setBarcodeError(false)
  }

  const handleTakeNewPhoto = () => {
    setPhotoTaken(false)
    setIsCameraActive(true)
    setBarcodeError(false)
  }

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <div className="w-full aspect-square max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-green-200 mb-4">
        {isCameraActive ? (
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ facingMode: "environment" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-green-50 to-amber-50">
            {image ? (
              <img src={image || "/placeholder.svg"} alt="Captured product" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6">
                <Camera className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <span className="text-green-700 font-medium">Open camera to scan a product</span>
              </div>
            )}
          </div>
        )}
      </div>

      {barcodeError && (
        <div className="text-red-600 font-medium text-center mb-4">
          Barcode not found. Please try again.
        </div>
      )}

      <div className="flex space-x-4 w-full max-w-xs">
        {!isCameraActive && !photoTaken && !isLoading && (
          <button
            onClick={() => setIsCameraActive(true)}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-green-700 transition flex items-center justify-center font-medium"
          >
            <Camera className="w-5 h-5 mr-2" />
            Open Camera
          </button>
        )}

        {isCameraActive && (
          <>
            <button
              onClick={() => setIsCameraActive(false)}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-xl shadow-md hover:bg-gray-600 transition font-medium"
            >
              <X className="w-5 h-5 mx-auto" />
            </button>
          </>
        )}

        {!isCameraActive && photoTaken && !isLoading && (
          <>
            <button
              onClick={handleRetakePhoto}
              className="flex-1 bg-amber-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-amber-700 transition font-medium"
            >
              <RefreshCw className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={handleTakeNewPhoto}
              className="flex-2 bg-green-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-green-700 transition flex-grow font-medium"
            >
              New Scan
            </button>
          </>
        )}
      </div>
    </div>
  )
}
