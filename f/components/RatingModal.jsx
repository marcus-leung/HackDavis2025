"use client"

import { X } from "lucide-react"

export default function RatingModal({ label, rating, onClose, color = "green", description }) {
  // Generate rating details based on the score
  const getRatingDetails = () => {
    if (rating >= 8) {
      return "Excellent. This product demonstrates exceptional ethical standards."
    } else if (rating >= 6) {
      return "Good. This product meets most ethical criteria but has room for improvement."
    } else if (rating >= 4) {
      return "Average. This product meets basic ethical standards."
    } else {
      return "Below average. This product has significant ethical concerns."
    }
  }

  const colorClasses = {
    green: "bg-green-600 hover:bg-green-700",
    amber: "bg-amber-600 hover:bg-amber-700",
  }

  // Circle animation properties
  const circleStrokeDasharray = 2 * Math.PI * 50; // Circumference of the circle (radius = 50)
  const circleStrokeDashoffset = circleStrokeDasharray - (circleStrokeDasharray * rating) / 10;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border-2 border-green-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-green-800">{label} Rating</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex justify-center my-6">
          <div className={`w-24 h-24 flex items-center justify-center`}>
            <svg
              className="w-full h-full transform rotate-90"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="50"
                className="text-gray-200"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                className={color === "green" ? "text-green-500" : "text-amber-500"}
                strokeWidth="10"
                fill="none"
                strokeDasharray={circleStrokeDasharray}
                strokeDashoffset={circleStrokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 0.5s ease-in-out',
                }}
              />
            </svg>
            <span className="absolute text-2xl font-bold">{rating}/10</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-1">Description:</h3>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-1">Analysis:</h3>
          <p className="text-gray-600">{getRatingDetails()}</p>
        </div>

        <button
          onClick={onClose}
          className={`w-full text-white py-3 px-4 rounded-lg shadow-md transition ${colorClasses[color]} font-medium`}
        >
          Close
        </button>
      </div>
    </div>
  )
}
