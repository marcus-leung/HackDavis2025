"use client"

import { useState } from "react"
import RatingModal from "./RatingModal"

export default function RatingCircle({ label, rating, color = "green", description }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCircleClick = () => {
    setIsModalOpen(true)
    console.log("Circle clicked")
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const percentage = (rating / 10) * 100

  // Determine color based on rating
  const getColorClass = () => {
    if (color === "green") {
      return {
        border: "border-green-500",
        fill: "bg-green-500",
        text: "text-green-800",
      }
    } else {
      return {
        border: "border-amber-500",
        fill: "bg-amber-500",
        text: "text-amber-800",
      }
    }
  }

  const colorClass = getColorClass()

  return (
    <div className="relative flex flex-col items-center">
      {/* Clickable Wrapper */}
      <div
        className="relative w-32 h-32 flex items-center justify-center cursor-pointer transition transform hover:scale-105"
        onClick={handleCircleClick}
      >
        {/* Circle */}
        <div
          className={`absolute w-28 h-28 rounded-full ${colorClass.border} border-4 flex items-center justify-center shadow-md`}
        >
          <div className="text-center">
            <span className="text-2xl font-bold">{rating}</span>
            <span className="text-lg font-medium">/10</span>
          </div>
        </div>

        {/* Circular progress indicator */}
        <svg className="absolute w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="transparent" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            stroke={color === "green" ? "#22c55e" : "#f59e0b"}
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.89}, 1000`}
          />
        </svg>
      </div>

      {/* Label */}
      <p className={`mt-2 font-medium ${colorClass.text}`}>{label}</p>

      {/* Modal */}
      {isModalOpen && (
        <RatingModal label={label} rating={rating} onClose={handleCloseModal} color={color} description={description} />
      )}
    </div>
  )
}
